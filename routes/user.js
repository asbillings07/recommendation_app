const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../services/authenticateUser');
const { validateUser } = require('../services/validationChain');
const { getUser, createUser } = require('../services/dbServices');

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
    .json({ message: 'User Created' });
});
//PUT /api/users 201 - Creates a user, sets the Location header to "/", and returns 'User updated successfully'
router.put('/users', (req, res) => {});
module.exports = router;
