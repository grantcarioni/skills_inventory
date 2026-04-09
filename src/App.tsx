import { useState, useMemo } from 'react';
import { 
  Search, MapPin, Briefcase, ExternalLink, Filter, 
  LayoutDashboard, Table as TableIcon, Activity, Users,
  ChevronRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import skillsDataRaw from './data/skills_inventory.json';
import { Employee } from './types';
import ProficiencyBadge from './components/ProficiencyBadge';
import SkillsMatrix from './components/SkillsMatrix';
import GapAnalysis from './components/GapAnalysis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const skillsData = (skillsDataRaw || []) as Employee[];

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const chartData = useMemo(() => {
    const stats: Record<string, number> = {};
    skillsData.forEach(emp => {
      emp.skills?.forEach(s => {
        if (s.category) stats[s.category] = (stats[s.category] || 0) + 1;
      });
    });
    return {
      labels: Object.keys(stats),
      datasets: [{
        label: 'Skills Count',
        data: Object.values(stats),
        backgroundColor: '#A4343A',
        borderRadius: 6,
      }],
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="fade-in">
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', marginBottom: '2.5rem' }}>
              <div className="glass-card" style={{ height: '400px' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Organizational Skills Landscape</h3>
                <Bar 
                  data={chartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { 
                      y: { beginAtZero: true, grid: { display: false } },
                      x: { grid: { display: false } }
                    }
                  }} 
                />
              </div>
              <div className="glass-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Global Talent Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ padding: '1.25rem', background: 'rgba(37, 55, 70, 0.03)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Workforce</p>
                    <p style={{ fontSize: '2.25rem', fontWeight: 800 }}>{skillsData.length}</p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'rgba(37, 55, 70, 0.03)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Strategic Skills</p>
                    <p style={{ fontSize: '2.25rem', fontWeight: 800 }}>{new Set(skillsData.flatMap(e => (e.skills || []).map(s => s.skill))).size}</p>
                  </div>
                  <div style={{ padding: '1.25rem', background: 'rgba(0, 125, 132, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--ni-teal)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ni-teal)', fontWeight: 700 }}>Talent Mobility</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>+12% vs Q3</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case 'Matrix':
        return <SkillsMatrix employees={filteredEmployees} />;
      case 'Gaps':
        return <GapAnalysis />;
      case 'Discovery':
        return (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, skill, or role..." 
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '14px', border: '1px solid var(--card-border)', fontSize: '1rem', background: 'white' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <Filter style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                <select 
                  style={{ padding: '1rem 1rem 1rem 3rem', borderRadius: '14px', border: '1px solid var(--card-border)', appearance: 'none', background: 'white', minWidth: '220px', fontWeight: 600 }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
              {filteredEmployees.slice(0, 50).map((emp, idx) => (
                <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', color: 'var(--ni-charcoal)', marginBottom: '0.25rem' }}>{emp.name}</h2>
                      <p style={{ fontSize: '0.9rem', color: 'var(--ni-carmine)', fontWeight: 700 }}>{emp.title}</p>
                    </div>
                    {emp.linkedInUrl && emp.linkedInUrl !== 'Not found' && (
                      <a href={emp.linkedInUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ni-navy)', padding: '8px', background: 'rgba(0, 59, 92, 0.05)', borderRadius: '8px' }}>
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {emp.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Briefcase size={16} /> {emp.totalExperience || 'N/A'} exp</span>
                  </div>

                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Core Capabilities</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {emp.skills?.slice(0, 3).map((s, si) => (
                        <div key={si} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{s.skill}</span>
                          <ProficiencyBadge level={getProficiency(s.experience)} label={s.experience} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {emp.languages?.map((l, li) => (
                        <span key={li} title={l.language} style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--ni-sand)', fontSize: '0.7rem', fontWeight: 700 }}>{l.language.substring(0,2).toUpperCase()}</span>
                      ))}
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--ni-navy)', background: 'none', border: 'none', fontWeight: 700 }}>
                      View Profile <ChevronRight size={14} />
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
      <aside className="sidebar" style={{ width: sidebarOpen ? '280px' : '80px', transition: 'width 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem', cursor: 'pointer' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div style={{ width: '40px', height: '40px', background: 'var(--ni-carmine)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.2rem' }}>X</div>
          {sidebarOpen && <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>SkillsMap</div>}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'Overview', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'Matrix', icon: TableIcon, label: 'Visual Matrix' },
            { id: 'Discovery', icon: Users, label: 'Talent Discovery' },
            { id: 'Gaps', icon: Activity, label: 'Gap Analysis' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px',
                background: activeTab === item.id ? 'var(--ni-carmine)' : 'transparent',
                color: activeTab === item.id ? 'white' : 'rgba(245, 242, 234, 0.6)',
                border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', transition: 'var(--transition)'
              }}
            >
              <item.icon size={20} />
              {sidebarOpen && <span style={{ fontWeight: 600 }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--ni-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>GC</div>
            {sidebarOpen && (
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>Grant Carioni</p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(245,242,234,0.5)' }}>Product Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="hero-banner">
          <div style={{ maxWidth: '600px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--ni-sunlight)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Nutrition International</span>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>Unlock the Strategic <span style={{ color: 'var(--ni-sunlight)' }}>Potential</span> of Your Talent.</h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Global skills inventory and gap analysis platform for high-impact organizational growth.</p>
          </div>
          <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>Active Talent Nodes</p>
            <p style={{ fontSize: '2rem', fontWeight: 800 }}>{skillsData.length}</p>
          </div>
        </header>

        <div className="tab-nav">
          {['Overview', 'Matrix', 'Discovery', 'Gaps'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Overview' ? 'Insights Dashboard' : tab}
            </button>
          ))}
        </div>

        <section>
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

export default App;
