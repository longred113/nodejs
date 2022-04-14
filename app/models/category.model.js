const sql = require('./db');

const Category = function(category){
    this.categoryName = category.categoryName;
}

Category.create = (newCategory, result) => {
    sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created category: ", { id: res.insertId, ...newCategory });
        result(null, { id: res.insertId, ...newCategory });
    });
};
Category.findById = (id, result) => {
    sql.query(`SELECT * FROM category WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found category: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found todo with the id
        result({ kind: "not_found" }, null);
    });
};
Category.getAll = (categoryName, result) => {
    let query = "SELECT * FROM category";
    if (categoryName) {
        query += ` WHERE categoryName LIKE '%${categoryName}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("category: ", res);
        result(null, res);
    });
};
Category.updateById = (id, category, result) => {
    sql.query(
        "UPDATE category SET categoryName = ? WHERE id = ?",
        [category.categoryName, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found todo with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated category: ", { id: id, ...category });
            result(null, { id: id, ...category });
        }
    );
};
Category.remove = (id, result) => {
    sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found todo with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted category with id: ", id);
        result(null, res);
    });
};
Category.removeAll = result => {
    sql.query("DELETE FROM category", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} category`);
        result(null, res);
    });
};
module.exports = Category;