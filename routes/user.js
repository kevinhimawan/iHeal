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
        res.render('User/home',{data:data,helper:require('../helpers/limit100Letters')})
    })
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
                        const rejectData = getCombineData.filter(rejected =>{
                            if(rejected.percentage < 50){
                                return new Promise((resolve,reject)=>{
                                    Medicine_illnes.findOne({where:{id:rejected.MedicineIllnessId}}).then(MedicineIllness=>{
                                        Medicine.findOne({where:{id:MedicineIllness.medicineId}}).then(MedicineData=>{
                                            rejected.Medicine = MedicineData
                                            resolve(rejected)
                                        }).catch((err)=>{reject(err)})
                                    }).catch((err)=>{console.log(err)})
                                })
                            }
                        })

                        const acceptedData = getCombineData.filter(accepted =>{
                            if(accepted.percentage > 50){
                                return new Promise ((resolve,reject)=>{
                                    Medicine_illnes.findOne({where:{id:accepted.MedicineIllnessId}}).then(MedicineIllness=>{
                                        Medicine.findOne({where:{id:MedicineIllness.medicineId}}).then(MedicineData=>{
                                            accepted.Medicine = MedicineData
                                            resolve(accepted)
                                        }).catch((err)=>{reject(err)})
                                    }).catch((err)=>{console.log(err)})
                                })
                            }
                        })

                        Promise.all(rejectData).then(rejectedData=>{
                            Promise.all(acceptedData).then(acceptedData=>{
                                console.log(acceptedData[0])
                                res.render('User/illness_detail',{
                                    illness: illnessData,
                                    acceptedData: acceptedData,
                                    rejectedData: rejectedData
                                })
                            })
                        })
                    })
                })                
            })
        })
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

// <%acceptedData.forEach((accept,index) =>{%>
//     <tr>
//         <td><%=index + 1%></td>
//         <td><%=accept.Medicine.name%></td>
//         <td><%=accept.Medicine.brand%></td>
//         <td><%=accept.Medicine.description%></td>
//     </tr>
// <%})%>