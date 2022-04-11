const req = require('express/lib/request');
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
        image: req.body.image,
        detail: req.body.detail,
        id_category: req.body.id_category,
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