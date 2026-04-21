import React, { useMemo } from 'react';
import { Employee } from '../types';
import { Grid, Info } from 'lucide-react';

interface SkillsMatrixProps {
  employees: Employee[];
}

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ employees }) => {
  // Get top 20 skills across the dataset for a denser matrix
  const topSkills = useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach(emp => {
      emp.skills?.forEach(s => {
        counts[s.skill] = (counts[s.skill] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([name]) => name);
  }, [employees]);

  const mapExpToLevel = (exp: string): number => {
    const num = parseInt(exp) || 0;
    if (num >= 15) return 5;
    if (num >= 8) return 4;
    if (num >= 5) return 3;
    if (num >= 3) return 2;
    return 1;
  };

  const getLevelColor = (level: number) => {
    if (level === 5) return 'var(--ni-navy)';
    if (level === 4) return 'var(--ni-carmine)';
    if (level === 3) return '#479da1'; // Softened Teal
    if (level === 2) return '#f4c45b'; // Softened Sunlight
    if (level === 1) return '#91a4b1'; // Muted Charcoal
    return 'rgba(37, 55, 70, 0.03)';
  };

  return (
    <div className="glass-card fade-in" style={{ padding: '3rem', border: '1px solid var(--card-border)' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1rem' }}>
            <Grid size={20} color="var(--ni-carmine)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--ni-carmine)', textTransform: 'uppercase' }}>Capability Heatmap</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Visual Skills Matrix</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px' }}>
            A high-resolution mapping of technical and strategic competencies across the organizational talent pool.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', background: 'var(--ni-charcoal-muted)', padding: '1.5rem', borderRadius: '16px' }}>
           {[
             { label: 'Expert', level: 5 },
             { label: 'Advanced', level: 4 },
             { label: 'Proficient', level: 3 },
             { label: 'Foundational', level: 2 },
             { label: 'Novice', level: 1 },
           ].map(l => (
             <div key={l.level} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
               <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: getLevelColor(l.level) }} /> {l.label}
             </div>
           ))}
        </div>
      </header>

      <div style={{ overflowX: 'auto', margin: '0 -3rem', padding: '0 3rem' }}>
        <div style={{ minWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '250px repeat(20, 1fr)', gap: '6px', marginBottom: '12px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Talent</div>
            {topSkills.map(skill => (
              <div key={skill} style={{ 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                writingMode: 'vertical-rl', 
                transform: 'rotate(-180deg)',
                padding: '15px 0',
                textAlign: 'left',
                color: 'var(--ni-charcoal)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {skill}
              </div>
            ))}
          </div>

          {employees.slice(0, 30).map((emp, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '250px repeat(20, 1fr)', gap: '6px', marginBottom: '6px' }}>
              <div style={{ 
                fontSize: '0.9rem', 
                fontWeight: 700, 
                padding: '12px 16px', 
                background: 'white',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {emp.name}
              </div>
              {topSkills.map(skill => {
                const empSkill = emp.skills?.find(s => s.skill === skill);
                const level = empSkill ? mapExpToLevel(empSkill.experience) : 0;
                return (
                  <div 
                    key={skill} 
                    style={{ 
                      borderRadius: '6px', 
                      background: getLevelColor(level),
                      transition: 'transform 0.3s var(--ease)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: level === 5 ? 'white' : 'rgba(0,0,0,0.3)',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title={empSkill ? `${emp.name} | ${skill}: ${empSkill.experience}` : 'Capability Gap'}
                  >
                    {level > 0 ? level : ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        <Info size={16} />
        <span>Interaction: Hover over nodes to see detailed experience metrics and capability mappings.</span>
      </div>
    </div>
  );
};

export default SkillsMatrix;
