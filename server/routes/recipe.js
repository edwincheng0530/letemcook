const express = require('express');

const recipeController = require('../controllers/recipe');

const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.get('/edit/', recipeController.getRecipe);
router.put('/', recipeController.updateRecipe);
router.post('/', recipeController.postRecipe);
router.delete('/', recipeController.deleteRecipe);

module.exports = router;