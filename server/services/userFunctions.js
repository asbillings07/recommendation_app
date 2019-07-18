const { User } = require('../models');
const bcrypt = require('bcryptjs');

// creates user
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
// update user
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
// deletes a user
const deleteUser = currentUser =>
  User.findOne({
    where: {
      id: currentUser.id,
    },
  }).then(user => {
    user.destroy();
  });

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
