'use strict';

const Recipe = require('./recipeModel');
const Comment = require('./commentModel');
const mongoose = require('mongoose');
const mongooseObject = require('../../utils/mongooseUtil');
const { NUMBER_TOP_RECIPE } = require('../../config/constants.js');

exports.list = () => Recipe.find({});

exports.countRecipes = () => Recipe.find().count();

exports.findByPage = (filter, page, itemPerPage) =>
  // Pages have index 1, instead of 0. So if page is 1, then we don't skip
  Recipe.find(filter)
    .skip((page - 1) * itemPerPage)
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
exports.getTopRecipes = async () => {
  const filter = {
    rating: {
      $gte: 4.5,
    },
  };
  const result = await Recipe.find(filter)
    .sort({ rating: -1 })
    .limit(NUMBER_TOP_RECIPE);
  result.forEach(item => {
    if (item.imageUrl.length > 0) {
      item.imageUrl = item.imageUrl[0];
    }
  });
  return mongooseObject.multipleMongooseToObject(result);
};

exports.postComment = (name, recipeId, comment) => {
  return new Comment({
    name: name,
    recipeId: recipeId,
    comment: comment,
    createAt: new Date(),
  }).save();
};

exports.getRecipeComments = (recipeId, page, itemPerPage) =>
  Comment.find({ recipeId: recipeId })
    .skip((page - 1) * itemPerPage)
    .limit(itemPerPage)
    .lean();

exports.countComments = recipeId =>
  Comment.find({ recipeId: recipeId }).count();
