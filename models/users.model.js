const connection = require('../db-config');

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

module.exports = {
    findUserByEmail,
    insertUser,
};