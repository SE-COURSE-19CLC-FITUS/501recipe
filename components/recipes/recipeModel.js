'use strict';

const mongoose = require('mongoose');
const slugGenerator = require('mongoose-slug-generator');
const { isURL } = require('validator');
const { Schema } = mongoose;
mongoose.plugin(slugGenerator);

const options = { toObject: { virtuals: true } };

const recipeSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    datePublish: Date,
    imageUrl: {
      type: String,
      validate: {
        validator: isURL,
        message: 'Invalid URL',
      },
    },
    ingredients: [{ text: { type: String, trim: true } }],
    instructions: [{ text: { type: String, trim: true } }],
    levelSkill: {
      type: String,
      enum: {
        values: ['Dễ', 'Trung bình', 'Khó'],
        message: '{VALUE} is not supported',
      },
    },
    mealType: {
      type: String,
      enum: {
        values: ['breakfast', 'starter', 'lunch', 'dinner', 'dessert'],
        message: '{VALUE} is not supported',
      },
      get: function (val) {
        return val[0].toUpperCase() + val.slice(1);
      },
    },
    publisher: { id: mongoose.ObjectId, name: String },
    rating: {
      type: Number,
      min: [1, 'Must at least 1, got {VALUE}'],
      max: [5, 'Max is 5, got {VALUE}'],
    },
    servings: { type: Number, min: [1, 'Must at least 1, got {VALUE}'] },
    slug: {
      type: String,
      slug: 'title',
      validate: {
        validator: function (val) {
          return isSlug(val) && val === this.title;
        },
        message:
          'The value has to be lowercase and separated by hyphen, got {VALUE}',
      },
    },
    source: {
      type: String,
      validate: {
        validator: isURL,
        message: 'Invalid URL',
      },
    },
    tags: [{ text: { type: String, trim: true } }],
    timeCook: {
      type: String,
      validate: {
        validator: function (val) {
          return /^\d+\s*(giây|phút|giờ)$/.test(val);
        },
        message:
          'The value must have number and time unit, time unit must in "giây, phút, giờ"',
      },
    },
    tips: [{ text: { type: String, trim: true } }],
    title: { type: String, trim: true },
  },
  options
);

module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');
