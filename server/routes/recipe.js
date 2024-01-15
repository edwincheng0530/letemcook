const express = require('express');

const recipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.postRecipe);

module.exports = router;