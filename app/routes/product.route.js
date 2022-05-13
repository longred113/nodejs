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
    var upload = multer({storage: storage,
        limits: {
            fileSize: 50000000 // 1000000 Bytes = 1 MB
          },
          fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg)$/)) { 
               // upload only png and jpg format
               return cb(new Error('Please upload a Image'))
             }
           cb(undefined, true)
        }
    })

    router.get("/", product.findAll);
    // router.get("/", product.findAllCategory);
    router.get("/create", product.create);
    // router.get("/create", product.findAllCategory);
    router.post("/",upload.single('myFile'), product.store);
    router.get("/edit/:id", product.edit);
    router.post("/edit/:id",upload.single('myFile'),product.edit)
    router.put("/:id", product.update);
    router.post("/:id",upload.single('myFile'),product.update);
    router.get("/delete/:id", product.delete);
    router.delete("/delete", product.deleteAll);
    router.get("/image", product.showFrom);
    router.post("/image", upload.single('sampleFile'),product.uploadFile);
    router.get("/detail/:id",product.showDetail);
    router.post("/detail/:id",product.showDetail);
    // router.post('/product/create',upload.single('myFile'));
    router.get("/bds", product.showBDS);
    // router.get("/editImage/:id", product.updateImage);

    // router.post("/uploadfile", upload.single('myFile'), product.uploadFile, (req, res) => {
    //     if (!req.file) {
    //         console.log("No file upload");
    //     } else {
    //         console.log(req.file.filename)
    //         var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
    //         var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
    //         db.query(insertData, [imgsrc], (err, result) => {
    //             if (err) throw err
    //             console.log("file uploaded")
    //         })
    //     }
    // });
    app.use('/product', router);
}