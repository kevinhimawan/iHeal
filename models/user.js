'use strict';

var bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    role: DataTypes.STRING,
    username:{
      type: DataTypes.STRING,
      validate:{
        isUnique (value,next){
          User.findOne({where:{username:this.username}}).then(hasil=>{
            if(hasil){
              next(`This username ${this.username} has already taken`)
            }else{
              next()
            }
          })
        }
      }
    },
    firstName: {
      type:  DataTypes.STRING,
      validate:{
        is: {
          args: ["^[a-z]+$",'i'],
          msg: `Name should be letter only`
        } 
      }
    },
    lastName:{
      type: DataTypes.STRING,
      validate:{
        is:{
          args:["^[a-z]+$",'i'],
          msg: `Last name should be letter only`
        }
      }
    },
    age: {
      type:  DataTypes.INTEGER,
      validate:{
        onlyPlus(value,next){
          if(Number(value) < 0){
            next(`Please input your age properly`)
          }else{
            next()
          }
        }
      }
    },
    genA: DataTypes.INTEGER,
    genB: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args:true,
          msg: `Type your email properly and follow our following example (Ex. iHeal@example.com)`
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        combination(value,next){
          let regex = /\d+/g
          if(value !== ''){
            let capital = false
            for(let i = 0; i < value.length;i++){
              if(value[i] === value[i].toUpperCase()){
                capital = true
              }
            }
            if(capital === false){
              next(`Need to fill password with minimum 6 length of letter, capital letter or numbers`)
            }else if(value.length < 6){
              next(`Need to fill password with minimum 6 length of letter, capital letter or numbers`)
            }else if(value.match(regex) === null){
              next(`Need to fill password with minimum 6 length of letter, capital letter or numbers`)
            }else{
              next()
            }
          }else{
            next(`Need to fill password with minimum 6 length of letter, capital letter or numbers`)
          }
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: function(user,option){
        if(user.password === 'admin123'){
          user.role = 'admin'
        }
        let newPassword = bcrypt.hashSync(user.password)
        user.password = newPassword
        if(user.password === 'admin123'){
          user.role = 'admin'
        }
      },
      afterDestroy: function(user,option){
        sequelize.models.Report.findAll({where:{UserId: user.id}}).then(studentDatas=>{
          const bulkDeleteReport = studentDatas.map(each =>{
            return new Promise ((resolve,reject)=>{
              sequelize.models.Report.destroy({where:{UserId:each.UserId}}).then(done =>{
                resolve(done)
              }).reject((err)=>{reject(err)})
            })
          })

          Promise.all(bulkDeleteReport).then(report=>{

          })
        })
      }
    }
  });

  User.prototype.full_name = function (){
    let time = new Date()
        let hour = time.getHours()
        let status;
        if(hour >= 19){
            status = 'Evening'
        }else if(hour > 10){
            status = 'Afternoon'
        }else{
            status = 'Morning'
        }
    return (`Good ${status} ${this.firstName}`)
  }

  User.getId = function(models){
    return new Promise((resolve,reject)=>{
      this.findById(models).then(result=>{
        resolve(result)
      })
    })
  }
  return User;
};