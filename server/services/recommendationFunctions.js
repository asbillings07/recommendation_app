const { Recommendation, User } = require('../models');

const verifyUser = async id => {
  await Recommendation.findOne({
    where: {
      id,
    },
  });
};

// create recommendation

const createRec = async (user, rec) => {
  const recs = await Recommendation.create({
    categoryId: '1',
    userId: user.id,
    title: rec.title,
    description: rec.description,
    location: rec.location,
    lastvisited: rec.lastvisited,
  });
  return recs;
};

// get all Recommendations

const getAllRecs = async () => {
  const recs = await Recommendation.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  return recs;
};

// get one Recommendation
const getRec = async id => {
  const rec = await Recommendation.findAll({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  return rec;
};

// Update one Recommendation
const updateRecs = async id => {
  const recs = await Recommendation.findByPk(id);
  if (recs) {
    recs.update({
      title: rec.title,
      description: rec.description,
      location: rec.location,
      lastvisited: rec.lastvisited,
    });
  } else {
    console.log(err);
  }
};

// Delete Recommendation
const deleteRecs = async id => {
  const rec = await Recommendation.findByPk(id);
  if (rec) {
    rec.destroy();
  } else {
    console.log(err);
  }
};

module.exports = {
  getAllRecs,
  getRec,
  createRec,
  updateRecs,
  deleteRecs,
  verifyUser,
};
