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

exports.getRecipe = async (req, res, next) => {
    try {
        const [recipe] = await Recipe.getRecipe(req.query.id);
        res.status(200).json(recipe);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
} 

exports.updateRecipe = async (req, res, next) => {
    try {
        const [newRecipe] = await Recipe.updateRecipe(req.body.id, req.body.title, req.body.recipe);
        res.status(200).json(newRecipe);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.post(req.body.email, req.body.title, req.body.recipe);
        res.status(201).json(recipe);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.deleteRecipe(req.query.id);
        res.status(201).json(recipe);
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}