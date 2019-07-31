const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../services/authenticateUser');
const { validateUser } = require('../services/validationChain');
const { collectEmail, confirmEmail } = require('../services/emailController');
const asyncHandler = require('../services/asyncErrorHanlder');
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../services/userFunctions');
const { User } = require('../models');

// User Routes
//GET /api/users 200 - Returns the currently authenticated user
router.get('/users', authenticateUser, (req, res) => {
  const session = req.session;
  const user = getUser(session);
  res.status(200).json(user);
});
//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns 'User created succesfully'
router.post(
  '/users',
  validateUser,
  asyncHandler(async (req, res) => {
    const user = req.body;

    await createUser(user);
    res
      .location('/')
      .status(201)
      .json({
        message: `Account for ${user.firstName} Created Successfully!`,
      });
  })
);

// PUT /api/users - updates user and returns no content
router.put('/users', authenticateUser, validateUser, async (req, res) => {
  const currentUserId = req.session.user.id;
  const body = req.body;
  await updateUser(currentUserId, body);
  res.status(204).end();
});
// DELETE (Careful, this deletes users from the DB) /api/users 204 - deletes a user, sets the location to '/', and returns no content
router.delete(
  '/users',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.session.user;
    await deleteUser(user);
    res
      .status(204)
      .location('/')
      .end();
  })
);

router.post('/email', collectEmail);
router.get('/email/confirm/:id', confirmEmail);

module.exports = router;
