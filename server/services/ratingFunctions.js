const { Rating, User } = require('../models');

// verifies user by checking the rating where the recommendation id is equal to the param id
const verifyUser = id =>
  Rating.findOne({
    where: {
      recid: id,
    },
  });
const getRating = id => Rating.findOne({ where: { userid: id } });
// get all ratings for the authed user
const getRatings = id => Rating.findAll({ where: { userid: id } });
// creates a rating on a given recommendation
const createRating = (id, user, body) =>
  Rating.create({
    rate: body.rate,
    recid: id,
    userid: user.id,
  });
// updates rating on a given recommendation for user
const updateRating = (id, body) =>
  Rating.findOne({ where: { recid: id } }).then(rating =>
    rating.update({
      rate: body.rate,
    })
  );
// deletes a rating along with their comments for user.
const deleteRating = id =>
  Rating.findOne({ where: { recid: id } }).then(rating => rating.destroy());

module.exports = {
  createRating,
  verifyUser,
  updateRating,
  deleteRating,
  getRatings,
  getRating,
};
