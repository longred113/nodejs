
var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

module.exports = app => {
    router.get('/home', authMiddleware.loggedin, (req,res)=>{
        res.render('home');
    })

    router.get('/adminHome', adminMiddleware.loggedin, (req,res)=>{
        res.render('adminHome');
    })
    router.get('/news',(req, res)=>{
        res.render('news');
    })


    app.use(router);
    
}