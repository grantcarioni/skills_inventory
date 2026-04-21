import { useState, useMemo } from 'react';
import { 
  Search, MapPin, Briefcase, ExternalLink, Filter, 
  LayoutDashboard, Table as TableIcon, Activity, Users,
  ChevronRight, Sparkles, Target
} from 'lucide-react';

import skillsDataRaw from './data/skills_inventory.json';
import { Employee } from './types';
import ProficiencyBadge from './components/ProficiencyBadge';
import SkillsMatrix from './components/SkillsMatrix';
import GapAnalysis from './components/GapAnalysis';
import DashboardAnalytics from './components/DashboardAnalytics';
import EmployeeModal from './components/EmployeeModal';

const skillsData = (skillsDataRaw || []) as Employee[];

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Proficiency Mapping Logic
  const getProficiency = (exp: string): number => {
    const num = parseInt(exp) || 0;
    if (num >= 15) return 5;
    if (num >= 8) return 4;
    if (num >= 5) return 3;
    if (num >= 3) return 2;
    return 1;
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    skillsData.forEach(emp => {
      emp.skills?.forEach(s => { if (s.category) cats.add(s.category); });
    });
    return ['All', ...Array.from(cats)].sort();
  }, []);

  const filteredEmployees = useMemo(() => {
    return skillsData.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.skills?.some(s => s.skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || 
        emp.skills?.some(s => s.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <DashboardAnalytics employees={skillsData} />;
      case 'Matrix':
        return <SkillsMatrix employees={filteredEmployees} />;
      case 'Gaps':
        return <GapAnalysis />;
      case 'Discovery':
        return (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ni-carmine)' }} size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, skill, or role..." 
                  style={{ 
                    width: '100%', padding: '1.2rem 1.2rem 1.2rem 4rem', borderRadius: '18px', 
                    border: '1px solid var(--card-border)', fontSize: '1rem', background: 'white',
                    boxShadow: 'var(--shadow-sm)', outline: 'none', transition: 'var(--transition)'
                  }}
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div style={{ position: 'relative', minWidth: '240px' }}>
                <Filter style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ni-teal)' }} size={18} />
                <select 
                  style={{ 
                    width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', borderRadius: '18px', 
                    border: '1px solid var(--card-border)', appearance: 'none', background: 'white', 
                    fontWeight: 700, fontSize: '0.95rem', boxShadow: 'var(--shadow-sm)', cursor: 'pointer'
                  }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2.5rem' }}>
              {filteredEmployees.map((emp, idx) => (
                <div key={idx} className="glass-card fade-in" style={{ 
                  display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2.5rem',
                  border: '1px solid var(--card-border)', background: 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h2 style={{ fontSize: '1.6rem', color: 'var(--ni-charcoal)', marginBottom: '0.25rem', fontWeight: 900 }}>{emp.name}</h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                         <Sparkles size={14} color="var(--ni-sunlight)" strokeWidth={3} />
                         <p style={{ fontSize: '0.95rem', color: 'var(--ni-carmine)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{emp.title}</p>
                      </div>
                    </div>
                    {emp.linkedInUrl && emp.linkedInUrl !== 'Not found' && (
                      <a href={emp.linkedInUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ni-navy)', padding: '10px', background: 'rgba(0, 59, 92, 0.05)', borderRadius: '12px', transition: 'var(--transition)' }}>
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--ni-charcoal-muted)', paddingBottom: '1.5rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={18} color="var(--ni-teal)" /> {emp.location || 'Global'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} color="var(--ni-teal)" /> {emp.totalExperience || 'N/A'} of Strategic Exp.</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                       <Target size={16} color="var(--ni-carmine)" />
                       <p style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1.5px' }}>Capability Profile</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {emp.skills?.slice(0, 3).map((s, si) => (
                        <div key={si} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', paddingBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{s.skill}</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--ni-teal)', fontWeight: 800 }}>{s.category}</span>
                          </div>
                          <ProficiencyBadge level={getProficiency(s.experience)} label={s.experience} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {emp.languages?.map((l, li) => (
                        <span key={li} title={l.language} style={{ padding: '6px 12px', borderRadius: '8px', background: 'var(--ni-sand)', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(0,0,0,0.05)' }}>{l.language.substring(0,2).toUpperCase()}</span>
                      ))}
                    </div>
                    <button 
                      onClick={() => setSelectedEmployee(emp)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', 
                        color: 'var(--ni-navy)', background: 'var(--ni-charcoal-muted)', 
                        border: 'none', fontWeight: 800, padding: '10px 20px', borderRadius: '12px',
                        cursor: 'pointer', transition: 'var(--transition)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 59, 92, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ni-charcoal-muted)'}
                    >
                      View Intelligence <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar" style={{ width: sidebarOpen ? '280px' : '88px', transition: 'width 0.4s var(--ease)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4rem', cursor: 'pointer', padding: '0 0.5rem' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div style={{ 
            width: '42px', height: '42px', background: 'linear-gradient(135deg, var(--ni-carmine), #82292e)', 
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 8px 16px rgba(164, 52, 58, 0.3)', color: 'white', fontWeight: 900, fontSize: '1.4rem' 
          }}>S</div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>SkillsMap</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Strategic Assets</div>
            </div>
          )}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          {[
            { id: 'Overview', icon: LayoutDashboard, label: 'Insights Explorer' },
            { id: 'Matrix', icon: TableIcon, label: 'Capability Matrix' },
            { id: 'Discovery', icon: Users, label: 'Talent Discovery' },
            { id: 'Gaps', icon: Activity, label: 'Strategic Gaps' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '14px',
                background: activeTab === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === item.id ? 'white' : 'rgba(245, 242, 234, 0.5)',
                border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', transition: 'var(--transition)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {activeTab === item.id && (
                <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', background: 'var(--ni-carmine)', borderRadius: '0 4px 4px 0' }} />
              )}
              <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {sidebarOpen && <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '1.5rem 0' }}>
          <div className="glass-card" style={{ 
            background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', 
            padding: sidebarOpen ? '1rem' : '0.5rem', borderRadius: '16px', display: 'flex', 
            alignItems: 'center', gap: '12px', backdropFilter: 'none'
          }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--ni-teal), var(--ni-navy))', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', color: 'white',
              boxShadow: '0 4px 12px rgba(0, 125, 132, 0.2)', flexShrink: 0
            }}>GC</div>
            {sidebarOpen && (
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Grant Carioni</p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Design Manager</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="hero-banner">
          <div style={{ maxWidth: '650px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <span style={{ width: '30px', height: '2px', background: 'var(--ni-sunlight)' }}></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '3px', color: 'var(--ni-sunlight)', textTransform: 'uppercase' }}>Nutrition International</span>
            </div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.05, fontWeight: 900 }}>
              Optimize Your <span className="brand-serif" style={{ color: 'var(--ni-sunlight)', fontStyle: 'italic', fontWeight: 400 }}>Strategic</span> Talent Landscape.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, lineHeight: 1.5 }}>
              A high-precision framework for global skills inventory, talent discovery, and organizational gap intelligence.
            </p>
          </div>
          <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', padding: '1.5rem 2rem', minWidth: '220px' }}>
            <Users size={32} style={{ color: 'var(--ni-sunlight)', marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: 600, marginBottom: '0.25rem' }}>Global Talent Nodes</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>{skillsData.length}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--ni-teal)', fontWeight: 800 }}>ACTIVE</span>
            </div>
          </div>
        </header>

        <div className="tab-nav">
          {['Overview', 'Matrix', 'Discovery', 'Gaps'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Overview' ? 'Insights Explorer' : tab}
            </button>
          ))}
        </div>

        <section style={{ marginBottom: '4rem' }}>
          {renderContent()}
        </section>
      </main>

      {/* Talent Intelligence Modal */}
      <EmployeeModal 
        employee={selectedEmployee} 
        onClose={() => setSelectedEmployee(null)} 
      />
    </div>
  );
}

export default App;
