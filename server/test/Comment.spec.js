const {
  createComment,
  updateComment,
  getComment,
  deleteComment,
} = require('../services/commentFunctions');
const { comments } = require('./mockData');

describe('Comment Model Functions', () => {
  it('should create a comment and return it from the DB', async () => {
    const recid = 4;
    const user = {
      id: 12,
    };
    const body = comments[0];

    const comment = await createComment(recid, body, user);

    expect(comment.id).not.toBeUndefined();
    expect(comment.comment).not.toBeNull();
    expect(comment.recid).toBe(4);
    expect(comment.userid).toBe(12);
  });

  it('should update a comment and return it from the DB', async () => {
    const recid = 5;
    const body = comments[2];

    const comment = await updateComment(recid, body);
    expect(comment.id).not.toBeUndefined();
    expect(comment.comment).not.toBeNull();
  });

  it('should get a comment from the DB where recommendation id is x ', async () => {
    const comment = await getComment(2);

    expect(comment[0].recid).toBe(2);
    expect(comment[0].comment).not.toBeUndefined();
    expect(comment).not.toBeUndefined();
  });

  it('should delete a comment from the DB and return undefined', async () => {
    const comment = await deleteComment(4);
    expect(comment).toBeUndefined();
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
