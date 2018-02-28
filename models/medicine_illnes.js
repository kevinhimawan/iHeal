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

  Medicine_illnes.associate = function(models){
    // Medicine_illnes --> Medicine
    Medicine_illnes.belongsTo(models.Medicine,{
      foreignKey: 'medicineId',
      hooks: true
    })

    // Medicine_illnes --> Illness
    Medicine_illnes.belongsTo(models.Illness,{
      foreignKey: 'ilnessId',
      hooks: true
    })
  }
  return Medicine_illnes;
};