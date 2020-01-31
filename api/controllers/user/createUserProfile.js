const db = require('../../models');
const auth = require('../../util/auth');
const hashHelper = require('../../util/hashHelper');
const { handleSuccessResponse, CREATED } = require('../../util/success');
const { createError, CONFLICT, GENERIC_ERROR } = require('../../util/error');

const { User } = db.models;

/**
 * Create new user profile account
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUserProfile = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return next(
        createError({
          message:
            'An account with that email address already exists. Please login to continue.',
          status: CONFLICT
        })
      );
    }

    // Hash password
    req.body.password = hashHelper.hash(req.body.password);

    // Hash security answers to questions
    const securityQuestionsAndAnswer = req.body.securityQuestions.map(
      ({ question, answer }) => {
        return {
          question,
          answer: hashHelper.hash(answer.trim())
        };
      }
    );

    req.body.securityQuestions = securityQuestionsAndAnswer;

    const user = await User.create(req.body);

    user.password = undefined;
    user.securityQuestions = undefined;

    const payload = {
      id: user._id
    };

    const options = {
      expiresIn: '24h'
    };

    const token = auth.generateToken(payload, options);

    return res.status(CREATED).json(
      handleSuccessResponse({
        message: 'Account created successfully',
        data: {
          token,
          user
        }
      })
    );
  } catch (error) {
    console.log(error);
    return next(
      createError({
        message: 'Could not create new user profile',
        status: GENERIC_ERROR
      })
    );
  }
};

module.exports = createUserProfile;
