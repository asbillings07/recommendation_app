const { Rating, User } = require('../models');

// verifies user by checking the rating where the recommendation id is equal to the param id
const verifyUser = id =>
  Rating.findOne({
    where: {
      recid: id,
    },
  });
// get all ratings for the authed user
const getRatings = id => Rating.findAll({ where: { userid: id } });
// creates a rating on a given recommendation
const createRating = (id, user, body) =>
  Rating.create({
    rate: body.rate,
    recid: id,
    userid: user.id,
    comment: body.comment,
  });
// updates rating on a given recommendation
const updateRating = (id, body) =>
  Rating.findOne({ where: { recid: id } }).then(rating =>
    rating.update({
      rate: body.rate,
      comment: body.comment,
    })
  );
// deletes a rating along with their comments.
const deleteRating = id =>
  Rating.findOne({ where: { id } }).then(rating => rating.destroy());

module.exports = {
  createRating,
  verifyUser,
  updateRating,
  deleteRating,
  getRatings,
};
