const mongoose = require('mongoose');
const bookmarkModel = require('./BookmarkModel');

exports.findBookmark = async function (userId, recipeId) {
  const filter = {
    userId: new mongoose.Types.ObjectId(userId),
    'bookmark.recipeId': new mongoose.Types.ObjectId(recipeId),
  };
  const result = await bookmarkModel.find(filter);
  return result;
};
