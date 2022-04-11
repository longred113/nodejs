const Category = require('../../models/category.model');
exports.create = (req, res) => {
    res.locals.status = req.query.status;
    res.render('category/create');
}
exports.store = (req, res) => {
    // Validate request
    if (!req.body) {
        res.redirect('/category/create?status=error')
    }
    const category = new Category({
        categoryName: req.body.categoryName,
        // published: !req.body.published ? false : true
    });
    // Save Todo in the database
    Category.create(category, (err, data) => {
        if (err)
            res.redirect('/category/create?status=error')
        else res.redirect('/category/create?status=success')
    });
};
exports.findAll = (req, res) => {
    res.locals.deleted = req.query.deleted;
    const categoryName = req.query.categoryName;
    Category.getAll(categoryName, (err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('category/index', {category: data});
    });
};
exports.edit = (req, res) => {
    res.locals.status = req.query.status;

    Category.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
        } else res.render('category/edit', { category: data });
    });
};
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.redirect('/category/edit/' + req.params.id + '?status=error')
    }
    // if (req.body.published == 'on') {
    //     req.body.published = true;
    // } else {
    //     req.body.published = false;
    // }
    Category.updateById(
        req.params.id,
        new Category(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.redirect('/404');
                } else {
                    res.redirect('/500');
                }
            } else res.redirect('/category/edit/' + req.params.id + '?status=success');
        }
    );
};
exports.delete = (req, res) => {
    Category.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
        } else res.redirect('/category?deleted=true')
    });
};
exports.deleteAll = (req, res) => {
    Category.removeAll((err, data) => {
        if (err)
            res.redirect('/500');
        else res.redirect('/category?deleted=true')
    });
};
