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
  password: Joi.string()
    .min(6)
    .max(100)
    .label('Password')
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .label('Email')
    .trim()
    .required(),
  avatar: Joi.string()
    .trim()
    .required(),
  phoneNumber: Joi.string()
    .trim()
    .required(),
  address: Joi.string()
    .trim()
    .required(),
  dateOfBirth: Joi.string()
    .trim()
    .required(),
  securityQuestions: Joi.array()
    .items(
      Joi.object().keys({
        question: Joi.string()
          .trim()
          .required(),
        answer: Joi.string()
          .trim()
          .required()
      })
    )
    .length(3)
    .required()
});

/**
 * Validate user body against defined schema
 */
const validateCreateProfileData = (req, res, next) =>
  joiValidate(req, res, next, userSchema);

module.exports = validateCreateProfileData;
