export const mockUserModel = jest.mock('../models/user.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const User = dbMock.define('User', {
    email: 'test@test.com',
    firstName: 'Billy',
    lastName: 'Bob',
    password: 'test12345',
    comments: [],
  });

  return User;
});

export const mockCommentModel = jest.mock('../models/comment.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Comment = dbMock.define('Comment', {
    comment: 'new comment',
  });
  return Comment;
});

export const mockRatingModel = jest.mock('../models/rating.js', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Rating = dbMock.define('Rating', {
    rating: '5',
  });
  return Rating;
});

export const mockRecommendationModel = jest.mock(
  '../models/recommendation.js',
  () => () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const Recommendation = dbMock.define('Recommendation', {
      title: 'new title',
      description: 'new descritption',
      location: '123 main st',
    });
    return Recommendation;
  }
);

export const mockCategoryModel = jest.mock(
  '../models/category.js',
  () => () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const Category = dbMock.define('Category', {
      title: 'new category',
    });
    return Category;
  }
);
