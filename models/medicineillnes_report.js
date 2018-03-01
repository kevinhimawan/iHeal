'use strict';
module.exports = (sequelize, DataTypes) => {
  var Medicineillnes_Report = sequelize.define('Medicineillnes_Report', {
    ReportId: DataTypes.INTEGER,
    MedicineIllnessId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    percentage: DataTypes.INTEGER,
    ilnessId: DataTypes.INTEGER,
    medicineId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Medicineillnes_Report.associate = function(models){
    Medicineillnes_Report.belongsTo(models.Medicine_illnes,{
      foreignKey: 'MedicineIllnessId'
    })
    Medicineillnes_Report.belongsTo(models.Report,{
      foreignKey: 'ReportId'
    })
  }
  return Medicineillnes_Report;
};