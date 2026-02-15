// Middleware to protect routes - ensures user is authenticated

const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please log in.'
    });
  }
  next();
};

// Middleware to redirect authenticated users (optional - for login/signup pages)
const requireGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.status(403).json({
      success: false,
      message: 'Already authenticated'
    });
  }
  next();
};

module.exports = {
  requireAuth,
  requireGuest
};
