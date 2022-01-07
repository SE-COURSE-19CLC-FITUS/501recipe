'use strict';
const Comment = require('./commentModel');

exports.postComment = (type, name, id, comment) => {
  return new Comment({
    type,
    name,
    id,
    comment,
    createAt: new Date(),
  }).save();
};

exports.getRecipeComments = (type, id, page, itemPerPage) =>
  Comment.find({ type: type, id: id })
    .skip((page - 1) * itemPerPage)
    .limit(itemPerPage)
    .lean();

exports.countComments = (type, id) =>
  Comment.find({ type: type, id: id }).count();
