const Job = require('../models/Job');
const { JOB_STATUSES } = require('../utils/constants');

// @desc    Get all jobs for logged-in user
// @route   GET /api/jobs
// @access  Private
const getAllJobs = async (req, res) => {
  try {
    const { status, company, role, jobType, startDate, endDate, search } = req.query;
    
    // Build query
    const query = { user: req.session.userId };

    // Apply filters
    if (status) query.status = status;
    if (jobType) query.jobType = jobType;
    if (startDate || endDate) {
      query.applicationDate = {};
      if (startDate) query.applicationDate.$gte = new Date(startDate);
      if (endDate) query.applicationDate.$lte = new Date(endDate);
    }

    // Search across company and role
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    } else {
      // Individual field filters (only if not using search)
      if (company) query.company = { $regex: company, $options: 'i' };
      if (role) query.role = { $regex: role, $options: 'i' };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Private
const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.session.userId
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      user: req.session.userId
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error.message
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: error.message
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userId
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error.message
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/jobs/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const userId = req.session.userId;

    // Get all jobs for the user
    const jobs = await Job.find({ user: userId });

    // Calculate statistics
    const stats = {
      total: jobs.length,
      applied: jobs.filter(job => job.status === JOB_STATUSES.APPLIED).length,
      interview: jobs.filter(job => job.status === JOB_STATUSES.INTERVIEW).length,
      offer: jobs.filter(job => job.status === JOB_STATUSES.OFFER).length,
      rejected: jobs.filter(job => job.status === JOB_STATUSES.REJECTED).length
    };

    // Calculate success rate (offers / total non-rejected)
    const nonRejected = stats.total - stats.rejected;
    stats.successRate = nonRejected > 0 
      ? ((stats.offer / nonRejected) * 100).toFixed(1)
      : 0;

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getStats
};
