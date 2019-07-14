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
  return user;
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
const updateUser = async currentUser => {
  const user = await User.findOne({
    where: {
      email: currentUser.email,
    },
  });
  if (user) {
    await user.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  } else {
    throw Error('User does not exist in database');
  }
};

// deletes a user
const deleteUser = async currentUser => {
  const user = await User.findOne({
    where: {
      id: currentUser.id,
    },
  });
  if (user) {
    user.destroy();
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
