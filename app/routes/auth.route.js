
var router = require('express').Router();
const product = require('../controllers/admin/product.controller');
const login = require('../controllers/auth/login.controller');
const register = require('../controllers/auth/register.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const forgotPassword = require('../controllers/auth/forgotPassword.controller');
module.exports = app => {
    router.get('/login', authMiddleware.isAuth, login.showLoginForm)
    .post('/login', login.login)

    .get('/register', authMiddleware.isAuth, register.create)
    .post('/register', register.register)

    .get('/logout', authMiddleware.loggedin, login.logout)

    .get('/verify',register.verify)

    .get('/password/reset', forgotPassword.showForgotForm)
    .post('/password/email', forgotPassword.sendResetLinkEmail)

    .get('/password/reset/:email', forgotPassword.showResetForm)
    .post('/password/reset', forgotPassword.reset)
    
    .get('/auth/edit/:id', login.editUser)
    .put('/auth/:id', login.updateUser)
    app.use(router);
    
}