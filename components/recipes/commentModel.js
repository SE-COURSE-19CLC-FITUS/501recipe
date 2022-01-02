'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const CommentSchema = new Schema({
  name: String,
  recipeId: mongoose.Types.ObjectId,
  comment: String,
  createAt: Date,
});

module.exports = mongoose.model('Comment', CommentSchema, 'comments');
