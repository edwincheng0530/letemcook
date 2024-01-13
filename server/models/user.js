const db = require ('../util/database');
const bcrypt = require('bcrypt');

module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    static async post(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
};