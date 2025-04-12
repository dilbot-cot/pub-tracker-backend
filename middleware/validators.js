// middleware/validators.js
const { body, validationResult } = require('express-validator');

// Validation rules

exports.validateRegister = [
  body('email', 'Valid email required').isEmail(),
  body('password', 'Password must be 6+ characters').isLength({ min: 6 })
];

exports.validateLogin = [
  body('email', 'Valid email required').isEmail(),
  body('password', 'Password required').exists()
];

exports.validatePub = [
  body('name', 'Pub name is required').notEmpty()
];

exports.validateSpecial = [
  body('dayOfWeek', 'Day is required').isIn([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]),
  body('mealName', 'Meal name is required').notEmpty(),
  body('price', 'Price must be a number').isNumeric(),
  body('mealType', 'Valid mealType ID is required').isMongoId()
];

// Shared error handler middleware
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
