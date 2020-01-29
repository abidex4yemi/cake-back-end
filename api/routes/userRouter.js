const express = require('express');
const userController = require('../controllers/user');
const validateCreateUser = require('../middleware/validateCreateUser');

const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(validateCreateUser, userController.createUserProfile);

module.exports = userRouter;
