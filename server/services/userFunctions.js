const { User } = require('../models');
const bcrypt = require('bcryptjs');

function asyncHandler(cb) {
  return async () => {
    try {
      await cb();
    } catch (err) {
      console.log(err);
    }
  };
}

// creates user
const createUser = asyncHandler(async user => {
  user.password = bcrypt.hashSync(user.password);
  await User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
  return user;
});
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
const deleteUser = asyncHandler(async currentUser => {
  const user = await User.findOne({
    where: {
      id: currentUser.id,
    },
  });
  if (user) {
    user.destroy();
  }
});

module.exports = {
  createUser,
  getUser,
  deleteUser,
};
