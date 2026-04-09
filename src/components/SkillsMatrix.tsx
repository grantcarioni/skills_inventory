import React, { useMemo } from 'react';
import { Employee } from '../types';

interface SkillsMatrixProps {
  employees: Employee[];
}

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ employees }) => {
  // Get top 15 skills across the dataset for the matrix
  const topSkills = useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach(emp => {
      emp.skills?.forEach(s => {
        counts[s.skill] = (counts[s.skill] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([name]) => name);
  }, [employees]);

  const mapExpToLevel = (exp: string): number => {
    if (exp.includes('30') || exp.includes('20') || exp.includes('15')) return 5;
    if (exp.includes('10')) return 4;
    if (exp.includes('8') || exp.includes('5')) return 3;
    if (exp.includes('3')) return 2;
    return 1;
  };

  return (
    <div className="glass-card fade-in" style={{ overflowX: 'auto', padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Visual Skills Matrix</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Comparative proficiency across top organizational capabilities.</p>
      </div>

      <div style={{ minWidth: '800px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px repeat(15, 1fr)', gap: '4px', marginBottom: '4px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Talent</div>
          {topSkills.map(skill => (
            <div key={skill} style={{ 
              fontSize: '0.65rem', 
              fontWeight: 700, 
              writingMode: 'vertical-rl', 
              transform: 'rotate(180deg)',
              padding: '10px 0',
              textAlign: 'left',
              color: 'var(--ni-navy)'
            }}>
              {skill}
            </div>
          ))}
        </div>

        {employees.slice(0, 20).map((emp, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px repeat(15, 1fr)', gap: '4px', marginBottom: '4px' }}>
            <div style={{ 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              padding: '8px', 
              background: 'rgba(37, 55, 70, 0.03)',
              borderRadius: '4px'
            }}>
              {emp.name}
            </div>
            {topSkills.map(skill => {
              const empSkill = emp.skills?.find(s => s.skill === skill);
              const level = empSkill ? mapExpToLevel(empSkill.experience) : 0;
              return (
                <div 
                  key={skill} 
                  className={`matrix-cell matrix-level-${level}`}
                  style={{ borderRadius: '4px', position: 'relative' }}
                  title={empSkill ? `${skill}: ${empSkill.experience} exp` : 'No data'}
                >
                  {level > 0 ? level : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', background: '#d32f2f', borderRadius: '2px' }} /> Expert (L5)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', background: '#e57373', borderRadius: '2px' }} /> Advanced (L4)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', background: '#ef9a9a', borderRadius: '2px' }} /> Proficient (L3)
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;
