const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res, next) => {
    try {
        const [allRecipes] = await Recipe.fetchAll(req.query.email);
        res.status(200).json(allRecipes);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postRecipe = async (req, res, next) => {
    try {
        const postResponse = await Recipe.post(req.body.email, req.body.title, req.body.recipe);
        res.status(201).json(postResponse);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};