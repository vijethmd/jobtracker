import React from 'react';

const JobFilters = ({ filters, onFilterChange, onReset }) => {
  const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
  const jobTypes = ['Internship', 'Full-time', 'Remote', 'Hybrid'];

  return (
    <div className="filters-container">
      <div className="filters-grid">
        <input
          type="text"
          name="search"
          placeholder="Search company or role..."
          value={filters.search || ''}
          onChange={onFilterChange}
          className="filter-input"
        />

        <select
          name="status"
          value={filters.status || ''}
          onChange={onFilterChange}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          name="jobType"
          value={filters.jobType || ''}
          onChange={onFilterChange}
          className="filter-select"
        >
          <option value="">All Types</option>
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <button onClick={onReset} className="filter-reset">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;
