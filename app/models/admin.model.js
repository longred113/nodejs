const sql = require('./db');

const Admin = function(admin){
    this.name = admin.name;
    this.password = admin.password;
    this.email = admin.email;
}

Admin.create = (newAdmin, result) =>{
    sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created admin: ", { id: res.insertId, ...newAdmin });
        result(null, { id: res.insertId, ...newAdmin });
    });
};

Admin.findByEmail = (email, result) => {
    sql.query(`SELECT * from admin WHERE email = '${email}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0])
            return;
        }
        result(null, null);
    });
}

Admin.resetPassword = (email, password, result) => {
    sql.query(
        "UPDATE admin SET password = ? WHERE email = ?",
        [password, email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { email: email });
        }
    );
};

module.exports = Admin;