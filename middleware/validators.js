const { check, validationResult } = require('express-validator');
const { ErrorResponse } = require('../utils/ErrorResponse');
const mongoose = require('mongoose');

const validateRequest = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(err => err.msg).join(', ');
    return next(new ErrorResponse(message, 400));
  }
  next();
};

const isValidObjectId = value => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('Invalid ID format');
  }
  return true;
};

// Validation chains
module.exports = {
  validateRegister: [
    check('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
    check('email')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail(),
    check('password')
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
      }).withMessage('Password must contain at least 8 characters with 1 uppercase, 1 lowercase, and 1 number'),
    (req, res, next) => validateRequest(req, next)
  ],

  validateLogin: [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').exists().withMessage('Password is required'),
    (req, res, next) => validateRequest(req, next)
  ],

  validatePetId: [
    check('petId')
      .custom(isValidObjectId).withMessage('Invalid pet ID'),
    (req, res, next) => validateRequest(req, next)
  ],

  validateAdoption: [
    check('petId')
      .custom(isValidObjectId).withMessage('Invalid pet ID'),
    check('message')
      .trim()
      .notEmpty().withMessage('Message is required')
      .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters'),
    (req, res, next) => validateRequest(req, next)
  ],
  
  validateRequestId: [
    check('requestId')
      .custom(isValidObjectId).withMessage('Invalid request ID'),
    (req, res, next) => validateRequest(req, next)
  ],

  validateProfileUpdate: [
    check('name')
      .optional()
      .trim()
      .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
    check('location')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
    check('avatarUrl')
      .optional()
      .isURL().withMessage('Invalid avatar URL format'),
    (req, res, next) => validateRequest(req, next)
  ]
};