import React from 'react';
import { X, MapPin, Briefcase, GraduationCap, Globe, Linkedin, Award, Target } from 'lucide-react';
import { Employee } from '../types';
import SkillRadar from './SkillRadar';
import ProficiencyBadge from './ProficiencyBadge';

interface EmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }) => {
  if (!employee) return null;

  // Helper to get numeric proficiency
  const getProficiency = (exp: string): number => {
    const num = parseInt(exp) || 0;
    if (num >= 15) return 5;
    if (num >= 8) return 4;
    if (num >= 5) return 3;
    if (num >= 3) return 2;
    return 1;
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(37, 55, 70, 0.4)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      padding: '2rem'
    }}>
      <div className="modal-content animate-fade glass-card" onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: '1100px', maxHeight: '90vh', overflowY: 'auto',
        background: 'rgba(255, 255, 255, 0.95)', border: '1px solid var(--card-border)',
        padding: 0, position: 'relative'
      }}>
        <button className="close-btn" onClick={onClose} style={{
          position: 'absolute', top: '24px', right: '24px', background: 'var(--ni-charcoal-muted)',
          border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', zIndex: 10
        }}>
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
          <div style={{ padding: '4rem' }}>
            <header style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '2px', background: 'var(--ni-carmine)' }}></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--ni-carmine)', textTransform: 'uppercase' }}>Expert Profile</span>
              </div>
              <h2 style={{ fontSize: '3.5rem', color: 'var(--ni-charcoal)', marginBottom: '0.5rem', fontWeight: 900, lineHeight: 1 }}>{employee.name}</h2>
              <p style={{ fontSize: '1.4rem', color: 'var(--ni-carmine)', fontWeight: '700', marginBottom: '1.5rem' }} className="brand-serif italic">{employee.title}</p>
              
              <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="var(--ni-teal)" /> {employee.location || 'Global'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={18} color="var(--ni-teal)" /> {employee.totalExperience || 'N/A'} of Strategic Exp.
                </span>
              </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <Award size={20} color="var(--ni-carmine)" />
                  <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Core Capabilities</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {employee.skills.map((skill, idx) => (
                    <div key={idx} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--ni-charcoal-muted)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--ni-charcoal)', fontSize: '0.95rem' }}>{skill.skill}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--ni-teal)', fontWeight: 800, textTransform: 'uppercase' }}>{skill.category}</span>
                      </div>
                      <ProficiencyBadge level={getProficiency(skill.experience)} label={skill.experience} />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <GraduationCap size={20} color="var(--ni-carmine)" />
                  <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Academic Foundation</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {employee.education.map((edu, idx) => (
                    <div key={idx} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--ni-charcoal-muted)' }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '2px', fontWeight: 800 }}>{edu.degree}</h4>
                      <p style={{ color: 'var(--ni-teal)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>{edu.field}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>{edu.institution}</p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <Globe size={20} color="var(--ni-carmine)" />
                    <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>Linguistic Diversity</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {employee.languages.map((lang, idx) => (
                      <div key={idx} className="pill pill-navy" style={{ fontWeight: 800 }}>
                        {lang.language} <span style={{ opacity: 0.5, marginLeft: '4px', fontWeight: 400 }}>({lang.confidence})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <aside style={{ background: 'var(--ni-charcoal-muted)', borderLeft: '1px solid var(--card-border)', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '10px', background: 'white', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                 <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--ni-charcoal), var(--ni-navy))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 900 }}>
                   {employee.name.split(' ').map(n => n[0]).join('')}
                 </div>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Capability Pulse</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Interactive Skill Topology</p>
            </div>

            <div style={{ height: '300px', position: 'relative' }}>
              <SkillRadar skills={employee.skills} />
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Target size={18} color="var(--ni-sunlight)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>Strategic Fit</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ni-charcoal)', lineHeight: 1.5 }}>
                Based on current <span style={{ color: 'var(--ni-carmine)', fontWeight: 700 }}>Pulse</span>, this expert is highly efficient for global missions requiring intensive technical leadership.
              </p>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <a href={employee.linkedInUrl !== 'Not found' ? employee.linkedInUrl : '#'} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                width: '100%', padding: '1rem', background: 'var(--ni-navy)', color: 'white',
                borderRadius: '12px', fontWeight: 700, textDecoration: 'none', transition: 'var(--transition)'
              }}>
                <Linkedin size={18} /> Professional Network
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
