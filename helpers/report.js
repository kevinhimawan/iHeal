function report (value){
    if(Number(value) > 80){
      return `This medicine are well effective toward your illness`
    }else if(Number(value) > 60){
      return `This medicine are effective toward your illness howerver there are several side effect that you might consider`
    }else if(Number(value) > 40){
      return `This medicine are not effective enough but does not have any side effects toward your health`
    }else{
      return `This medicine are very un-effective and cause your several bad side effects`
    }
  }

  module.exports = report