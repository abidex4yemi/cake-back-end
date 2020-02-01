const db = require('../../models');
const { handleSuccessResponse, CREATED } = require('../../util/success');
const { createError, GENERIC_ERROR } = require('../../util/error');

const { User } = db.models;

/**
 * update user profile
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateProfile = async (req, res, next) => {
  try {
    const userIsLoggedIn = req.user;

    if (!userIsLoggedIn) {
      return next(
        createError({
          status: UNAUTHORIZED,
          message: 'Unauthorized!, you have to login'
        })
      );
    }

    const existingUserRecord = await User.findOne({
      _id: userIsLoggedIn.id
    }).select('+password');

    if (!existingUserRecord) {
      return next(
        createError({
          status: UNAUTHORIZED,
          message: 'Unauthorized!, you have to login'
        })
      );
    }

    req.body.securityQuestions = existingUserRecord.securityQuestions;
    req.body.password = existingUserRecord.password;

    await User.updateOne({ _id: userIsLoggedIn.id }, req.body);

    delete req.body.securityQuestions;
    delete req.body.password;

    return res.status(CREATED).json(
      handleSuccessResponse({
        message: 'Profile updated successfully',
        data: {
          user: req.body
        }
      })
    );
  } catch (error) {
    return next(
      createError({
        message: 'Could not update user profile',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = updateProfile;
