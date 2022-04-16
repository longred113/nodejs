const Admin = require('../../models/admin.model');
const bcrypt = require('bcrypt');
const mailer = require('../../utils/mailer');

exports.showForgotForm = (req, res) => {
    res.render('admin/passwords/email');
}

exports.sendResetLinkEmail = (req, res) => {
    if (!req.body.email) {
        res.redirect('/password/reset')
    } else {
        Admin.findByEmail(req.body.email, (err, admin) => {
            if (!admin) {
                res.redirect('/admin/password/reset')
            } else {
                bcrypt.hash(admin.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    mailer.sendMail(admin.email, "Reset password", `<a href="${process.env.APP_URL}/admin/password/reset/${admin.email}?token=${hashedEmail}"> Reset Password </a>`)
                    console.log(`${process.env.APP_URL}/password/reset/${admin.email}?token=${hashedEmail}`);
                })
                // res.redirect('/password/reset?status=success');
                res.send('Check Email!!');
            }
        })
    }
}

exports.showResetForm = (req, res) => {
    if (!req.params.email || !req.query.token) {
        res.redirect('/admin/password/reset')
    } else {
        res.render('admin/passwords/reset', { email: req.params.email, token: req.query.token})
    }
}

exports.reset = (req, res) => {
    const { email, token, password } = req.body;
    console.log(email, token, password);
    if (!email || !token || !password) { 
        res.redirect('/admin/password/reset');
    } else {
        bcrypt.compare(email, token, (err, result) => {
            console.log('compare', result);
            if (result == true) {
                bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedPassword) => {
                    Admin.resetPassword(email, hashedPassword, (err, result) => {
                        if (!err) {
                            res.redirect('/admin/login');
                        } else {
                            res.redirect("/500");
                        }
                    })
                })
            } else {
                res.redirect('/admin/password/reset');
            }
        })
    }
}