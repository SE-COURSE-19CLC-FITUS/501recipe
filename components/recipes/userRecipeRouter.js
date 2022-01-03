'use strict';
const express = require('express');
const router = express.Router();
const userRecipeController = require('./userRecipeController.js');

router.get('/', userRecipeController.getUserRecipes);

module.exports = router;
