const { User } = require('../models');
const bcrypt = require('bcryptjs');

// creates user and hashes password
const createUser = user => {
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
    password: user.password,
  };
};

const getUserByObj = obj => User.findOne({ where: obj });
// Finds authed user by id then updates user and hashes password if needed
const updateUser = (id, body) => {
  body.password = bcrypt.hashSync(body.password);
  User.findOne({ where: { id } }).then(user =>
    user.update({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    })
  );
};
// finds an authed user id then deletes a user
const deleteUser = currentUser =>
  User.findOne({
    where: {
      id: currentUser.id,
    },
  }).then(user => user.destroy());

const findUserByObj = obj => User.findOne({ where: obj });

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  findUserByObj,
  getUserByObj,
};
