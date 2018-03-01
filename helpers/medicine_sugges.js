function Medicine(dataUser,dataMedicine){
    let suggest_medicine = {}
    let prohibition_medicine = {}
    let medicine = []
    for(let i = 0 ; i < data2 ; i++){
        let midA = (suggestMed[i].maxGenA - suggestMed[i].minGenA)/2
        let midB = (suggestMed[i].maxGenB - suggestMed[i].minGenB)/2
        if(dataMedicine[i].minGenA < dataUser.genA && dataMedicine[i].maxGenA > dataUser.genA || dataMedicine[i].minGenB < dataUser.genB && dataMedicine[i].maxGenB > dataUser.genB ){
            suggest_medicine = dataMedicine[i]
            medicine.push(suggest_medicine)
        } else{
            prohibition_medicine = dataMedicine[i]
            medicine.push(prohibition_medicine)
        }
    }
    return medicine
}

module.exports = Medicine