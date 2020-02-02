const db = require('../../models');
const { handleSuccessResponse, OK } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/error');

const { User } = db.models;

/**
 * Get user security questions
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUserSecurityQuestions = async (req, res, next) => {
  try {
    const userEmail = req.query.email || '';

    if (!userEmail.trim()) {
      return next(
        createError({
          message: 'User email is required',
          status: BAD_REQUEST
        })
      );
    }

    const userExist = await User.findOne({ email: userEmail });

    if (!userExist) {
      return next(
        createError({
          message: 'No user account with this email',
          status: NOT_FOUND
        })
      );
    }

    const securityQuestions = userExist.securityQuestions.map(
      ({ question, _id }) => ({ question, _id })
    );

    return res.status(OK).json(
      handleSuccessResponse({
        message: 'Security questions three(3)',
        data: { securityQuestions }
      })
    );
  } catch (error) {
    return next(
      createError({
        message: 'Could not get user security questions',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = getUserSecurityQuestions;
