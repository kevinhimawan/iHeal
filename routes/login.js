const Router = require('express').Router()
const bcrypt = require('bcryptjs');

const Models = require('../models')
const User = Models.User

// Code..
Router.get('/',(req,res)=>{
    res.render('login',{
        errors: null
    })
})

Router.post('/',(req,res)=>{
    let objWhere = {}
    if(req.body.name.indexOf('@') !== -1){
        objWhere['email'] = req.body.name
    }else{
        objWhere['username'] = req.body.name
    }
    User.findOne({where:objWhere}).then(result=>{
        if(result){
            bcrypt.compare(req.body.password, result.password, function(err, match) {
                if(match){
                    req.session.idUser = result.id
                    req.session.role = result.role
                    req.session.email = result.email
                    
                    res.redirect('/')
                }else{
                    let err = {
                        password: `Password Salah`
                    }
                    res.render('login',{
                        errors: err,
                    })
                } 
            });
        }else{
            let err = {
                name: 'Wrong Username or Email'
            }
            res.render('login',{
                errors: err,
            })
        }
    })
})

Router.get('/signup',(req,res)=>{
    res.render('signup',{
        err:null
    })
})

Router.post('/signup',(req,res)=>{
    
    let userCreate ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        age: Number(req.body.age),
        password: req.body.password,
        role: 'user',
        genA: Number(req.body.genA),
        genB: Number(req.body.genB)
    }

    User.create(userCreate,{individualhooks:true}).then(done =>{
        res.render('login',{
            errors: null
        })
    }).catch((err)=>{
        const errors = err.errors.reduce((hasil,each)=>{
            hasil[each.path] = each.message
            return hasil
        },{})
        res.render('signup',{
            err:errors
        })
    })
})

Router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

module.exports = Router