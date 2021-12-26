'use strict';

const mongoose = require('mongoose');
const { nonAccentVietnamese } = require('../../helpers/index.js');

const Schema = mongoose.Schema;

const options = { toObject: { virtuals: true } };

const slugValidator = function (val) {
  return nonAccentVietnamese(this.title).replaceAll(' ', '-') === val;
};

const recipeSchema = Schema(
  {
    imageUrl: String,
    ingredients: [{ text: String }],
    instructions: [{ text: String }],
    publisher: String,
    servings: { type: Number, min: [1, 'Must at least 1, got {VALUE}'] },
    slug: {
      type: String,
      validate: {
        validator: slugValidator,
        message:
          'The value has to be lowercase and separated by hyphen, got {VALUE}',
      },
    },
    source: String,
    tags: [{ text: String }],
    timePrep: String,
    title: String,
  },
  options
);

module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');
