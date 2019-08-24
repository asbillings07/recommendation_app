const {
  Category,
  User,
  Recommendation,
  Rating,
  Comment,
} = require('../models');

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
        model: Recommendation,
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
        include: [
          {
            model: User,
          },
          {
            model: Comment,
          },
        ],
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

module.exports = {
  createCategory,
  getCategories,
  getCategory,
};
