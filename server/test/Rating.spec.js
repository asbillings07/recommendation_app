const {
  getRating,
  getRatings,
  updateRating,
  createRating,
  deleteRating,
} = require('../services/ratingFunctions');

const { userRating } = require('./mockData');

describe('Rating Model Functions', () => {
  it('should get a rating from the DB', async () => {
    const rating = await getRating(2);
    expect(rating).not.toBeUndefined();
    expect(rating.userid).toBe(2);
    expect(rating.rate).not.toBeUndefined();
  });

  it('should get all ratings from the DB', async () => {
    const ratings = await getRatings(4);
    expect(ratings).not.toBeUndefined();
    expect(ratings[0].userid).toBe(4);
    expect(ratings[0].rate).not.toBeUndefined();
  });

  it('should create a rating in the DB', async () => {
    const body = userRating[1];
    const rec = {
      id: 3,
    };
    const user = {
      id: 1,
    };

    const rating = await createRating(rec.id, user, body);

    expect(rating.rate).toBe(5);
    expect(rating.userid).toBe(1);
    expect(rating.recid).toBe(3);
  });

  it('should update rating in the DB', async () => {
    const recid = 2;
    const body = userRating[3];
    const rating = await updateRating(recid, body);

    expect(rating).not.toBeUndefined();
    expect(rating.rate).toBe(3);
  });

  it('should delete a rating from the DB', async () => {
    const rating = await deleteRating(3);
    expect(rating).toBeUndefined();
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
