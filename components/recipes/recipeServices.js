'use strict';

const Recipe = require('./recipeModel.js');
const mongoose = require('mongoose');
const mongooseObject = require('../../utils/mongoose');
exports.list = () => Recipe.find({});

exports.findByPage = (page, itemPerPage) =>
  Recipe.find({})
    .skip(page * itemPerPage)
    .limit(itemPerPage);

exports.findBySlug = slug => Recipe.findOne({ slug: slug });

exports.saveRecipe = async recipe => {
  const newRecipe = new Recipe(recipe);
  const result = await newRecipe.save();
  return result;
};
exports.getRecipeById = async recipeId => {
  const result = await Recipe.findOne({
    _id: new mongoose.Types.ObjectId(recipeId),
  });
  return mongooseObject.mongooseToObject(result);
};
