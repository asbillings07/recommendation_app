const { expect } = require('chai');
const faker = require('faker');
// describe('User Database Functions', () => {
//   describe('findUserById & CreateUser', () => {
//     const { findUserById, createUser } = require('../services/userFunctions');

//     it('should create a user and then get an user from the database by their id', async () => {
//       // Arrange
//       const userData = {
//         firstName: `${faker.name.firstName()}`,
//         lastName: `${faker.name.lastName()}`,
//         email: `${faker.internet.email()}`,
//         password: 'pass1234567',
//       };

//       const createdUser = await createUser(userData);
//       // Act
//       const foundUser = await findUserById(createdUser.id);
//       // Assert
//       expect(foundUser.email).to.equal(userData.email);
//       expect(foundUser.firstName).to.equal(userData.firstName);
//     });
//   });

//   // describe('updateUser', () => {
//   //   it('should update a user to new values', async () => {
//   //     const { updateUser } = require('../services/userFunctions');
//   //     // Arrange
//   //     console.log(faker.internet.email());
//   //     const updateUserData = {
//   //       firstName: 'Tim',
//   //       lastName: 'Rogers',
//   //       email: 'test@test.com',
//   //       password: 'pass1234567',
//   //     };
//   //     const id = 5;
//   //     // Act
//   //     const updateDBUser = await updateUser(id, updateUserData);

//   //     expect(updateDBUser.email).to.deep.equal(updateUserData.email);
//   //     expect(updateDBUser.firstName).to.deep.equal(updateUserData.firstName);
//   //     expect(updateDBUser.lastName).to.deep.equal(updateUserData.lastName);
//   //     expect(updateDBUser.email).to.deep.equal(updateUserData.email);
//   //   });
//   // });

//   // describe('deleteUser', () => {
//   //   it('should delete a user from the database', async () => {
//   //     const { deleteUser } = require('../services/userFunctions');
//   //     const userData = {
//   //       id: 4,
//   //       firstName: 'Aaron',
//   //       lastName: 'Billings',
//   //       email: 'ab@gmail.com',
//   //       password: 'pass1234567',
//   //     };

//   //     const deleteUserFromDB = await deleteUser(userData);

//   //     expect(deleteUserFromDB.email).to.equal(userData.email);
//   //   });
//   // });

//   describe('findUserByEmail', () => {
//     it('should find a user by their email', async () => {
//       const { findUserByEmail } = require('../services/userFunctions');

//       const userData = {
//         firstName: `Edna`,
//         lastName: `Schimmel`,
//         email: `Bria65@yahoo.com`,
//       };

//       const foundUserByEmail = await findUserByEmail(userData.email);

//       expect(foundUserByEmail.email).to.equal(userData.email);
//       expect(foundUserByEmail.firstName).to.equal(userData.firstName);
//       expect(foundUserByEmail.lastName).to.equal(userData.lastName);
//     });
//   });

//   // describe('findUserByToken', () => {
//   //   it('should find a user by their token', async () => {
//   //     const { findUserByToken } = require('../services/userFunctions');

//   //     const token = '12345678910';

//   //     const foundUserByToken = await findUserByToken(token);

//   //     expect(foundUserByToken.token).to.equal(token);
//   //   });
//   // });
// });

describe('Category DB Functions', () => {
  describe('createCategoryFunction', () => {
    it('should create a category', async () => {
      const { createCategory } = require('../services/categoryFunctions');

      const category = {
        title: `${faker.lorem.word()}`,
      };

      const createDBCategory = await createCategory(category);

      expect(createDBCategory.title).to.equal(category.title);
    });
  });

  describe('findCategoryById', () => {
    it('should find a category by Id', async () => {
      const { getCategory } = require('../services/categoryFunctions');

      const category = {
        id: 2,
        title: 'Outdoor Fun',
      };

      const findCategoryById = await getCategory(category.id);

      expect(findCategoryById.title).to.be.undefined;
    });
  });
});
