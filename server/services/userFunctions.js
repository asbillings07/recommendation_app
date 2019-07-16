const { User } = require('../models');
const bcrypt = require('bcryptjs');

// creates user
const createUser = async user => {
  user.password = bcrypt.hashSync(user.password);
  User.create({
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

// deletes a user
const deleteUser = currentUser => {
  User.findOne({
    where: {
      id: currentUser.id,
    },
  }).then(user => {
    user.destroy();
  });
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
};
