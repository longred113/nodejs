const sql = require('./db');

const Product = function(product){
    this.productName = product.productName;
    this.price = product.price;
    this.image = product.image;
    this.detail = product.detail;
    this.id_category = product.id_category;
}
Product.create = (newProduct, result) => {
    sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created product: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};
Product.findById = (id, result) => {
    sql.query(`SELECT * FROM product WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found todo with the id
        result({ kind: "not_found" }, null);
    });
};
Product.getAll = (productName, result) => {
    let query = "SELECT * FROM product";
    if (productName) {
        query += ` WHERE productName LIKE '%${productName}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("product: ", res);
        result(null, res);
    });
};

module.exports = Product;