const Router = require('express').Router()

// Model

Router.get('/',(req,res)=>{
    res.render('User/home')
})

module.exports = Router