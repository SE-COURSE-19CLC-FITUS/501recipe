const mongoose = require('mongoose');
const bookmarkModel = require('./BookmarkModel');
const mongooseOBject = require('../../utils/mongoose');
exports.findBookmark = async function (userId, recipeId) {
  const filter = {
    userId: new mongoose.Types.ObjectId(userId),
    'bookmark.recipeId': new mongoose.Types.ObjectId(recipeId),
  };
  const result = await bookmarkModel.find(filter);
  return result;
};

exports.getAllBookmark = async function (userId) {
  const filter = {
    userId: new mongoose.Types.ObjectId(userId),
  };
  const result = await bookmarkModel.findOne(filter);
  return mongooseOBject.mongooseToObject(result);
};
