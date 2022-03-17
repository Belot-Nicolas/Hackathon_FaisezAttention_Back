const connection = require('../db-config');
const db = connection.promise();

const findUserByEmail = (email) => 
    connection
    .promise()
    .query('SELECT * FROM users WHERE email=?',
    [email]);

const insertUser = (firstname, lastname, password, email, avatar, role) =>
    connection
    .promise() 
    .query('INSERT INTO users (`firstname`, `lastname`, `password`, `email`, `avatar`, `role`) VALUES (?, ?, ?, ?, ?, ?)',
    [firstname, lastname, password, email, avatar, role]); 

const update = (data, id) => {
    return db
        .query("UPDATE users SET ? WHERE id_user=?", [data, id])
        .then(([result]) => {
            return result.affectedRows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const findOne = (id) => {
    return db
        .query("SELECT * FROM users WHERE id_user=?", [id])
        .then(([result]) => result[0])
        .catch((err) => {
            console.error(err);
            return err;
        });
}

module.exports = {
    findUserByEmail,
    insertUser,
    update,
    findOne
};