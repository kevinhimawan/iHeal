const express = require('express')
const app = express()

// Body-Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))


// View
app.set('view engine','ejs')

// Routes Admin
const IndexAdmin = require('./routes/index')
const MedicineAdmin = require('./routes/medicine')
const IllnessAdmin = require('./routes/illness')

// Use Routes
app.use('/admin', IndexAdmin)
app.use('/admin/medicine', MedicineAdmin)
app.use('/admin/illness',IllnessAdmin)

app.listen(3000,()=>{console.log(`Welcome Abroad Sir`)})
