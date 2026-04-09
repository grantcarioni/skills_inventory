const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

const UNZIPPED_PATH = path.join(__dirname, '..', 'skills_unzipped');
const OUTPUT_PATH = path.join(__dirname, 'src', 'data', 'skills_inventory.json');

const parser = new XMLParser({
    ignoreAttributes: false
});

function parse() {
    try {
        console.log('Starting multi-sheet data parsing...');

        // 1. Read shared strings
        const sstContent = fs.readFileSync(path.join(UNZIPPED_PATH, 'xl', 'sharedStrings.xml'), 'utf-8');
        const sstObj = parser.parse(sstContent);
        const siList = Array.isArray(sstObj.sst.si) ? sstObj.sst.si : [sstObj.sst.si];
        
        const sharedStrings = siList.map(si => {
            if (!si) return '';
            const t = si.t;
            if (typeof t === 'string') return t;
            if (typeof t === 'number') return t.toString();
            if (t && t['#text']) return t['#text'];
            if (si.r) {
                const rList = Array.isArray(si.r) ? si.r : [si.r];
                return rList.map(r => (r.t && (typeof r.t === 'string' ? r.t : r.t['#text'])) || '').join('');
            }
            return '';
        });

        const employees = {};

        function getSheetData(sheetNum) {
            const sheetPath = path.join(UNZIPPED_PATH, 'xl', 'worksheets', `sheet${sheetNum}.xml`);
            if (!fs.existsSync(sheetPath)) return [];
            
            const sheetContent = fs.readFileSync(sheetPath, 'utf-8');
            const sheetObj = parser.parse(sheetContent);
            const sheetDataRaw = sheetObj.worksheet.sheetData.row;
            if (!sheetDataRaw) return [];

            const sheetData = [];
            const headers = [];
            
            const rows = Array.isArray(sheetDataRaw) ? sheetDataRaw : [sheetDataRaw];
            const firstRow = rows[0];
            const headerCells = Array.isArray(firstRow.c) ? firstRow.c : [firstRow.c];
            
            headerCells.forEach(cell => {
                let val = '';
                if (cell.v !== undefined) {
                    const t = cell['@_t'] || cell.t;
                    if (t === 's') {
                        val = sharedStrings[parseInt(cell.v)];
                    } else {
                        val = cell.v.toString();
                    }
                }
                headers.push(val);
            });

            const dataRows = rows.slice(1);
            dataRows.forEach(row => {
                const entry = {};
                const cells = Array.isArray(row.c) ? row.c : [row.c];
                cells.forEach(cell => {
                    const r = cell['@_r'] || cell.r;
                    if (!r) return;
                    const colLetter = r.match(/[A-Z]+/)[0];
                    const colIndex = colLetter.split('').reduce((acc, char) => acc * 26 + char.charCodeAt(0) - 64, 0) - 1;
                    const colName = headers[colIndex];
                    if (!colName) return;

                    let val = '';
                    if (cell.v !== undefined) {
                        const t = cell['@_t'] || cell.t;
                        if (t === 's') {
                            val = sharedStrings[parseInt(cell.v)];
                        } else {
                            val = cell.v;
                        }
                    }
                    entry[colName] = val;
                });
                if (Object.keys(entry).length > 0) sheetData.push(entry);
            });
            return sheetData;
        }

        // Processing Sheet 1: Skills
        console.log('Processing Sheet 1 (Skills)...');
        getSheetData(1).forEach(row => {
            const name = row['Employee Name'];
            if (!name) return;
            if (!employees[name]) employees[name] = { name, title: row['Title (from CSV)'], location: row['Location'], skills: [], education: [], languages: [] };
            if (row['Skill']) {
                employees[name].skills.push({
                    skill: row['Skill'],
                    category: row['Skill Category'],
                    experience: row['Est. Years Experience']
                });
            }
        });

        // Processing Sheet 2: Education
        console.log('Processing Sheet 2 (Education)...');
        getSheetData(2).forEach(row => {
            const name = row['Employee Name'];
            if (!name) return;
            if (!employees[name]) employees[name] = { name, title: row['Title'], location: '', skills: [], education: [], languages: [] };
            if (row['Degree / Diploma / Certificate']) {
                employees[name].education.push({
                    degree: row['Degree / Diploma / Certificate'],
                    field: row['Field of Study'],
                    institution: row['Institution'],
                    years: row['Year(s)']
                });
            }
        });

        // Processing Sheet 3: Languages
        console.log('Processing Sheet 3 (Languages)...');
        getSheetData(3).forEach(row => {
            const name = row['Employee Name'];
            if (!name) return;
            if (!employees[name]) employees[name] = { name, title: row['Title'], location: row['Location'], skills: [], education: [], languages: [] };
            if (row['Language(s)']) {
                employees[name].languages.push({
                    language: row['Language(s)'],
                    confidence: row['Confidence Level']
                });
            }
        });

        // Processing Sheet 4: Experience & LinkedIn
        console.log('Processing Sheet 4 (Experience)...');
        getSheetData(4).forEach(row => {
            const name = row['Employee Name'];
            if (!name) return;
            if (!employees[name]) employees[name] = { name, title: row['Title (from CSV)'], location: row['Location'], skills: [], education: [], languages: [] };
            employees[name].totalExperience = row['Est. Total Experience'];
            employees[name].linkedInUrl = row['LinkedIn Profile URL'];
        });

        const finalData = Object.values(employees);
        if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
            fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
        }
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData, null, 2));
        console.log(`Successfully parsed ${finalData.length} employees to ${OUTPUT_PATH}`);

    } catch (err) {
        console.error('Error parsing skills data:', err);
    }
}

parse();
