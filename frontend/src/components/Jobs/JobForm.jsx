import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const JobForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    jobType: 'Full-time',
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    salary: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || '',
        role: job.role || '',
        location: job.location || '',
        jobType: job.jobType || 'Full-time',
        applicationDate: job.applicationDate 
          ? new Date(job.applicationDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        status: job.status || 'Applied',
        salary: job.salary || '',
        notes: job.notes || ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      if (error.response?.data?.errors) {
        const fieldErrors = {};
        error.response.data.errors.forEach(err => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: error.response?.data?.message || 'Operation failed' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      {errors.general && (
        <div className="alert alert-error">{errors.general}</div>
      )}

      <div className="form-row">
        <Input
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Google, Microsoft, etc."
          required
          error={errors.company}
        />

        <Input
          label="Role / Position"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Software Engineer, etc."
          required
          error={errors.role}
        />
      </div>

      <div className="form-row">
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="San Francisco, CA"
          required
          error={errors.location}
        />

        <div className="input-group">
          <label htmlFor="jobType" className="input-label">
            Job Type <span className="text-red-500">*</span>
          </label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <Input
          label="Application Date"
          type="date"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          required
          error={errors.applicationDate}
        />

        <div className="input-group">
          <label htmlFor="status" className="input-label">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <Input
        label="Salary (Optional)"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="$120,000 - $150,000"
        error={errors.salary}
      />

      <div className="input-group">
        <label htmlFor="notes" className="input-label">Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional information, interview details, etc."
          className="input"
          rows="4"
          maxLength="1000"
        />
        {errors.notes && <span className="error-message">{errors.notes}</span>}
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : job ? 'Update Job' : 'Add Job'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
