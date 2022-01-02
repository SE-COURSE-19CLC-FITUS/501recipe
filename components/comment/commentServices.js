'use strict'
const Comment = require('./commentModel');

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
