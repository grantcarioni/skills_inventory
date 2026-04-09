import React from 'react';

interface ProficiencyBadgeProps {
  level: number; // 1-5
  label?: string;
}

const ProficiencyBadge: React.FC<ProficiencyBadgeProps> = ({ level, label }) => {
  const dots = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '3px' }}>
        {dots.map(d => (
          <div
            key={d}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: d <= level ? 'var(--ni-carmine)' : 'rgba(164, 52, 58, 0.15)',
              border: d <= level ? 'none' : '1px solid rgba(164, 52, 58, 0.2)'
            }}
          />
        ))}
      </div>
      {label && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>}
    </div>
  );
};

export default ProficiencyBadge;
