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

    const user = await User.findOne({ _id: req.user.id }).select('+password');

    req.body.securityQuestions = user.securityQuestions;
    req.body.password = user.password;

    const updatedProfile = await User.findOneAndUpdate(
      { _id: req.user.id },
      req.body
    );

    updatedProfile.password = undefined;
    updatedProfile.securityQuestions = undefined;

    return res.status(CREATED).json(
      handleSuccessResponse({
        message: 'Profile updated successfully',
        data: updatedProfile
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
