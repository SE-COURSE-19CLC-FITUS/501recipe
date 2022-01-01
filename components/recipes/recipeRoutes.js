'use strict';

const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController.js');

router.get('/recipes', recipeController.recipesInPage);
router.get('/recipes?page=', recipeController.recipesInPage);
router.get('/recipes/:slug', recipeController.getRecipeBySlug);

router.post('/recipes/post-comment', recipeController.postComment);

module.exports = router;
