'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'demo@example.com',
          createdAt: '2019-06-05 23:46:50.380 +00:00',
          updatedAt: '2019-06-05 23:46:50.380 +00:00',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
