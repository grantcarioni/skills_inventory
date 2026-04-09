import React from 'react';
import { LayoutDashboard, Users, Grid, PieChart, Info, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'talent', label: 'Talent Directory', icon: Users },
    { id: 'matrix', label: 'Skills Matrix', icon: Grid },
    { id: 'analytics', label: 'Advanced Analytics', icon: PieChart },
  ];

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '2.5rem', paddingLeft: '0.8rem' }}>
        <h1 style={{ color: 'var(--ni-white)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--ni-carmine)' }}>Skills</span>Map
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
          By Nutrition International
        </p>
      </div>

      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{ padding: '1rem 0' }}>
        <button className="nav-item">
          <Info size={18} />
          <span>Support</span>
        </button>
        <button className="nav-item">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
