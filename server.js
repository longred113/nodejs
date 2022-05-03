const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
// const fileUpload = require('express-fileupload');
const sql = require('./app/models/db');
const Product = require('./app/models/product.model');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'app/views');

// app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(express.static('app/public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.get('/', (req, res, next) => {
    res.render('index');
})
app.get('/admin', (req, res, next) => {
    res.render('adminIndex');
})
app.get('/500', (req, res) => {
    res.render('err')
});
app.get('/404', (req, res) => {
    res.render('404')
});
app.get('/image', (req, res) => {
    res.render('image')
});
app.post('/image', (req,res) => {
    productName = req.body.productName
    price = req.body.price
    image = req.body.file.name
    detail = req.body.detail
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/app/public/uploads/' + sampleFile.name;

    console.log(sampleFile);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        productName = req.body.productName
        price = req.body.price
        image = req.body.buffer.toString('base64')
        detail = req.body.detail
        q = "INSERT INTO product VALUES (NULL,?,?,?,NULL,?)"
        sql.query(q,[productName,price,detail,image],(err,rows,fields)=>{
            if(err)throw err;
            res.send('File uploaded');
        })
        // sql.query('UPDATE product SET image = ? WHERE id = "1"', [sampleFile.name], (err, rows) => {
        //     if (!err) {
        //         res.redirect('/product/image');
        //     } else {
        //         console.log(err);
        //     }
        // })
        // res.send('File uploaded!');
        // if (!req.body) {
        //     res.redirect('/product/image/' + req.params.id + '?status=error')
        // }
        // Product.updateImage(
        //     req.params.id,
        //     new Product(req.body),
        //     (err, data) => {
        //         if (err) {
        //             if (err.kind === "not_found") {
        //                 res.redirect('/404');
        //             } else {
        //                 res.redirect('/500');
        //             }
        //         } else res.redirect('/product/image/' + req.params.id + '?status=success');
        //     }
        // );
    });
});
// app.post('/product/create',(res,req)=>{
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // name of the input is sampleFile
//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + '/app/public/uploads/' + sampleFile.name;

//     console.log(sampleFile);
//     sampleFile.mv(uploadPath, function (err) {
//         if (err) return res.status(500).send(err);
//         res.send('File uploaded!');
//     });
//     image = req.sampleFile
//     imagev2 = req.body.sampleFile
//     title = req.body.productName
//     price = req.body.price
//     detail = req.body.detail
//     console.log(image)
//     console.log(title)
// });

require('./app/routes/todo.route')(app);
require('./app/routes/auth.route')(app);
require('./app/routes/web.route')(app);
require('./app/routes/admin.route')(app);
require('./app/routes/product.route')(app);
require('./app/routes/category.route')(app);
app.listen(3000, function () {
    console.log('Server running: http//localhost:3000');
});

