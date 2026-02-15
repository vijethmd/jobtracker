import React from 'react';

const JobCard = ({ job, onEdit, onDelete, onStatusChange }) => {
  const statusColors = {
    'Applied': 'status-applied',
    'Interview': 'status-interview',
    'Offer': 'status-offer',
    'Rejected': 'status-rejected'
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-company">{job.company}</h3>
          <p className="job-role">{job.role}</p>
        </div>
        <span className={`job-status ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>

      <div className="job-card-body">
        <div className="job-info-grid">
          <div className="job-info-item">
            <span className="info-label">Location:</span>
            <span className="info-value">{job.location}</span>
          </div>
          <div className="job-info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">{job.jobType}</span>
          </div>
          <div className="job-info-item">
            <span className="info-label">Applied:</span>
            <span className="info-value">{formatDate(job.applicationDate)}</span>
          </div>
          {job.salary && (
            <div className="job-info-item">
              <span className="info-label">Salary:</span>
              <span className="info-value">{job.salary}</span>
            </div>
          )}
        </div>

        {job.notes && (
          <div className="job-notes">
            <span className="info-label">📝 Notes:</span>
            <p className="notes-text">{job.notes}</p>
          </div>
        )}
      </div>

      <div className="job-card-actions">
        <select
          value={job.status}
          onChange={(e) => onStatusChange(job._id, e.target.value)}
          className="status-select"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div className="action-buttons">
          <button onClick={() => onEdit(job)} className="btn-edit">
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(job._id)} className="btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
