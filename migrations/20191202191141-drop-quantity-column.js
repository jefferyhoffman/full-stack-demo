'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Items', 'quantity');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Items', 'quantity', {
      type: Sequelize.INTEGER
    });
  }
};
