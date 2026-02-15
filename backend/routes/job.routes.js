const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getStats
} = require('../controllers/job.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const { createJobSchema, updateJobSchema } = require('../validators/job.validator');

// All job routes require authentication
router.use(requireAuth);

// Statistics route (must be before /:id route)
router.get('/stats', getStats);

// CRUD routes
router.route('/')
  .get(getAllJobs)
  .post(validate(createJobSchema), createJob);

router.route('/:id')
  .get(getJobById)
  .put(validate(updateJobSchema), updateJob)
  .delete(deleteJob);

module.exports = router;
