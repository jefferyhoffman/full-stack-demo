'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Item', 'quantity');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Item', 'quantity', {
      type: Sequelize.INTEGER
    });
  }
};
