const express = require('express');
const router = express.Router();
const { signup, login, logout, getCurrentUser } = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const { signupSchema, loginSchema } = require('../validators/auth.validator');

// Public routes
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getCurrentUser);

module.exports = router;
