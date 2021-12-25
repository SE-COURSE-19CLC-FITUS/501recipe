const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController');

router.get('/recipes', recipeController.recipesInPage);
router.get('/recipes?page=', recipeController.recipesInPage);
router.get('/recipes/:slug', recipeController.getRecipeBySlug);

module.exports = router;
