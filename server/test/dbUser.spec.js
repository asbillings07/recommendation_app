const {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser,
  findUserByObj,
} = require('../services/userFunctions');

jest.mock('../models/user.js', () => () => {
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
 * User Model Function Specs
 */

describe('User Model Functions', () => {
  test('should return user from DB', async () => {
    const user = await findUserByEmail('test@test.com');
    expect(user.firstName).toBe('Billy');
    expect(user.lastName).toBe('Bob');
    expect(user.email).toBe('test@test.com');
  });

  test('Should create new user in DB', async () => {
    const newUser = {
      firstName: 'Aaron',
      lastName: 'Billings',
      email: 'testing@billings.com',
      password: '1234test',
    };

    const user = await createUser(newUser);
    expect(user.firstName).toBe('Aaron');
    expect(user.lastName).toBe('Billings');
    expect(user.email).toBe('testing@billings.com');
  });

  test('should update existing user in DB', async () => {
    const body = {
      firstName: 'Bill',
      lastName: 'Smith',
      email: 'test@bill.com',
    };
    const user = await updateUser(1, body);
    expect(user.firstName).toBe('Bill');
    expect(user.lastName).toBe('Smith');
    expect(user.email).toBe('test@bill.com');
  });

  test('should delete user from DB', async () => {
    const currentUser = {
      id: 1,
    };
    const user = deleteUser(currentUser);
    expect(user.firstName).toBeUndefined();
    expect(user.lastName).toBeUndefined();
    expect(user.email).toBeUndefined();
  });

  test('find user in DB by Obj', async () => {
    const user = await findUserByObj({ email: 'test@test.com' });
    expect(user.firstName).toBe('Billy');
    expect(user.lastName).toBe('Bob');
  });
});
