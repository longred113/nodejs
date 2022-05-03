const Product = require('../../models/product.model');
const sql = require('../../models/db');
const { callbackPromise } = require('nodemailer/lib/shared');
const multer = require('multer');
const fsExtra = require('fs-extra');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let path = '/app/public/uploads/';
//         if (!fsExtra.existsSync(path)) {
//             fsExtra.mkdirSync(path)
//         }

//         cb(null, path)
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });
// const upload = multer({
//     storage: storage,
//     limits: { fieldSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if (mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Gửi đúng định dạng file')
//     }
// }).single('myFile')


exports.create = (req, res) => {
    res.locals.status = req.query.status;
    res.render('product/create');
}
// exports.showFrom = (req, res) =>{
//     res.locals.status = req.query.status;
//     Product.findById(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.redirect('/404');
//             } else {
//                 res.redirect('/500');
//             }
//         } else res.render('product/image', { product: data });
//     });
// }
exports.showFrom = (req, res) => {
    res.locals.status = req.query.status;
    res.render('product/image');
}
exports.showBDS = (req, res) => {
    res.locals.deleted = req.query.deleted;
    const productName = req.query.productName;
    Product.getAll(productName, (err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('product/bds', { product: data });
    });
}
// exports.fileUpload = (req, res) => {
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // name of the input is sampleFile
//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + '/app/public/uploads/' + sampleFile.name;

//     console.log(sampleFile);

//     // Use mv() to place file on the server
//     sampleFile.mv(uploadPath, function (err) {
//         if (err) return res.status(500).send(err);
//         res.send('File uploaded!');
//     })

// }
exports.uploadFile = (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
}
exports.handleUploadFile = (req, res) => {
    if (!req.file) {
        return res.send('Please select an image to upload');
    } else {
        res.send(`You have uploaded this image: <hr/><img src="app/public/uploads/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    }
}

exports.store = (req, res) => {
    // Validate request
    if (!req.body) {
        res.redirect('/product/create?status=error')
    }
    const image = req.file.buffer.toString('base64');
    // console.log(image)
    const product = new Product({
        productName: req.body.productName,
        image,
        price: req.body.price,
        detail: req.body.detail,
        // id_category: req.body.id_category,
        // published: !req.body.published ? false : true
    });
    // console.log(image);
    console.log(product);
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
        else res.render('product/index', { product: data });
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
    const image = req.file.buffer.toString('base64');
    // console.log(image);
    Product.updateById(
        req.params.id,
        new Product({
            ...req.body,
            image
        }),
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
// exports.updateImage = (req, res){
//     if (!req.body) {
//         res.redirect('/product/image/' + req.params.id + '?status=error')
//     }
//     Product.updateImage(
//         req.params.id,
//         new Product(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.redirect('/404');
//                 } else {
//                     res.redirect('/500');
//                 }
//             } else res.redirect('/product/image/' + req.params.id + '?status=success');
//         }
//     );
// };
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