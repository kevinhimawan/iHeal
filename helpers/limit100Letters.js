function limit100Letters(value){
    let string = ""
    for(let i = 0; i < value.length; i++){
        if(i < 100){
            string+= value[i]
        }
    }
    return string.trim()
}

module.exports = limit100Letters