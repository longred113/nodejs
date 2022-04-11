const Admin = require('../../models/admin.model');
const bcrypt = require('bcrypt');
require('dotenv/config');
// const mailer = require('../../utils/mailer');

exports.create = (req, res) => {
    res.render('admin/register');
}

exports.register = (req, res) => {
    const { email, password, name } = req.body;

    if (email && password && name) {
        Admin.findByEmail(email, (err, admin) => {
            if (err || admin) {
                // A user with that email address does not exists
                const conflictError = 'User credentials are exist.';
                res.render('admin/register', { email, password, name, conflictError });
            }
        })

        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
            // Create a User
            const admin = new Admin({
                name: name,
                email: email,
                password: hashed
            });
            Admin.create(admin, (err, admin) => {
                if (!err) {
                    // bcrypt.hash(admin.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    //     console.log(`${process.env.APP_URL}/verify?email=${admin.email}&token=${hashedEmail}`);
                    //     mailer.sendMail(admin.email, "Verify Email", `<a href="${process.env.APP_URL}/verify?email=${admin.email}&token=${hashedEmail}"> Verify </a>`)
                    // });
                    
                    res.redirect('/admin/login');
                }
            })
        });
    } else {
        const conflictError = 'User credentials are exist.';
        res.render('admin/register', { email, password, name, conflictError });
    }
}

// exports.verify = (req, res) => {
//     bcrypt.compare(req.query.email, req.query.token, (err, result) => {
//         if (result == true) {
//             User.verify(req.query.email, (err, result) => {
//                 if (!err) {
//                     res.redirect('/login');
//                 } else {
//                     res.redirect('/500');
//                 }
//             });
//         } else {
//             res.redirect('/404');
//         }
//     })
// }