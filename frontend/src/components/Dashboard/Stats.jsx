import React from 'react';

const Stats = ({ stats }) => {
  const statCards = [
    { label: 'Total Applications', value: stats.total, color: 'blue' },
    { label: 'Applied', value: stats.applied, color: 'blue' },
    { label: 'Interviews', value: stats.interview, color: 'yellow' },
    { label: 'Offers', value: stats.offer, color: 'green' },
    { label: 'Rejected', value: stats.rejected, color: 'red' },
    { label: 'Success Rate', value: `${stats.successRate}%`, color: 'purple' }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className={`stat-card stat-${stat.color}`}>
          <h3 className="stat-label">{stat.label}</h3>
          <p className="stat-value">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
