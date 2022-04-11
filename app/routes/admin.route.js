var router = require('express').Router();
const login = require('../controllers/admin/login.controller');
const adminMiddleware = require('../middlewares/admin.middleware');
const register = require('../controllers/admin/register.controller');
module.exports = app => {
    router.get('/admin/login', adminMiddleware.isAdmin, login.showLoginForm)
    .post('/admin/login', login.login)

    .get('/admin/register',adminMiddleware.isAdmin,register.create)
    .post('/admin/register',register.register)

    .get('/admin/logout',adminMiddleware.loggedin, login.logout)
    app.use(router);
}