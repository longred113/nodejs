exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.admin= req.session.admin
        next();
    } else {
        res.redirect('/admin/login')
    }
}
exports.isAdmin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.admin = req.session.admin
        res.redirect('/adminHome');
    } else {
        next();
    }
}
