const db = require ('../util/database');

module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    static post(email, password) {
        return db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    }
};