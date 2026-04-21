import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import { Employee } from '../types';
import { Activity, Globe, LayoutDashboard, Users } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface DashboardAnalyticsProps {
  employees: Employee[];
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ employees }) => {
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    employees.forEach(emp => {
      emp.skills.forEach(s => {
        if (s.category) stats[s.category] = (stats[s.category] || 0) + 1;
      });
    });
    return stats;
  }, [employees]);

  const locationStats = useMemo(() => {
    const stats: Record<string, number> = {};
    employees.forEach(emp => {
      const loc = emp.location || 'Global';
      stats[loc] = (stats[loc] || 0) + 1;
    });
    return stats;
  }, [employees]);

  const barData = {
    labels: Object.keys(categoryStats),
    datasets: [{
      label: 'Skills Distribution',
      data: Object.values(categoryStats),
      backgroundColor: 'rgba(164, 52, 58, 0.8)',
      hoverBackgroundColor: 'var(--ni-carmine)',
      borderRadius: 8,
    }]
  };

  const pieData = {
    labels: Object.keys(locationStats),
    datasets: [{
      data: Object.values(locationStats),
      backgroundColor: ['#253746', '#A4343A', '#007D84', '#F6A900', '#003B5C'],
      hoverOffset: 4,
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const radarData = {
    labels: ['Technical', 'Managerial', 'Operational', 'Nutrition', 'Digital', 'Soft Skills'],
    datasets: [{
      label: 'Avg. Competency Pulse',
      data: [82, 74, 91, 68, 85, 88], 
      backgroundColor: 'rgba(0, 125, 132, 0.15)',
      borderColor: 'var(--ni-teal)',
      borderWidth: 3,
      pointBackgroundColor: 'var(--ni-teal)',
      pointHoverRadius: 6
    }]
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Activity size={18} color="var(--ni-carmine)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>Capability Landscape</h3>
             </div>
             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)' }}>UPDATED: Q2 2026</span>
          </div>
          <div style={{ flex: 1 }}>
            <Bar 
              data={barData} 
              options={{ 
                maintainAspectRatio: false, 
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { family: 'Inter', size: 10 } } },
                  x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 } } }
                }
              }} 
            />
          </div>
        </div>

        <div className="glass-card" style={{ background: 'var(--ni-charcoal)', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ opacity: 0.5, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Strategic Reach</p>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, margin: '1rem 0', lineHeight: 1, color: 'var(--ni-sunlight)' }}>{employees.length}</h1>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, maxWidth: '200px', lineHeight: 1.4 }}>Active Strategic Talent Nodes Mapped Globaly.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
               <div>
                 <p style={{ fontSize: '1.8rem', fontWeight: 900 }}>{Object.keys(categoryStats).length}</p>
                 <p style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Domains</p>
               </div>
               <div>
                 <p style={{ fontSize: '1.8rem', fontWeight: 900 }}>12</p>
                 <p style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Regions</p>
               </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1 }}>
             <Globe size={250} strokeWidth={1} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
        <div className="glass-card" style={{ height: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
            <LayoutDashboard size={18} color="var(--ni-teal)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>Competency Benchmark</h3>
          </div>
          <div style={{ height: '300px' }}>
            <Radar data={radarData} options={{ 
              maintainAspectRatio: false,
              scales: { r: { ticks: { display: false }, grid: { color: 'rgba(0,0,0,0.05)' } } }
            }} />
          </div>
        </div>

        <div className="glass-card" style={{ height: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
            <Users size={18} color="var(--ni-navy)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>Geographic Mapping</h3>
          </div>
          <div style={{ height: '280px' }}>
            <Pie data={pieData} options={{ 
              maintainAspectRatio: false,
              plugins: { legend: { position: 'right', labels: { font: { family: 'Inter', size: 11, weight: 600 } } } }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
