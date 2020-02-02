const Joi = require('@hapi/joi');
const joiValidate = require('../util/validate');

/**
 * Users validation schema
 */
const userPasswordResetSchema = Joi.object().keys({
  newPassword: Joi.string()
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
  securityAnswers: Joi.array()
    .items(
      Joi.object().keys({
        question: Joi.string()
          .required()
          .trim(),
        answer: Joi.string()
          .required()
          .trim(),
        id: Joi.string()
          .required()
          .trim()
      })
    )
    .length(3)
    .required()
});

/**
 * Validate user reset password data against defined schema
 */
const validateResetPassword = (req, res, next) =>
  joiValidate(req, res, next, userPasswordResetSchema);

module.exports = validateResetPassword;
