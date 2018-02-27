'use strict';
module.exports = (sequelize, DataTypes) => {
  var Medicine = sequelize.define('Medicine', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    minGenA: DataTypes.INTEGER,
    maxGenA: DataTypes.INTEGER,
    minGenB: DataTypes.INTEGER,
    maxGenB: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Medicine;
};