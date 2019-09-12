const {
  createRec,
  getAllRecs,
  getRecWithUser,
  updateRecs,
  deleteRecs,
} = require('../services/recommendationFunctions');

const { recommendations } = require('./mockData');

describe('Recommendation Model Functions', () => {
  test('should create a recommendation', async () => {
    const id = 1;
    const user = {
      id: 12,
    };
    const rec = recommendations[0];

    const recommendation = await createRec(user, rec, id);
    expect(recommendation.title).not.toBeUndefined();
    expect(recommendation.description).not.toBeUndefined();
    expect(recommendation.location).not.toBeUndefined();
  });

  test('should get all the recommendations in the DB', async () => {
    const recommendations = await getAllRecs();
    expect(recommendations).toBeTruthy();
  });

  test('should get a recommendation with a user', async () => {
    const recommendation = await getRecWithUser(2);
    expect(recommendation).toBeTruthy();
  });

  test('should update a recommendation', async () => {
    const body = recommendations[2];

    const rec = await updateRecs(2, body);
    expect(rec.title).toBe('in felis');
    expect(rec.description).not.toBeUndefined();
    expect(rec.location).toBe('21 School Junction');
    expect(rec.lastvisited).toBe('6/27/2019');
  });

  test('should delete a recommendation', async () => {
    const rec = await deleteRecs(2);
    expect(rec).toBeUndefined();
  });
});

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
    rate: '5',
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
    lastvisited: '09/19/2018',
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
