const { Category, User, Recommendation } = require('../models');

// create category

const createCategory = async cate => {
  const category = await Category.create({
    title: cate.title,
  });
  return category;
};

// get category

const getCategories = async () => {
  const categories = await Category.findAll({
    // include: [
    //   {
    //     model: Recommendation,
    //     // include: [
    //     //   {
    //     //     model: User,
    //     //     as: 'userRecs',
    //     //     attributes: {
    //     //       exclude: ['createdAt', 'updatedAt'],
    //     //     },
    //     //   },
    //     // ],
    //     attributes: {
    //       exclude: ['createdAt', 'updatedAt'],
    //     },
    //   },
    // ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  return categories;
};

// get one category

const getCategory = async id => {
  const category = await Category.findAll({
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
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
};
