const { Recommendation, User, Rating } = require('../models');

// verifies user by checking the recommendation where the recommendation id is equal to the param id
const verifyUser = id =>
  Recommendation.findOne({
    where: {
      id,
    },
  });

// create recommendation

const createRec = (user, rec, id) =>
  Recommendation.create({
    categoryId: id,
    userid: user.id,
    title: rec.title,
    description: rec.description,
    location: rec.location,
    lastvisited: rec.lastvisited,
  });

// get all Recommendations including User and Rating

const getAllRecs = () =>
  Recommendation.findAll({
    include: [
      {
        model: User,
        include: [
          {
            model: Rating,
            as: 'userRating',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

// get one Recommendation with id and include User and Ratings
const getRec = id =>
  Recommendation.findAll({
    where: {
      id,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
    ],
    include: [
      {
        model: Rating,
        as: 'rating',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

// Update one Recommendation by Id
const updateRecs = (id, body) =>
  Recommendation.findByPk(id).then(rec =>
    rec.update({
      categoryId: body.categoryId,
      title: body.title,
      description: body.description,
      location: body.location,
      lastvisited: body.lastvisited,
    })
  );

// Delete Recommendation by Id
const deleteRecs = id =>
  Recommendation.findByPk(id).then(rec => {
    if (rec) {
      return rec.destroy();
    } else {
      throw new Error('Recommendation Not found');
    }
  });

module.exports = {
  getAllRecs,
  getRec,
  createRec,
  updateRecs,
  deleteRecs,
  verifyUser,
};
