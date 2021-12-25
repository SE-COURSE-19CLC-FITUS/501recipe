const mongoose = require('mongoose');
const { nonAccentVietnamese } = require('../../helper/index.js');

const Schema = mongoose.Schema;

const recipeSchema = Schema({
  imageUrl: String,
  ingredients: [{ text: String }],
  instructions: [{ text: String }],
  publisher: String,
  servings: { type: Number, min: [1, 'Must at least 1, got {VALUE}'] },
  source: String,
  tags: [{ text: String }],
  timePrep: String,
  title: String,
});

recipeSchema.virtual('slug').get(function () {
  return nonAccentVietnamese(this.titleRecipe).replaceAll(' ', '-');
});

module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');
