const db = require('../../models');
const { handleSuccessResponse, CREATED } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  NOT_FOUND,
  BAD_REQUEST
} = require('../../util/error');
const hashHelper = require('../../util/hashHelper');

const { User } = db.models;

/**
 * Reset user password
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, securityAnswers } = req.body;

    const existingUserRecord = await User.findOne({ email });

    if (!existingUserRecord) {
      return next(
        createError({
          message: 'No user account with this email',
          status: NOT_FOUND
        })
      );
    }

    const correctAnswers = [];

    // Todo: O(n^2) i need to refactor this code for better performance
    // Todo: this is a first pass solution
    for (let userProvidedAnswer of securityAnswers) {
      for (let existingAnswer of existingUserRecord.securityQuestions) {
        if (`${userProvidedAnswer.id}` === `${existingAnswer._id}`) {
          await hashHelper
            .verifyHash(userProvidedAnswer.answer, existingAnswer.answer)
            .then((answerMatch) => {
              if (answerMatch) {
                correctAnswers.push(answerMatch);
              }
            });
        }
      }
    }

    // check if any of the answer is wrong
    if (correctAnswers.length < 3) {
      return next(
        createError({
          message: 'Please provide valid security questions and answers',
          status: BAD_REQUEST
        })
      );
    }

    // Hash new password
    existingUserRecord.password = hashHelper.hash(newPassword);

    await User.updateOne({ _id: existingUserRecord._id }, existingUserRecord);

    existingUserRecord.securityQuestions = undefined;
    existingUserRecord.password = undefined;

    return res.status(CREATED).json(
      handleSuccessResponse({
        message: 'Password reset successful',
        data: {
          user: existingUserRecord
        }
      })
    );
  } catch (error) {
    return next(
      createError({
        message: 'Could not reset user password',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = resetPassword;
