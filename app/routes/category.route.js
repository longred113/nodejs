const category = require('../controllers/admin/category.controller');
var router = require('express').Router();

module.exports = app => {

    router.get("/", category.findAll);
    router.get("/create", category.create);
    router.post("/", category.store);
    router.get("/edit/:id", category.edit);
    router.put("/:id", category.update);
    router.get("/delete/:id", category.delete);
    router.delete("/delete", category.deleteAll);
    app.use('/category', router);
}