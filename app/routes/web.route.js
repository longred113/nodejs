
var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = app => {
    router.get('/home', authMiddleware.loggedin, (req,res)=>{
        res.render('home');
    })

    app.use(router);
    
}