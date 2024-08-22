const {body} = require("express-validator")
const jwt = require('jsonwebtoken')

const validateRegistration = [
    body('email')
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),

    body('name')
    .not().isEmpty()
    .withMessage("Name is required")
    .trim()
    .escape(),

    body('password')
    .isLength({ min: 8 , max: 20}).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[^\w\s]/).withMessage('Password must contain at least one special character')
    .not().matches(/[\s]/).withMessage('Password must not contain spaces'),

    body('mobile')
    .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Please enter a valid mobile number'),

]

const verifyToken = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;

    next();
  });
}

// Middleware to check user role
const authorizeRole = (roles) => {
    return (req, res, next) => {
    
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      next();
    };
  };




module.exports = {
    validateRegistration,
    verifyToken,
    authorizeRole
}