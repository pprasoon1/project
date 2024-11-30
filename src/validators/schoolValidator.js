const { body, query } = require('express-validator');

const addSchoolValidator = [
  body('name').notEmpty().trim().withMessage('School name is required'),
  body('address').notEmpty().trim().withMessage('Address is required'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude value'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude value'),
];

const listSchoolsValidator = [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude value'),
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude value'),
];

module.exports = {
  addSchoolValidator,
  listSchoolsValidator
};