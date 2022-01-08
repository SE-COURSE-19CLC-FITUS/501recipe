'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const CommentSchema = new Schema({
  comment: { type: String, trim: true },
  createAt: Date,
  type: {
    type: String,
    enum: {
      values: ['recipe', 'blog'],
      message: '{VALUE} is not supported',
    },
  },
  name: { type: String, default: 'Anonymous' },
});

module.exports = mongoose.model('Comment', CommentSchema, 'comments');
