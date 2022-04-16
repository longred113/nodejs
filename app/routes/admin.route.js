var router = require('express').Router();
const login = require('../controllers/admin/login.controller');
const adminMiddleware = require('../middlewares/admin.middleware');
const register = require('../controllers/admin/register.controller');
const forgotPassword = require('../controllers/admin/forgotPassword.controller');
module.exports = app => {
    router.get('/admin/login', adminMiddleware.isAdmin, login.showLoginForm)
    .post('/admin/login', login.login)

    .get('/admin/register',adminMiddleware.isAdmin,register.create)
    .post('/admin/register',register.register)

    .get('/admin/logout',adminMiddleware.loggedin, login.logout)

    .get('/admin/password/reset', forgotPassword.showForgotForm)
    .post('/admin/password/email', forgotPassword.sendResetLinkEmail)

    .get('/admin/password/reset/:email', forgotPassword.showResetForm)
    .post('/admin/password/reset', forgotPassword.reset)
    app.use(router);
}