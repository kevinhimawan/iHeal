const Router = require('express').Router()
const Op = require('sequelize').Op

// Model
const Models = require('../models')
const Medicine = Models.Medicine
const Medicine_illnes = Models.Medicine_illnes
const Illness = Models.Illness

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
        // res.send(data)
        res.render('User/home',{data:data,helper:require('../helpers/limit100Letters')})
    })
})

Router.get('/:id/medicine_detail',(req,res)=>{
    let illnessId = req.params.id
    Illness.findById(illnessId,{include:Medicine}).then(data=>{
        res.render('User/illness_detail',{data:data})
    })
})

module.exports = Router