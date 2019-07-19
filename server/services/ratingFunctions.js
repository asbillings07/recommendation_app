const { Rating } = require('../models');

const verifyUser = id =>
  Recommendation.findOne({
    where: {
      id,
    },
  });
// creates a rating on a given recommendation
const createRating = (id, user, body) =>
  Rating.create({
    rate: body.rate,
    recid: id,
    userid: user.id,
    comment: body.comment,
  });
// updates rating on a given recommendation
// const updateRating = (id, user, body) =>
// Rating.findOne({ where: { recid: id} }).then( rating =>

module.exports = {
  createRating,
  verifyUser,
};
