'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING
  }, {});

  Item.associate = function (models) {
    Item.belongsTo(models.User);
  };

  return Item;
};