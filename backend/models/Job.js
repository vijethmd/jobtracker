const mongoose = require('mongoose');
const { JOB_STATUSES, JOB_TYPES } = require('../utils/constants');

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // Index for faster queries
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role/Position is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
    enum: Object.values(JOB_TYPES),
    default: JOB_TYPES.FULL_TIME
  },
  applicationDate: {
    type: Date,
    required: [true, 'Application date is required'],
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(JOB_STATUSES),
    default: JOB_STATUSES.APPLIED
  },
  salary: {
    type: String,
    trim: true,
    maxlength: [50, 'Salary cannot exceed 50 characters']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Compound index for user queries
jobSchema.index({ user: 1, status: 1 });
jobSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Job', jobSchema);
