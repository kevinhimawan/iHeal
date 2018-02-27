'use strict';
module.exports = (sequelize, DataTypes) => {
  var Medicineillnes_Report = sequelize.define('Medicineillnes_Report', {
    ReportId: DataTypes.INTEGER,
    MedicineIllnessId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    percentage: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Medicineillnes_Report;
};