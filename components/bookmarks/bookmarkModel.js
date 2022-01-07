'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const BookmarkSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  bookmark: [
    {
      recipeId: mongoose.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model('Bookmark', BookmarkSchema, 'bookmarks');
