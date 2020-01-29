const Joi = require('@hapi/joi');
const joiValidate = require('../util/validate');

/**
 * Users validation schema
 */
const userSchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .max(100)
    .label('First name')
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .max(100)
    .label('Last name')
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .label('Email')
    .trim()
    .required(),
  avatar: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  dateOfBirth: Joi.string().required()
});

/**
 * Validate user body against defined schema
 */
const validateUpdateProfileData = (req, res, next) =>
  joiValidate(req, res, next, userSchema);

module.exports = validateUpdateProfileData;
