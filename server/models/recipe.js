const db = require ('../util/database');

module.exports = class Recipe {
    constructor(userEmail, title, recipe) {
        this.userEmail = userEmail;
        this.title = title;
        this.recipe = recipe;
    }

    static fetchAll(userEmail) {
        return db.execute('SELECT * FROM recipe WHERE userEmail = ?', [userEmail]);
    }

    static getRecipe(id) {
        return db.execute('SELECT * FROM recipe WHERE idrecipe = ?', [id]);
    }

    static updateRecipe(id, title, recipe) {
        return db.execute('UPDATE recipe SET title = ?, recipe = ? WHERE idrecipe = ?', [title, recipe, id]);
    }

    static post(userEmail, title, recipe) {
        return db.execute('INSERT INTO recipe (userEmail, title, recipe) VALUES (?, ?, ?)', [userEmail, title, recipe]);
    }

    static deleteRecipe(id) {
        return db.execute('DELETE FROM recipe WHERE idrecipe = ?', [id]);
    }
};