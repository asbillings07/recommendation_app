const { User, Recommendation } = require('../models');
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
const updateUser = (id, body) =>
  User.findOne({ where: { id } }).then(user =>
    user.update({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    })
  );

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
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password'],
    },
  });

const findUserByObj = obj =>
  User.findOne({
    where: obj,
    include: [
      {
        model: Recommendation,
      },
    ],
    order: [[{ model: Recommendation }, 'updatedAt', 'DESC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password'],
    },
  });

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  findUserByEmail,
  findUserByToken,
  findUserById,
  findUserByObj,
};
