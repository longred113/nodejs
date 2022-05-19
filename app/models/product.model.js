const sql = require('./db');

const Product = function(product){
    this.productName = product.productName;
    this.address = product.address;
    this.price = product.price;
    this.image = product.image;
    this.detail = product.detail;
    this.id_category = product.id_category;
    this.area = product.area;
    this.status = product.status;
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
Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE product SET productName = ?, price = ?, detail = ?,image = ?,area = ?,id_category = ?,status = ?,address = ? WHERE id = ?",
        [product.productName,product.price,product.detail,product.image,product.area,product.id_category,product.status,product.address, id],
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
            console.log("updated product: ", { id: id, ...product });
            result(null, { id: id, ...product });
        }
    );
};
// Product.updateImage = (id, product, result) => {
//     sql.query(
//         "UPDATE product SET image = ? WHERE id = ?",[product.image, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }
//             if (res.affectedRows == 0) {
//                 // not found todo with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }
//             console.log("updated product: ", { id: id, ...product });
//             result(null, { id: id, ...product });
//         }
//     );
// };
Product.remove = (id, result) => {
    sql.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
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
        console.log("deleted product with id: ", id);
        result(null, res);
    });
};
Product.removeAll = result => {
    sql.query("DELETE FROM product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} product`);
        result(null, res);
    });
};

module.exports = Product;