const Router = require('express').Router()

const Op = require('sequelize').Op

// Model
const Models = require('../models')
const Medicine = Models.Medicine
const Medicine_illnes = Models.Medicine_illnes
const Illness = Models.Illness
const User = Models.User
const Report = Models.Report
const Medicineillnes_Report = Models.Medicineillnes_Report

// Helper
const getPercentageMedicine = require('../helpers/getPercentageMedicine')
const report = require('../helpers/report')

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
    let idUser = Number(req.session.idUser)
    let illnessId = req.params.id
    User.findById(idUser).then(userData =>{
        console.log('USER')
        console.log(JSON.parse(JSON.stringify(idUser)))

        let userGenA = Number(userData.genA)
        let userGenB = Number(userData.genB)
        Medicine_illnes.findAll({where:{ilnessId: illnessId},include: [{model:Medicine}]}).then(listMedicine=>{
            Illness.findById(illnessId).then(illnessData =>{
                // Create Report
                let createReport = {
                    UserId: idUser,
                    date: new Date(),
                    description: '',
                    reportName: `Report of ${illnessData.name}`,
                }

                Report.create(createReport).then(justCreatedReport =>{
                    let reportId = justCreatedReport.id
                    console.log('create REPORT')
                    console.log(JSON.parse(JSON.stringify(justCreatedReport)))
                    const findPercentage = listMedicine.map(each =>{
                        
                        return new Promise((resolve,reject)=>{
                            let percentage = getPercentageMedicine(userGenA,userGenB,each.Medicine.minGenA,each.Medicine.maxGenA,each.Medicine.minGenB,each.Medicine.maxGenB)
                            let description = report(percentage)
    
                            let createReport_Medicine = {
                                ReportId: justCreatedReport.id,
                                MedicineIllnessId: each.Medicine.id,
                                description: description,
                                percentage: percentage
                            }
                            Medicineillnes_Report.create(createReport_Medicine).then(createdEachReportMedicine =>{
                                console.log('Medicineillnes_Report')
                                console.log(JSON.parse(JSON.stringify(createdEachReportMedicine)))
                                resolve(each)
                            })
                            
                        }).catch((err)=>{reject(err)})
                    })
                    
                    Promise.all(findPercentage).then(done =>{
                        res.send(createdEachReportMedicine)
                        // // res.render('User/illness_detail',{data:data})
                        
                    })
                })

                
            })
        })
    })  
})


module.exports = Router