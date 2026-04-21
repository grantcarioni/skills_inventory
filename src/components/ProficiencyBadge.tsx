import React from 'react';

interface ProficiencyBadgeProps {
  level: number; // 1-5
  label?: string;
}

const ProficiencyBadge: React.FC<ProficiencyBadgeProps> = ({ level, label }) => {
  const getLevelColor = (l: number) => {
    if (l === 5) return 'var(--ni-navy)';
    if (l === 4) return 'var(--ni-carmine)';
    if (l === 3) return 'var(--ni-teal)';
    if (l === 2) return 'var(--ni-sunlight)';
    return 'var(--ni-charcoal)';
  };

  const getLevelName = (l: number) => {
    const names = ['', 'Novice', 'Foundational', 'Intermediate', 'Advanced', 'Expert'];
    return names[l] || '';
  };

  return (
    <div className="proficiency-container" style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
          {getLevelName(level)}
        </span>
        {label && <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>}
      </div>
      <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
        {[1, 2, 3, 4, 5].map(d => (
          <div
            key={d}
            title={getLevelName(d)}
            style={{
              flex: 1,
              height: '100%',
              borderRadius: '2px',
              backgroundColor: d <= level ? getLevelColor(level) : 'rgba(37, 55, 70, 0.05)',
              transition: 'all 0.4s var(--ease)',
              transform: d <= level ? 'scaleY(1)' : 'scaleY(0.8)',
              opacity: d <= level ? 1 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProficiencyBadge;
