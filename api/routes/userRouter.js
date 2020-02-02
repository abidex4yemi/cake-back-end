const express = require('express');
const userController = require('../controllers/user');
const validateCreateProfileData = require('../middleware/validateCreateProfileData');
const validateUpdateProfileData = require('../middleware/validateUpdateProfileData');
const validateResetPassword = require('../middleware/validateResetPassword');
const validateLoginData = require('../middleware/validateLoginData');
const auth = require('../util/auth');

const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(validateCreateProfileData, userController.createUserProfile);
userRouter.route('/login').post(validateLoginData, userController.login);
userRouter
  .route('/profile')
  .put(
    auth.verifyToken,
    validateUpdateProfileData,
    userController.updateProfile
  );

// Note: this requires email as a query
userRouter
  .route('/users/security-questions')
  .get(userController.getUserSecurityQuestions);

userRouter
  .route('/user/reset-password')
  .put(validateResetPassword, userController.resetPassword);

module.exports = userRouter;
