const Router = require('express').Router()
const Op = require('sequelize').Op

// Model
const Models = require('../models')
const Medicine = Models.Medicine
const Medicine_illnes = Models.Medicine_illnes
const Illness = Models.Illness

// Code...
// Illness Admin Dashboard
Router.get('/',(req,res)=>{
    Illness.findAll().then(illnessData =>{
        res.render('Admin/Illness/illness', {illnessData: illnessData})
    })
})

// Back illness
Router.get('/back',(req,res)=>{
    res.redirect('/admin')
})

// Add illness
Router.get('/add',(req,res)=>{
    res.render('Admin/Illness/addForm',{
        error: null
    })
})

// Add Back
Router.get('/add/back',(req,res)=>{
    res.redirect('/admin/illness')
})

// Post Add
Router.post('/add',(req,res)=>{
    let illnessCreate = {
        name: req.body.name,
        description: req.body.description,
    }
    Illness.create(illnessCreate).then(created =>{
        res.redirect('/admin/illness')
    }).catch((err)=>{
        const errors = err.errors.reduce((hasil,each) =>{
            hasil[each.path] = each.message
            return hasil
        },{})
        res.render('Admin/Illness/addForm',{error:errors})
    })
})

// Edit Data
Router.get('/edit/:id',(req,res)=>{
    let illnessId = Number(req.params.id)
    Illness.findById(illnessId).then(illnessData=>{
        res.render('Admin/Illness/editForm',{
            illnessData: illnessData,
            error: null
        })
    })
})

// Edit Back
Router.get('/edit/:id/back',(req,res)=>{
    console.log('helo')
    res.redirect('/admin/illness')
})

Router.post('/edit/:id',(req,res)=>{
    let illnessId = Number(req.params.id)
    let illnessUpdate = {
        name : req.body.name,
        description: req.body.description
    }
    Illness.update(illnessUpdate,{where:{id:illnessId}}).then(result=>{
        res.redirect('/admin/illness')
    }).catch((err)=>{
        const errors = err.errors.reduce((hasil,each) =>{
            hasil[each.path] = each.message
            return hasil
        },{})  
    })
})

Router.get('/delete/:id',(req,res)=>{
    let illnessId = Number(req.params.id)
    Illness.destroy({where:{id:illnessId},individualHooks : true}).then(success=>{
        res.redirect('/admin/illness')
    })
})



module.exports = Router
