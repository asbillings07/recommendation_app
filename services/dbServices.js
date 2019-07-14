const { User } = require('../models');
const bcrypt = require('bcryptjs');

// creates user
const createUser = async user => {
  user.password = bcrypt.hashSync(user.password);
  await User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
};
// gets user
const getUser = user => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};
// updates user
const updateUser = user => {
  // create update user function
};

module.exports = {
  createUser,
  getUser,
};
