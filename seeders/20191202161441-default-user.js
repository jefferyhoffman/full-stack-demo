'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "jkh@test.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: "other@email.com",
      password: "other",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
