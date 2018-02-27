'use strict';
module.exports = (sequelize, DataTypes) => {
  var Report = sequelize.define('Report', {
    UserId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    reportName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Report;
};