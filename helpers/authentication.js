module.exports = {
    checkRole: function(req,res,next){
        if(req.session.role !== 'admin'){
            res.redirect('/')
        }else{
            next()
        }
    }
}
