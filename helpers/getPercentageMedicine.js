function calculation (genAuser,genBuser,minGenAMedicine,maxGenAMedicine,minGenBMedicine,maxGenBMedicine){
  
    if(genAuser > minGenAMedicine && genAuser < maxGenAMedicine && genBuser > minGenBMedicine && genBuser < maxGenBMedicine){
      
      let gapABot = genAuser - minGenAMedicine
      let gapATop = maxGenAMedicine - genAuser
      let gapABotTop = Math.abs(gapABot - gapATop)
      let gapMedicineATopBot = maxGenAMedicine - minGenAMedicine
      let percentageA = Math.round(Math.abs(gapABotTop - gapMedicineATopBot) / gapMedicineATopBot * 100)
      
      let gapBBot = genBuser - minGenBMedicine
      let gapBTop = maxGenBMedicine - genBuser
      let gapBBotTop = Math.abs(gapBBot - gapBTop)
      let gapMedicineBTopBot = maxGenBMedicine - minGenBMedicine
      let percentageB = Math.round(Math.abs(gapBBotTop - gapMedicineBTopBot) / gapMedicineBTopBot * 100)
      
      let finalPercentage = Math.round((percentageA + percentageB)/2)
      return finalPercentage
      
    }else{
      return 0
    }
     
  }
  module.exports = calculation
  
  
  
  
  