const todo = require('../controllers/todo.controller');
var router = require('express').Router();
module.exports = app => {
    // Retrieve all todo
    router.get("/", todo.findAll);

    // Show form create Todo
    router.get("/create", todo.create);
    // Store Todo
    router.post("/", todo.store);

    // Retrieve a single todo with id
    router.get("/edit/:id", todo.edit);
    // Update a todo with id
    router.put("/:id", todo.update);

    // Delete a todo with id
    router.get("/delete/:id", todo.delete);

    // Delete all todo
    router.delete("/delete", todo.deleteAll);
    
    // Retrieve all published todo
    router.get("/published", todo.findAllPublished);

    app.use('/todo', router);
    
}