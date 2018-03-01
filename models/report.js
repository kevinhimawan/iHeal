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

  Report.associate = function (models){
    Report.belongsTo(models.User,{
      foreignKey: 'UserId'
    })

    Report.hasMany(models.Medicineillnes_Report,{
      foreignKey: 'ReportId'
    })

    Report.belongsToMany(models.Medicine_illnes,{
      foreignKey: 'ReportId',
      through: 'Medicineillnes_Report'
    })
  }
  return Report;
};