import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Skill } from '../types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillRadarProps {
  skills: Skill[];
  color?: string;
}

const SkillRadar: React.FC<SkillRadarProps> = ({ skills, color = '#A4343A' }) => {
  // Aggregate skills by category for the radar chart
  const categoryStats: Record<string, { total: number, count: number }> = {};
  
  const getLevel = (exp: string): number => {
    const num = parseInt(exp) || 0;
    if (num >= 15) return 5;
    if (num >= 8) return 4;
    if (num >= 5) return 3;
    if (num >= 3) return 2;
    return 1;
  };

  skills.forEach(s => {
    if (!categoryStats[s.category]) {
      categoryStats[s.category] = { total: 0, count: 0 };
    }
    categoryStats[s.category].total += getLevel(s.experience);
    categoryStats[s.category].count += 1;
  });

  const labels = Object.keys(categoryStats);
  const dataValues = labels.map(label => {
    const stat = categoryStats[label];
    return stat.total / stat.count;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Proficiency Level',
        data: dataValues,
        backgroundColor: `${color}33`, // Adding 20% opacity
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(37, 55, 70, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          display: false
        },
        grid: {
          color: 'rgba(37, 55, 70, 0.05)'
        },
        pointLabels: {
          font: {
            family: 'Inter',
            size: 10,
            weight: 600 as const
          },
          color: 'var(--ni-charcoal)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '250px' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillRadar;
