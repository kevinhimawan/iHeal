const Router = require('express').Router()
const Op = require('sequelize').Op

// Model
const Models = require('../models')
const Medicine = Models.Medicine
const Medicine_illnes = Models.Medicine_illnes
const Illness = Models.Illness

// Code...
// Medicine Admin Dashboard
Router.get('/',(req,res)=>{
    Medicine.findAll().then(medicineData =>{
        console.log('masukkk medicine')
        res.render('Admin/Medicine/medicine', {
            medicineData: medicineData
        })
    })
})

// Back Medicine
Router.get('/back',(req,res)=>{
    res.redirect('/admin')
})

// Add Medicine
Router.get('/add',(req,res)=>{
    res.render('Admin/Medicine/addForm',{
        error: null
    })
})

// Add Back
Router.get('/add/back',(req,res)=>{
    res.redirect('/admin/medicine')
})

// Post Add
Router.post('/add',(req,res)=>{
    let medicineCreate = {
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        minGenA: req.body.minGenA,
        maxGenA: req.body.maxGenA,
        minGenB: req.body.minGenB,
        maxGenB: req.body.maxGenB
    }

    Medicine.create(medicineCreate).then(created =>{
        res.redirect('/admin/medicine')
    }).catch((err)=>{
        
        const errors = err.errors.reduce((hasil,each) =>{
            hasil[each.path] = each.message
            return hasil
        },{})
        
        res.render('Admin/Medicine/addForm',{error:errors})
    })
})

// Edit Data
Router.get('/edit/:id',(req,res)=>{
    console.log('masuk')
    let medicineId = Number(req.params.id)
    Medicine.findById(medicineId).then(medicineData=>{
        res.render('Admin/Medicine/editForm',{
            medicineData: medicineData,
            error: null
        })
    })
})

// Edit Back
Router.get('/edit/:id/back',(req,res)=>{
    res.redirect('/admin/medicine')
})

Router.post('/edit/:id',(req,res)=>{
    let medicineId = Number(req.params.id)
    let medicineUpdate = {
        name : req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        minGenA: Number(req.body.minGenA),
        maxGenA: Number(req.body.maxGenA),
        minGenB: Number(req.body.minGenB),
        maxGenB: Number(req.body.maxGenB)
    }
    Medicine.update(medicineUpdate,{where:{id:medicineId},individualHooks:true}).then(result=>{
        res.redirect('/admin/medicine')
    }).catch((err)=>{
        const errors = err.errors.reduce((hasil,each) =>{
            hasil[each.path] = each.message
            return hasil
        },{})
        Medicine.findById(medicineId).then(medicineData=>{
            res.render('Admin/Medicine/editForm',{
                error:errors,
                medicineData: medicineData,
            })
        })  
    })
})

Router.get('/delete/:id',(req,res)=>{
    let medicineId = Number(req.params.id)
    Medicine.destroy({where:{id:medicineId},individualHooks : true}).then(success=>{
        res.redirect('/admin/medicine')
    })
})

// Routing Assign
Router.get('/assign/:id',(req,res)=>{
    console.log('masukkk bagian assign')
    let medicineId = Number(req.params.id)
    Medicine_illnes.findAll({where:{medicineId:medicineId},include:[{model:Illness}]}).then(list=>{
        const illnessId = list.reduce((hasil,each)=>{
            hasil.push(each.ilnessId)
            return hasil
        },[])

        Illness.findAll({where:{id:{[Op.notIn]: illnessId}}}).then(filterIllnessList =>{
            Medicine.findById(medicineId).then(medicineData=>{
                res.render('Admin/Medicine/assignItem',{
                    medicineData: medicineData,
                    unPickIllness: filterIllnessList,
                    pickedIllness: list,
                    helper: require('../helpers/limit100Letters'),
                })
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }).catch((err)=>{console.log(err)})
})

// Back From Assign
Router.get('/assign/:id/back',(req,res)=>{
    res.redirect('/admin/medicine')
})

// Add Assign Illness
Router.get('/assign/:medicineId/assign/:illnessId',(req,res)=>{
    let addingItem = {
        ilnessId: Number(req.params.illnessId),
        medicineId: Number(req.params.medicineId),
    }
    
    Medicine_illnes.create(addingItem).then(done=>{
        res.redirect(req.get(`referer`))
    })
})

// Assign Illness Delete
Router.get('/assign/:medicineId/delete/:illnessId',(req,res)=>{
    let medicineId = Number(req.params.medicineId)
    let illnessId = Number(req.params.illnessId)
    Medicine_illnes.destroy({where:{medicineId: medicineId,ilnessId: illnessId}}).then(deleted =>{
        res.redirect(req.get(`referer`))
    })
})

module.exports = Router
