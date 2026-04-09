import React from 'react';
import { X, MapPin, Briefcase, GraduationCap, Globe, Mail, Linkedin, ExternalLink } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div style={{ padding: '3rem' }}>
          <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--ni-charcoal)', marginBottom: '0.5rem' }}>{employee.name}</h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--ni-carmine)', fontWeight: '600' }}>{employee.title}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {employee.linkedInUrl && employee.linkedInUrl !== 'Not found' && (
                  <a href={employee.linkedInUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Linkedin size={20} />
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} /> {employee.location || 'Global'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={18} /> {employee.totalExperience || 'N/A'} total experience
              </span>
            </div>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <section>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Skill breakdown</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {employee.skills.map((skill, idx) => (
                  <div key={idx} className="pill pill-navy" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: '400', opacity: 0.7, marginRight: '6px' }}>{skill.category}:</span>
                    {skill.skill}
                  </div>
                ))}
              </div>

              {employee.languages && employee.languages.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Languages</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {employee.languages.map((lang, idx) => (
                      <div key={idx} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Globe size={18} color="var(--ni-teal)" />
                          <span style={{ fontWeight: '600' }}>{lang.language}</span>
                        </div>
                        <span className="pill pill-sand">{lang.confidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Academic Record</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {employee.education.map((edu, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <GraduationCap size={24} color="var(--ni-carmine)" style={{ marginTop: '4px' }} />
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{edu.degree}</h4>
                        <p style={{ color: 'var(--ni-teal)', fontWeight: '500', marginBottom: '4px' }}>{edu.field}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{edu.institution}</p>
                        {edu.years && <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '8px' }}>{edu.years}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card" style={{ marginTop: '3rem', background: 'var(--ni-sand)', borderColor: 'transparent' }}>
                <h4 style={{ marginBottom: '1rem' }}>Contact Information</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Formal contact should be made through organizational channels.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ni-navy)', fontWeight: '500' }}>
                    <Mail size={16} /> {employee.name.toLowerCase().replace(' ', '.')}@nutritionintl.org
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
