'use strict';
module.exports = (sequelize, DataTypes) => {
  var Medicine_illnes = sequelize.define('Medicine_illnes', {
    ilnessId: DataTypes.INTEGER,
    medicineId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Medicine_illnes;
};