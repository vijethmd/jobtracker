import React from 'react';
import JobCard from './JobCard';

const JobBoard = ({ jobs, onEdit, onDelete, onStatusChange }) => {
  const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

  const getJobsByStatus = (status) => {
    return jobs.filter(job => job.status === status);
  };

  return (
    <div className="job-board">
      {statuses.map(status => {
        const statusJobs = getJobsByStatus(status);
        return (
          <div key={status} className="board-column">
            <div className="column-header">
              <h3 className="column-title">{status}</h3>
              <span className="column-count">{statusJobs.length}</span>
            </div>
            <div className="column-content">
              {statusJobs.length === 0 ? (
                <p className="empty-message">No jobs in this status</p>
              ) : (
                statusJobs.map(job => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobBoard;
