const Admin = require('../../models/admin.model');
const bcrypt = require('bcrypt');

exports.showLoginForm = (req, res) => {
    res.render('admin/login');
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    
    if (email && password) {
        Admin.findByEmail(email, (err, admin) => {
            if (!admin) {
                res.redirect('/admin/login');
            } else {
                bcrypt.compare(password, admin.password, (err, result) => {
                    if (result == true) {
                        req.session.loggedin = true;
                        req.session.admin = admin;
                        res.redirect('/adminHome');
                    } else {
                        // A user with that email address does not exists
                        const conflictError = 'User credentials are not valid.';
                        res.render('admin/login', { email, password, conflictError });
                    }
                })
            }
        })
    } else {
        // A user with that email address does not exists
        const conflictError = 'User credentials are not valid.';
        res.render('admin/login', { email, password, conflictError });
    }
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.redirect('/500');
        res.redirect('/admin');
    })
}