import React from 'react';
import { Target, TrendingUp, AlertCircle, Sparkles, ArrowUpRight, Zap } from 'lucide-react';

const GapAnalysis: React.FC = () => {
  const gaps = [
    { title: 'AI & Generative Logic', current: 15, target: 85, status: 'Critical', trend: '+2%' },
    { title: 'Digital Strategic Transformation', current: 45, target: 90, status: 'Warning', trend: '+12%' },
    { title: 'Global Data Governance', current: 60, target: 95, status: 'On Track', trend: '+5%' },
    { title: 'Agile Change Management', current: 30, target: 75, status: 'Warning', trend: '-2%' },
  ];

  const recommendations = [
    { 
      type: 'Upskilling', 
      title: 'AI Readiness Program', 
      desc: 'Deploy advanced ML modules for the "Digital Transformation" cohort to bridge the 70% gap.',
      impact: 'High',
      icon: Zap
    },
    { 
      type: 'Resource Allocation', 
      title: 'Strategic Talent Swap', 
      desc: 'Temporarily reassign "Data Governance" experts to "Change Management" projects for cross-pollination.',
      impact: 'Medium',
      icon: ArrowUpRight
    },
    { 
      type: 'External Acquisition', 
      title: 'Specialized Hire: AI Architect', 
      desc: 'Critical requirement to lead the technical foundation of the Strategic AI initiative.',
      impact: 'Critical',
      icon: Sparkles
    }
  ];

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1rem' }}>
          <Target size={20} color="var(--ni-carmine)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--ni-carmine)', textTransform: 'uppercase' }}>Strategic Gaps</span>
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Organizational Readiness</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '700px' }}>
          Real-time analysis of current capability vs. future-state requirements for 2026 Strategic Objectives.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ borderTop: '4px solid var(--ni-carmine)', background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ padding: '10px', background: 'rgba(164, 52, 58, 0.05)', borderRadius: '12px' }}>
              <AlertCircle color="var(--ni-carmine)" size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ni-carmine)', background: 'rgba(164, 52, 58, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>URGENT</span>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--ni-charcoal)', lineHeight: 1 }}>12</p>
          <p style={{ fontWeight: 700, marginTop: '8px' }}>Critical Capability Gaps</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Skills missing for core digital initiatives.</p>
        </div>
        
        <div className="glass-card" style={{ borderTop: '4px solid var(--ni-sunlight)', background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ padding: '10px', background: 'rgba(246, 169, 0, 0.05)', borderRadius: '12px' }}>
              <Target color="var(--ni-sunlight)" size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b37a00', background: 'rgba(246, 169, 0, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>STABLE</span>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--ni-charcoal)', lineHeight: 1 }}>64%</p>
          <p style={{ fontWeight: 700, marginTop: '8px' }}>Global Readiness Index</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Current workforce alignment with future state.</p>
        </div>

        <div className="glass-card" style={{ borderTop: '4px solid var(--ni-teal)', background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ padding: '10px', background: 'rgba(0, 125, 132, 0.05)', borderRadius: '12px' }}>
              <TrendingUp color="var(--ni-teal)" size={24} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ni-teal)', background: 'rgba(0, 125, 132, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>ACCELERATING</span>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--ni-charcoal)', lineHeight: 1 }}>+14.2%</p>
          <p style={{ fontWeight: 700, marginTop: '8px' }}>Talent Velocity</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Quarterly growth in mission-critical skills.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <section className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Priority Gap Topology
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {gaps.map(gap => (
              <div key={gap.title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{gap.title}</span>
                    <span style={{ marginLeft: '10px', fontSize: '0.75rem', fontWeight: 800, color: gap.trend.startsWith('+') ? 'var(--ni-teal)' : 'var(--ni-carmine)' }}>{gap.trend}</span>
                  </div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 900, 
                    color: gap.status === 'Critical' ? 'var(--ni-carmine)' : 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {gap.status}
                  </span>
                </div>
                <div style={{ height: '10px', background: 'var(--ni-charcoal-muted)', borderRadius: '99px', overflow: 'hidden', display: 'flex', position: 'relative' }}>
                  <div style={{ width: `${gap.current}%`, background: 'var(--ni-navy)', borderRadius: '99px', position: 'relative', zIndex: 2 }} />
                  <div style={{ width: `${gap.target - gap.current}%`, background: 'var(--ni-navy)', opacity: 0.1, zIndex: 1 }} />
                  <div style={{ position: 'absolute', right: `${100 - gap.target}%`, top: 0, bottom: 0, width: '2px', background: 'var(--ni-carmine)', zIndex: 3 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                   <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Current: {gap.current}%</span>
                   <span style={{ fontSize: '0.7rem', color: 'var(--ni-carmine)', fontWeight: 800 }}>Target: {gap.target}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Strategic Recommendations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {recommendations.map((rec, idx) => (
              <div key={idx} className="glass-card" style={{ background: 'white', display: 'flex', gap: '1.5rem', padding: '1.5rem' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '14px', background: 'var(--ni-charcoal-muted)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                }}>
                  <rec.icon size={22} color="var(--ni-charcoal)" />
                </div>
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                     <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--ni-teal)', textTransform: 'uppercase', letterSpacing: '1px' }}>{rec.type}</span>
                     <span style={{ width: '4px', height: '4px', background: 'var(--ni-charcoal-muted)', borderRadius: '50%' }}></span>
                     <span style={{ fontSize: '0.7rem', fontWeight: 900, color: rec.impact === 'Critical' ? 'var(--ni-carmine)' : 'var(--ni-sunlight)', textTransform: 'uppercase' }}>Impact: {rec.impact}</span>
                   </div>
                   <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px' }}>{rec.title}</h4>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GapAnalysis;
