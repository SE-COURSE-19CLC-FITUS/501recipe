'use strict';

const mongoose = require('mongoose');
const slugGenerator = require('mongoose-slug-generator');
const { nonAccentVietnamese } = require('../../helpers/index.js');
mongoose.plugin(slugGenerator);
const Schema = mongoose.Schema;

const slugValidator = function (val) {
  return nonAccentVietnamese(this.title).replaceAll(' ', '-') === val;
};

const options = { toObject: { virtuals: true } };

const recipeSchema = Schema(
  {
    imageUrl: String,
    ingredients: [{ text: String }],
    instructions: [{ text: String }],
    publisher: String,
    servings: { type: Number, min: [1, 'Must at least 1, got {VALUE}'] },
    slug: {
      type: String,
      slug: 'title',
      validate: {
        validator: slugValidator,
        message:
          'The value has to be lowercase and separated by hyphen, got {VALUE}',
      },
    },
    source: String,
    tags: [{ text: String }],
    timeCook: String,
    title: String,
    rating: {
      type: Number,
      min: [1, 'Must at least 1, got {VALUE}'],
      max: [5, 'Max is 5, got {VALUE}'],
    },
    levelSkill: {
      type: String,
      enum: {
        values: ['Dễ', 'Trung bình', 'Khó'],
        message: '{VALUE} is not supported',
      },
    },
    datePublish: Date,
    tips: [{ text: String }],
    recipeType: String,
  },
  options
);

module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');
