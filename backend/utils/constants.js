// Application constants and enums

const JOB_STATUSES = {
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected'
};

const JOB_TYPES = {
  INTERNSHIP: 'Internship',
  FULL_TIME: 'Full-time',
  REMOTE: 'Remote',
  HYBRID: 'Hybrid'
};

const STATUS_COLORS = {
  [JOB_STATUSES.APPLIED]: '#3B82F6',    // Blue
  [JOB_STATUSES.INTERVIEW]: '#F59E0B',  // Yellow
  [JOB_STATUSES.OFFER]: '#10B981',      // Green
  [JOB_STATUSES.REJECTED]: '#EF4444'    // Red
};

module.exports = {
  JOB_STATUSES,
  JOB_TYPES,
  STATUS_COLORS
};
