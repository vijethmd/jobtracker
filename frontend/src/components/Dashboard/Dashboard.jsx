import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/job.service';
import Stats from './Stats';
import JobBoard from '../Jobs/JobBoard';
import JobFilters from '../Jobs/JobFilters';
import JobForm from '../Jobs/JobForm';
import Modal from '../common/Modal';
import Button from '../common/Button';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    successRate: 0
  });
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getAllJobs(filters);
      setJobs(response.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await jobService.getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setShowModal(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowModal(true);
  };

  const handleSubmitJob = async (formData) => {
    if (editingJob) {
      await jobService.updateJob(editingJob._id, formData);
    } else {
      await jobService.createJob(formData);
    }
    setShowModal(false);
    setEditingJob(null);
    fetchJobs();
    fetchStats();
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobService.deleteJob(id);
        fetchJobs();
        fetchStats();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await jobService.updateJob(id, { status: newStatus });
      fetchJobs();
      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Job Application Tracker</h1>
          <p className="page-subtitle">Manage and track all your applications in one place</p>
        </div>
        <Button onClick={handleAddJob}>
          + Add New Job
        </Button>
      </div>

      <Stats stats={stats} />

      <div className="dashboard-content">
        <JobFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs found</h3>
            <p>Start by adding your first job application!</p>
            <Button onClick={handleAddJob}>Add Job</Button>
          </div>
        ) : (
          <JobBoard
            jobs={jobs}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingJob(null);
        }}
        title={editingJob ? 'Edit Job Application' : 'Add New Job Application'}
      >
        <JobForm
          job={editingJob}
          onSubmit={handleSubmitJob}
          onCancel={() => {
            setShowModal(false);
            setEditingJob(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
