'use strict';
module.exports = (sequelize, DataTypes) => {
  var Illness = sequelize.define('Illness', {
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
    description: DataTypes.TEXT
  },{
    hooks:{
      afterDestroy(user,option){
        sequelize.models.Medicine_illnes.findAll({
          where:{ilnessId:user.id}
        }).then(conjunctionData =>{
          const destroy = conjunctionData.map(each =>{
            return new Promise ((resolve,reject)=>{
              sequelize.models.Medicine_illnes.destroy({where:{ilnessId:each.ilnessId}}).then(result=>{
                resolve(result)
              })
            })
          })
          Promise.all(destroy).then(done =>{

          })
        })
      }
    }
  })
  
  Illness.associate = function(models){
    // Illness < -- > Medicine
    Illness.belongsToMany(models.Medicine,{
      foreignKey: 'ilnessId',
      through: 'Medicine_illnes'
    })
  }
  return Illness;
};