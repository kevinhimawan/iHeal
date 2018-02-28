'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    role: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    genA: DataTypes.INTEGER,
    genB: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};