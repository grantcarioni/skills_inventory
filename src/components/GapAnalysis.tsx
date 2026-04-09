import React from 'react';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

const GapAnalysis: React.FC = () => {
  const gaps = [
    { title: 'AI & Machine Learning', current: 15, target: 85, status: 'Critical' },
    { title: 'Digital Transformation', current: 45, target: 90, status: 'Warning' },
    { title: 'Data Governance', current: 60, target: 95, status: 'On Track' },
    { title: 'Change Management', current: 30, target: 75, status: 'Warning' },
  ];

  return (
    <div className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ borderLeft: '5px solid var(--ni-carmine)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <AlertCircle color="var(--ni-carmine)" />
            <h3 style={{ margin: 0 }}>Critical Gaps</h3>
          </div>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>12</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Skills missing for 2026 Strategic Objectives</p>
        </div>
        
        <div className="glass-card" style={{ borderLeft: '5px solid var(--ni-sunlight)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <Target color="var(--ni-sunlight)" />
            <h3 style={{ margin: 0 }}>Target Alignment</h3>
          </div>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>64%</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Current workforce vs. future-state readiness</p>
        </div>

        <div className="glass-card" style={{ borderLeft: '5px solid var(--ni-teal)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <TrendingUp color="var(--ni-teal)" />
            <h3 style={{ margin: 0 }}>Talent Velocity</h3>
          </div>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>+14%</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Increase in internal upskilling vs. Q4</p>
        </div>
      </div>

      <div className="glass-card">
        <h3 style={{ marginBottom: '1.5rem' }}>Skills Gap Heatmap (Strategic vs. Actual)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {gaps.map(gap => (
            <div key={gap.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 600 }}>{gap.title}</span>
                <span style={{ color: gap.status === 'Critical' ? 'var(--ni-carmine)' : 'var(--text-secondary)' }}>
                  {gap.status} ({gap.current}% vs {gap.target}%)
                </span>
              </div>
              <div style={{ height: '8px', background: 'rgba(37, 55, 70, 0.05)', borderRadius: '99px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${gap.current}%`, background: 'var(--ni-navy)', borderRadius: '99px' }} />
                <div style={{ width: `${gap.target - gap.current}%`, background: 'var(--ni-charcoal)', opacity: 0.2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GapAnalysis;
