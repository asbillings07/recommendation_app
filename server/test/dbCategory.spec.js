const {
  createCategory,
  getCategories,
  getCategory,
} = require('../services/categoryFunctions');
const faker = require('faker');

/**
 * DB SET UP START
 */

jest.mock('../models/user.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const User = dbMock.define('User', {
    email: `test@test.com`,
    firstName: `Tim`,
    lastName: `Mcgraw`,
    password: 'test12345',
  });

  return User;
});

jest.mock('../models/comment.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Comment = dbMock.define('Comment', {
    comment: 'new comment',
  });
  return Comment;
});

jest.mock('../models/rating.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Rating = dbMock.define('Rating', {
    rating: '5',
  });
  return Rating;
});

jest.mock('../models/recommendation.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Recommendation = dbMock.define('Recommendation', {
    title: 'new title',
    description: 'new descritption',
    location: '123 main st',
  });
  return Recommendation;
});

jest.mock('../models/category.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Category = dbMock.define('Category', {
    title: 'new category',
  });
  return Category;
});

/**
 * DB SET UP END
 */

/**
 * Category Model Function Specs
 */

describe('Category Model Functions', () => {
  test('should create category in DB', async () => {
    const newCategory = {
      title: `${faker.commerce.productAdjective()}`,
    };
    const category = await createCategory(newCategory);
    expect(category.title).toBeTruthy();
  });

  test('should get all categories from DB', async () => {
    const newCategory = {
      title: `${faker.commerce.productAdjective()}`,
    };
    const categories = await getCategories();
    expect(categories).toBeTruthy();
    expect(categories[0].title).toBe('new category');
  });

  test('should get one category from DB', async () => {
    const category = await getCategory(3);
    expect(category).toBeTruthy();
    expect(category[0].title).toBe('new category');
  });
});
