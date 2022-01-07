'use strict';
const express = require('express');
const router = express.Router();
const userRecipeController = require('./userRecipeController.js');

router.get('/', userRecipeController.getUserRecipes);
router.post('/delete', userRecipeController.deleteUserRecipe);
module.exports = router;
