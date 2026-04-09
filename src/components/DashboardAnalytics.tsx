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
      backgroundColor: '#A4343A',
      borderRadius: 6,
    }]
  };

  const pieData = {
    labels: Object.keys(locationStats),
    datasets: [{
      data: Object.values(locationStats),
      backgroundColor: ['#253746', '#A4343A', '#007D84', '#F6A900', '#003B5C'],
      borderWidth: 0,
    }]
  };

  const radarData = {
    labels: ['Technical', 'Managerial', 'Operational', 'Nutrition', 'Digital', 'Soft Skills'],
    datasets: [{
      label: 'Dataset Average Profile',
      data: [85, 65, 90, 70, 75, 95], // Mocked average data for visual impact
      backgroundColor: 'rgba(164, 52, 58, 0.2)',
      borderColor: '#A4343A',
      borderWidth: 2,
    }]
  };

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Global Talent Insights</h2>
        <p style={{ color: 'var(--text-muted)' }}>Advanced analytics and workforce distribution metrics</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Category Landscape</h3>
          <div style={{ height: '300px' }}>
            <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Geographic Distribution</h3>
          <div style={{ height: '300px' }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Organization Competency Profile</h3>
          <div style={{ height: '350px' }}>
            <Radar data={radarData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--ni-charcoal)', color: 'white' }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Total Workforce Mapped</p>
            <h1 style={{ fontSize: '5rem', margin: '1rem 0', color: 'var(--ni-sunlight)' }}>{employees.length}</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '2rem' }}>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Object.keys(categoryStats).length}</p>
                <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Core Categories</p>
              </div>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12</p>
                <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Country Offices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
