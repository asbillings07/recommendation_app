const { check, validationResult } = require('express-validator');
const {
  User,
  Recommendations,
  Category,
  Rating,
  Comment,
} = require('../models');

// displays errors to the user when fields are left empty or filled out incorrectly.
const errorHanlder = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    res.status(400).json({ errors: errorMessages });
  } else {
    next();
  }
};

const validateCategory = [
  check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a title for the category.'),
];
// checks firstName, lastName, email, and password for the user
const validateUser = [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for First Name'),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for Last Name'),
  check('email')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isEmail()
    .withMessage('Email Address must be formated correctly')
    .custom(value => {
      if (!value) {
        return null;
      } else {
        return User.findOne({ where: { email: value } }).then(user => {
          if (user) {
            return Promise.reject(
              'E-mail already in use, please use another email. '
            );
          }
        });
      }
    }),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({ min: 8 }) // need to make sure pw is alphaNumeric later
    .withMessage(
      'Please provide a value for password that is atleast 8 chars long'
    ),
  errorHanlder,
];
// checks to make sure title, desc, and location on the recommendation route are not blank
const validateRecommendation = [
  check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please include a title in your recommendation'),
  check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please add a description of the place you wish to recommend'),
  check('location')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(
      'Please add a location so others can visit your recommendation'
    ),
  errorHanlder,
];
const validateRating = [
  check('rate')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a rating'),
  errorHanlder,
];
const validateEmail = [
  check('email')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isEmail()
    .withMessage('Email Address must be formated correctly'),
];
const validateComment = [
  check('comment')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a comment'),
  errorHanlder,
];
const validateUpdateUser = [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for First Name'),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for Last Name'),
  check('email')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isEmail()
    .withMessage('Email Address must be formated correctly'),
];
module.exports = {
  validateUser,
  validateRecommendation,
  validateCategory,
  validateRating,
  validateEmail,
  validateComment,
  validateUpdateUser,
};
