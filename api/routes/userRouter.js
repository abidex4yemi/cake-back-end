const express = require('express');
const userController = require('../controllers/user');
const validateCreateUser = require('../middleware/validateCreateUser');
const validateLoginData = require('../middleware/validateLoginData');

const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(validateCreateUser, userController.createUserProfile);
userRouter.route('/login').post(validateLoginData, userController.login);

module.exports = userRouter;
