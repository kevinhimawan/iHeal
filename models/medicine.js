'use strict';
const Op = require('sequelize').Op;

module.exports = (sequelize, DataTypes) => {
  var Medicine = sequelize.define('Medicine', {
    id:{
      allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty(value,next){
          if(value === '' || value[0] === ' '){
            next (`Input cannot empty or space in first letter`)
          }else{
            console.log(this)
            next()
          }
        },
       frontCapital(value,next){
         if(value !== ''){
          let frontCapital = value[0].toUpperCase()
          if(value[0] !== frontCapital){
            next (`Input first letter with Capital Letter`)
          }else{
            next()
          }
         }else{
           next()
         }
       } 
      }
    },
    brand: {
      type: DataTypes.STRING,
      validate: {
        notEmpty(value,next){
          if(value === '' || value[0] === ' '){
            next (`Input cannot empty or space in first letter`)
          }else{
            next()
          }
        },
        frontCapital(value,next){
          if(value !== ''){
            if(value[0] !== value[0].toUpperCase()){
              next(`Input first letter with Capital Letter`)
            }else{
              next()
            }
          }else{
            next()
          }
        }
      }
    },
    description: DataTypes.TEXT,
    minGenA: DataTypes.INTEGER,
    maxGenA: DataTypes.INTEGER,
    minGenB: DataTypes.INTEGER,
    maxGenB: DataTypes.INTEGER,
  },{
    hooks:{
      afterDestroy(user,option){
        sequelize.models.Medicine_illnes.findAll({
          where:{medicineId:user.id}
        }).then(conjunctionData =>{
          const destroy = conjunctionData.map(each =>{
            return new Promise ((resolve,reject)=>{
              sequelize.models.Medicine_illnes.destroy({where:{medicineId:each.medicineId}}).then(result=>{
                resolve(result)
              })
            })
          })

          Promise.all(destroy).then(done =>{

          })
        })
      }
    }
  });

  Medicine.associate = function (models){
    // Medicine < -- > Illness
    Medicine.belongsToMany(models.Illness,{
      foreignKey: 'medicineId',
      through: 'Medicine_illnes'
    })
  }
  return Medicine;
};