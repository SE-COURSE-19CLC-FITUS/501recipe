'use strict';

const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController.js');

router.get('/', recipeController.recipesInPage);
router.get('/?page=', recipeController.recipesInPage);
router.get('/:slug', recipeController.getRecipeBySlug);

module.exports = router;
