const Joi = require('joi');
const { JOB_STATUSES, JOB_TYPES } = require('../utils/constants');

// Create job validation schema
const createJobSchema = Joi.object({
  company: Joi.string()
    .max(100)
    .trim()
    .required()
    .messages({
      'string.empty': 'Company name is required',
      'string.max': 'Company name cannot exceed 100 characters',
      'any.required': 'Company name is required'
    }),
  role: Joi.string()
    .max(100)
    .trim()
    .required()
    .messages({
      'string.empty': 'Role/Position is required',
      'string.max': 'Role cannot exceed 100 characters',
      'any.required': 'Role/Position is required'
    }),
  location: Joi.string()
    .max(100)
    .trim()
    .required()
    .messages({
      'string.empty': 'Location is required',
      'string.max': 'Location cannot exceed 100 characters',
      'any.required': 'Location is required'
    }),
  jobType: Joi.string()
    .valid(...Object.values(JOB_TYPES))
    .required()
    .messages({
      'any.only': `Job type must be one of: ${Object.values(JOB_TYPES).join(', ')}`,
      'any.required': 'Job type is required'
    }),
  applicationDate: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.base': 'Application date must be a valid date',
      'date.max': 'Application date cannot be in the future',
      'any.required': 'Application date is required'
    }),
  status: Joi.string()
    .valid(...Object.values(JOB_STATUSES))
    .default(JOB_STATUSES.APPLIED)
    .messages({
      'any.only': `Status must be one of: ${Object.values(JOB_STATUSES).join(', ')}`
    }),
  salary: Joi.string()
    .max(50)
    .trim()
    .allow('', null)
    .messages({
      'string.max': 'Salary cannot exceed 50 characters'
    }),
  notes: Joi.string()
    .max(1000)
    .trim()
    .allow('', null)
    .messages({
      'string.max': 'Notes cannot exceed 1000 characters'
    })
});

// Update job validation schema (all fields optional)
const updateJobSchema = Joi.object({
  company: Joi.string()
    .max(100)
    .trim()
    .messages({
      'string.max': 'Company name cannot exceed 100 characters'
    }),
  role: Joi.string()
    .max(100)
    .trim()
    .messages({
      'string.max': 'Role cannot exceed 100 characters'
    }),
  location: Joi.string()
    .max(100)
    .trim()
    .messages({
      'string.max': 'Location cannot exceed 100 characters'
    }),
  jobType: Joi.string()
    .valid(...Object.values(JOB_TYPES))
    .messages({
      'any.only': `Job type must be one of: ${Object.values(JOB_TYPES).join(', ')}`
    }),
  applicationDate: Joi.date()
    .max('now')
    .messages({
      'date.base': 'Application date must be a valid date',
      'date.max': 'Application date cannot be in the future'
    }),
  status: Joi.string()
    .valid(...Object.values(JOB_STATUSES))
    .messages({
      'any.only': `Status must be one of: ${Object.values(JOB_STATUSES).join(', ')}`
    }),
  salary: Joi.string()
    .max(50)
    .trim()
    .allow('', null)
    .messages({
      'string.max': 'Salary cannot exceed 50 characters'
    }),
  notes: Joi.string()
    .max(1000)
    .trim()
    .allow('', null)
    .messages({
      'string.max': 'Notes cannot exceed 1000 characters'
    })
}).min(1); // At least one field must be present

module.exports = {
  createJobSchema,
  updateJobSchema
};
