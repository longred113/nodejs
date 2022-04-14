const Product = require('../../models/product.model');

exports.create = (req, res) => {
    res.locals.status = req.query.status;
    res.render('product/create');
}
exports.showFrom = (req, res) =>{
    res.locals.status = req.query.status;
    res.render('product/image');
}
exports.uploadFile = (req, res) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
}

exports.store = (req, res) => {
    // Validate request
    if (!req.body) {
        res.redirect('/product/create?status=error')
    }
    const product = new Product({
        productName: req.body.productName,
        price: req.body.price,
        // image: req.body.image,
        detail: req.body.detail,
        // id_category: req.body.id_category,
        // published: !req.body.published ? false : true
    });
    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err)
            res.redirect('/product/create?status=error')
        else res.redirect('/product/create?status=success')
    });
};

exports.findAll = (req, res) => {
    res.locals.deleted = req.query.deleted;
    const productName = req.query.productName;
    Product.getAll(productName, (err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('product/index', {product: data});
    });
};
exports.edit = (req, res) => {
    res.locals.status = req.query.status;

    Product.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
        } else res.render('product/edit', { product: data });
    });
};
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.redirect('/product/edit/' + req.params.id + '?status=error')
    }
    // if (req.body.published == 'on') {
    //     req.body.published = true;
    // } else {
    //     req.body.published = false;
    // }
    Product.updateById(
        req.params.id,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.redirect('/404');
                } else {
                    res.redirect('/500');
                }
            } else res.redirect('/product/edit/' + req.params.id + '?status=success');
        }
    );
};
exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
        } else res.redirect('/product?deleted=true')
    });
};
exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
        if (err)
            res.redirect('/500');
        else res.redirect('/product?deleted=true')
    });
};