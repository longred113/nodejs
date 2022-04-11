const product = require('../controllers/admin/product.controller');
const multer = require('multer');
const uploadMulter = require('../models/product.model');
const fsExtra = require('fs-extra');
const db = require('../models/db');
var router = require('express').Router();

module.exports = app => {
    // SET STORAGE
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let path = 'app/public/uploads';
            if (!fsExtra.existsSync(path)) {
                fsExtra.mkdirSync(path)
            }

            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    });

    var upload = multer({ storage: storage })

    router.get("/", product.findAll);
    router.get("/create", product.create);
    router.post("/create", upload.single('myFile'), product.uploadFile)
    router.post("/", product.store);
    router.get("/image",product.showFrom);
    router.post("/uploadfile", upload.single('myFile'), product.uploadFile, (req, res) => {
        if (!req.file) {
            console.log("No file upload");
        } else {
            console.log(req.file.filename)
            var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
            var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
            db.query(insertData, [imgsrc], (err, result) => {
                if (err) throw err
                console.log("file uploaded")
            })
        }
    });
    app.use('/product', router);
}