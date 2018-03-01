const Router = require('express').Router()

const Op = require('sequelize').Op

// Model
const Models = require('../models')
const Medicine = Models.Medicine
const Medicine_illnes = Models.Medicine_illnes
const Illness = Models.Illness
const User = Models.User

Router.get('/',(req,res)=>{
    res.render('User/home',{data:null})
}) 

Router.post('/',(req,res)=>{
    let search = req.body.search
    Illness.findAll({
        where:{
            [Op.or]:[
                {name:{[Op.iLike]:`%${search}%`}},
                {description:{[Op.iLike]:`%${search}%`}}
            ]
        }
    }).then(data=>{
        res.render('User/home',{data:data,helper:require('../helpers/limit100Letters')})
    })
})

Router.get('/:id/medicine_detail',(req,res)=>{
    let illnessId = req.params.id
    Illness.findById(illnessId,{include:Medicine}).then(data=>{
        res.render('User/illness_detail',{data:data})
    })
})

Router.get('/suggestion_medicine',(req,res)=>{
    User.findAll().then(data=>{
        Medicine.findAll().then(data2=>{
            res.send(data,data2)
        })
    })
})

module.exports = Router