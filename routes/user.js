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
const sendEmail = require('../helpers/mailgun')

Router.get('/',(req,res)=>{
    let idUser = Number(req.session.idUser)
    let name = User.getId(req.session.idUser)
    name.then(data =>{
        res.render('User/home',{data:null,userData:data})
    })
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
            let name = User.getId(req.session.idUser)
            name.then(nameData=>{
            res.render('User/home',{data:data,helper:require('../helpers/limit100Letters'),userData:nameData})
        })
    })
})

Router.get('/:id/medicine_detail/back',(re,res)=>{
    res.redirect('/')
})

Router.get('/:id/medicine_detail',(req,res)=>{
    let idUser = Number(req.session.idUser)
    let illnessId = req.params.id
    User.findById(idUser).then(userData =>{

        let userGenA = Number(userData.genA)
        let userGenB = Number(userData.genB)
        Medicine_illnes.findAll({where:{ilnessId: illnessId},attributes: ['id','medicineId'],include: [{model:Medicine}]}).then(listMedicine=>{
            Illness.findById(illnessId).then(illnessData =>{
                let createReport = {
                    UserId: idUser,
                    date: new Date(),
                    description: '',
                    reportName: `Report of ${illnessData.name}`,
                }

                Report.create(createReport).then(justCreatedReport =>{
                    let reportId = justCreatedReport.id
                    const findPercentage = listMedicine.map(each =>{
                        return new Promise((resolve,reject)=>{
                            let percentage = getPercentageMedicine(userGenA,userGenB,each.Medicine.minGenA,each.Medicine.maxGenA,each.Medicine.minGenB,each.Medicine.maxGenB)
                            let description = report(percentage)
                            
                            let createReport_Medicine = {
                                ReportId: justCreatedReport.id,
                                MedicineIllnessId: each.id,
                                description: description,
                                percentage: percentage
                            }

                            Medicineillnes_Report.create(createReport_Medicine).then(createdEachReportMedicine =>{
                                resolve(createdEachReportMedicine)
                            }).catch((err)=>{reject(err)})
                        })
                    })
                    Promise.all(findPercentage).then(getCombineData=>{
                        const addMedicine = getCombineData.map(element =>{
                            return new Promise ((resolve,reject)=>{
                                Medicine_illnes.findOne({where:{id:element.MedicineIllnessId}}).then(MedicineIllness =>{
                                    Medicine.findOne({where:{id:MedicineIllness.medicineId}}).then(MedicineData =>{
                                        element.Medicine = MedicineData
                                        resolve(element)
                                    })
                                })
                            })
                        })

                        Promise.all(addMedicine).then(allCombine=>{
                            res.render('User/illness_detail',{
                                illness: illnessData,
                                allData: allCombine,
                                userId: idUser
                            })
                        })
                    })
                })                
            })
        })
    })  
})


Router.get('/suggestion_medicine/:id',(req,res)=>{
    let report = Number(req.params.id)
    Medicineillnes_Report.findAll({
        where:{ReportId: report}
    }).then(data=>{
        const findMedicineIlness = data.map(element =>{
            return new Promise ((resolve,reject)=>{
                Medicine_illnes.findOne({
                    where:{id: element.MedicineIllnessId},include:[{model:Illness},{model:Medicine}]
                }).then(medicine_illness =>{
                    element.medicineAnIllness = medicine_illness
                    resolve(element)
                }).catch((err)=>{reject(err)})
            })
        })

        Promise.all(findMedicineIlness).then(allData=>{
            let email = req.session.email
            let data = allData[0].medicineAnIllness.Illness.name + "\n" + allData[0].medicineAnIllness.Illness.description + "\n" + '\n'
           for(let i = 0; i < allData.length; i++){
               data += "Medicine Name:" + "\n" + `- ${allData[i].medicineAnIllness.Medicine.name}` + "\n" + "\n" + "Medicine Brand:" + "\n" + `- ${allData[i].medicineAnIllness.Medicine.brand}` + "\n" + "\n" + "Medicine Descrition" + "\n" + `- ${allData[i].medicineAnIllness.Medicine.description}` + "\n" + "\n" + "Medicine Percentage" + "\n" + `- ${allData[i].percentage}%` + "\n" + "\n" + "Medicine Effectiveness" + "\n" + `- ${allData[i].description}` + "\n" + "\n" + "----------------------------------------------------------" + "\n" + "\n"
           }
           sendEmail(email,data)
           res.render('emailconfirm')
        }).catch((err)=>{console.log(err)})
    }).catch((err)=>{
        res.send(err)
    })
    
})

module.exports = Router
