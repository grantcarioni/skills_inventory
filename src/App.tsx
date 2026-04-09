import { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Briefcase, GraduationCap, Globe, ExternalLink, Filter } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import skillsDataRaw from './data/skills_inventory.json';
import { Employee } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const skillsData = (skillsDataRaw || []) as Employee[];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    console.log('App loaded. Data count:', skillsData.length);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    skillsData.forEach(emp => {
      if (emp.skills) {
        emp.skills.forEach(s => {
          if (s.category) cats.add(s.category);
        });
      }
    });
    return ['All', ...Array.from(cats)].filter(Boolean);
  }, []);

  const filteredEmployees = useMemo(() => {
    return skillsData.filter(emp => {
      if (!emp) return false;
      const name = emp.name || '';
      const title = emp.title || '';
      const skills = emp.skills || [];

      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skills.some(s => (s.skill || '').toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || 
        skills.some(s => s.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const chartData = useMemo(() => {
    const stats: Record<string, number> = {};
    skillsData.forEach(emp => {
      if (emp.skills) {
        emp.skills.forEach(s => {
          if (s.category) {
            stats[s.category] = (stats[s.category] || 0) + 1;
          }
        });
      }
    });

    const labels = Object.keys(stats);
    if (labels.length === 0) return null;

    return {
      labels,
      datasets: [
        {
          label: 'Total Skills Recorded',
          data: Object.values(stats),
          backgroundColor: '#A4343A',
          borderRadius: 8,
        },
      ],
    };
  }, []);

  return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '3rem', borderBottom: '2px solid var(--ni-carmine)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: 'var(--ni-charcoal)', fontSize: '2.5rem' }}>Skills Inventory</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Nutrition International Global Talent Matrix</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ni-carmine)', letterSpacing: '2px' }}>NUTRITION INTERNATIONAL</span>
          </div>
        </div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr minmax(200px, 350px)', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ height: '300px', minHeight: '300px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Skills Landscape</h3>
          {chartData ? (
            <Bar 
              data={chartData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }} 
            />
          ) : <p>No data available for chart</p>}
        </div>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem' }}>Quick Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Employees</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{skillsData.length}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Unique Skills</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{new Set(skillsData.flatMap(e => (e.skills || []).map(s => s.skill))).size}</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
          <input 
            type="text" 
            placeholder="Search by name, skill, or title..." 
            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '1rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Filter style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
          <select 
            style={{ padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', appearance: 'none', background: 'white', minWidth: '200px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredEmployees.map((emp, idx) => (
          <div key={`${emp.name}-${idx}`} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--ni-charcoal)' }}>{emp.name}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--ni-carmine)', fontWeight: 'bold' }}>{emp.title || 'Team Member'}</p>
              </div>
              {emp.linkedInUrl && emp.linkedInUrl !== 'Not found' && (
                <a href={emp.linkedInUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ni-navy)', marginLeft: '10px' }}>
                  <ExternalLink size={20} />
                </a>
              )}
            </div>

            <div style={{ fontSize: '0.85rem', display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} /> {emp.location || 'Global'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={14} /> {emp.totalExperience || 'N/A'} exp
              </span>
            </div>

            {emp.skills && emp.skills.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Core Skills</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {emp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="pill pill-navy" title={skill.category}>
                      {skill.skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {emp.education && emp.education.length > 0 && emp.education[0].degree && emp.education[0].degree !== 'Not found on LinkedIn' && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Education</p>
                {emp.education.map((edu, eIdx) => (
                  <div key={eIdx} style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <GraduationCap size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    <strong>{edu.degree}</strong> {edu.field ? `in ${edu.field}` : ''}
                  </div>
                ))}
              </div>
            )}

            {emp.languages && emp.languages.length > 0 && (
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Languages</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {emp.languages.map((lang, lIdx) => (
                    <span key={lIdx} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Globe size={14} /> {lang.language} ({lang.confidence})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
