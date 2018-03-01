const express = require('express')
const app = express()
const session = require('express-session')

// Body-Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))


// View
app.set('view engine','ejs')

// Static
app.use(express.static(__dirname + '/public'));

// Session
app.use(session({
    key: 'userId',
    secret: 'catch-me-if-you-can',
    cookie: {
        maxAge: 1 * 60 * 60 * 1000
    }
}));

// Routes General
const Login = require('./routes/login')
app.use('/login',Login)

// CheckLogin
app.use(function(req,res,next){
    if(req.session.idUser){
        next()
    }else{
        res.redirect('/login')
    }
})


//Router User
const User = require('./routes/user') 
// Use Routes
app.use('/',User)

// Check Admin
app.use(function(req,res,next){
    if(req.session.role !== 'admin'){
        res.redirect('/')
    }else{
        next()
    }
})

// Routes Admin
const IndexAdmin = require('./routes/index')
const MedicineAdmin = require('./routes/medicine')
const IllnessAdmin = require('./routes/illness')

app.use('/admin', IndexAdmin)

app.use('/admin/medicine', MedicineAdmin)
app.use('/admin/illness',IllnessAdmin)

// app.use((req,res,next)=>{
//     req.session.destroy()
//     res.render('landingError')
// })




app.listen(3000,()=>{console.log(`Welcome Abroad Sir`)})
