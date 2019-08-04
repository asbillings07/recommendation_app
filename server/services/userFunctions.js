const { User } = require('../models');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// creates user and hashes password
const createUser = user => {
  user.password = bcrypt.hashSync(user.password);

  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
};

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

// find user by email

const findUserByEmail = email =>
  User.findOne({
    where: {
      email,
    },
  });
// find user by ForgotPasswordToken
const findUserByToken = token =>
  User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: {
        [Op.gte]: Date.now(),
      },
    },
  });

const findUserById = id =>
  User.findOne({
    where: { id },
  });

const findUserByObj = obj => User.findOne({ where: obj });

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  findUserByEmail,
  findUserByToken,
  findUserById,
  findUserByObj,
};
