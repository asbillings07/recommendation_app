const { Category, User, Recommendation, Rating } = require('../models');

// create category

const createCategory = category =>
  Category.create({
    title: category.title,
  });

// get category

const getCategories = () =>
  Category.findAll({
    include: [
      {
        model: Recommendation,
        include: [
          {
            model: Rating,
            as: 'rating',
            attributes: {
              exclude: ['updatedAt', 'createdAt'],
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

// get one category

const getCategory = id =>
  Category.findAll({
    where: {
      id,
    },
    include: [
      {
        model: Recommendation, // possibly get user later?
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
      },
    ],
  });

module.exports = {
  createCategory,
  getCategories,
  getCategory,
};
