const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../services/authenticateUser');
const { validateUser } = require('../services/validationChain');
const {
  getUser,
  createUser,
  deleteUser,
} = require('../services/userFunctions');

// User Routes
//GET /api/users 200 - Returns the currently authenticated user
router.get('/users', authenticateUser, (req, res) => {
  const user = req.currentUser;
  const users = getUser(user);
  res.status(200).json({
    users,
  });
});
//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns 'User created succesfully'
router.post('/users', validateUser, async (req, res) => {
  const user = req.body;
  const users = await createUser(user);
  if (users) {
    res
      .location('/')
      .status(201)
      .json({ message: 'User Created Successfully!' });
  } else {
    res.status(400).json({
      error: 'something went wrong',
    });
    console.log(error);
  }
});
// DELETE (Careful, this deletes users from the DB) /api/users 204 - deletes a user, sets the location to '/', and returns no content
router.delete('/users', authenticateUser, async (req, res) => {
  const user = req.currentUser;
  const users = await deleteUser(user);
  if (users) {
    res
      .status(204)
      .location('/')
      .end();
  } else {
    res.status(400).json({
      error: error,
    });
  }
});
module.exports = router;
