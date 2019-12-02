'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});

  Item.associate = function (models) {
    Item.belongsTo(models.User);
  };

  return Item;
};