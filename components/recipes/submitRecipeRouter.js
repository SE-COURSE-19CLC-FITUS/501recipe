'use strict';

const submitRecipe = require('./submitRecipeController');
const express = require('express');
const router = express.Router();

router.get('/submit-recipe', submitRecipe.show);

router.post('/submitRecipe', submitRecipe.submit);
module.exports = router;
