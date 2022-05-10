
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
    router.get('/blog',(req,res)=>{
        res.render('blog');
    })
    router.get('/blog1',(req,res)=>{
        res.render('blog1');
    })
    router.get('/bds',(req,res)=>{
        res.render('bds');
    })
    router.get('/profile',authMiddleware.loggedin, (req,res)=>{
        res.render('profile');
    })

    app.use(router);
    
}