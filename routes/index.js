const Router = require('express').Router()

// Model
Router.get('/',(req,res)=>{
    res.render('Admin/index')
})

module.exports = Router