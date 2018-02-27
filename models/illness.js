'use strict';
module.exports = (sequelize, DataTypes) => {
  var Illness = sequelize.define('Illness', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Illness;
};