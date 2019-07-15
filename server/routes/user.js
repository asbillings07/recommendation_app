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
  res.status(200).json({
    user: getUser(user),
  });
});
//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns 'User created succesfully'
router.post('/users', validateUser, (req, res) => {
  const user = req.body;
  createUser(user);
  res
    .location('/')
    .status(201)
    .json({ message: 'User Created Successfully!' });
});
// DELETE (Careful, this deletes users from the DB) /api/users 204 - deletes a user, sets the location to '/', and returns no content
router.delete('/users', authenticateUser, (req, res) => {
  const user = req.currentUser;
  deleteUser(user);
  res
    .status(204)
    .location('/')
    .end();
});
module.exports = router;
