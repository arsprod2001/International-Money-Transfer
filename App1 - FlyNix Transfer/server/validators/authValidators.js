const { body } = require('express-validator');

module.exports = {
  authValidators: [
    body('email')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail(),
    
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/\d/).withMessage('Password must contain at least one number')
  ]
};