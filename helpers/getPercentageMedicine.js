function calculation (genAuser,genBuser,minGenAMedicine,maxGenAMedicine,minGenBMedicine,maxGenBMedicine){


    let percentageA = 0
    let percentageB = 0
    if(genAuser > minGenAMedicine && genAuser < maxGenAMedicine){
      let gapABot = genAuser - minGenAMedicine
      let gapATop = maxGenAMedicine - genAuser
      let gapABotTop = Math.abs(gapABot - gapATop)
      let gapMedicineATopBot = maxGenAMedicine - minGenAMedicine
      percentageA = Math.round(Math.abs(gapABotTop - gapMedicineATopBot) / gapMedicineATopBot * 100)
    } 

    if(genBuser > minGenBMedicine && genBuser < maxGenBMedicine){
      let gapBBot = genBuser - minGenBMedicine
      let gapBTop = maxGenBMedicine - genBuser
      let gapBBotTop = Math.abs(gapBBot - gapBTop)
      let gapMedicineBTopBot = maxGenBMedicine - minGenBMedicine
      percentageB = Math.round(Math.abs(gapBBotTop - gapMedicineBTopBot) / gapMedicineBTopBot * 100)
    }

    if(percentageA > percentageB){
      return percentageA
    }else if(percentageA < percentageB){
      return percentageB
    }else{
      return 0
    }

     
  }
  module.exports = calculation
  
  
  
  
  