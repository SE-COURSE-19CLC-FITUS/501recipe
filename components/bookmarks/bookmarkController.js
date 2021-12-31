const moongoose = require('mongoose');
const bookmarkModel = require('./BookmarkModel');
class Bookmark {
  async addBookmark(req, res) {
    const recipeId = req.body.recipeId;
    const userId = req.user._id;

    const bookmarkItem = await bookmarkModel.find({
      userId: new moongoose.Types.ObjectId(userId),
      bookmark: [{ recipeId: new moongoose.Types.ObjectId(recipeId) }],
    });

    if (bookmarkItem.length !== 0) {
      return res.status(400).json({ message: 'Recipe already in bookmarks' });
    }
    const bookmark = await bookmarkModel.findOne({
      userId: new moongoose.Types.ObjectId(userId),
    });
    if (!bookmark) {
      const newBookmark = new bookmarkModel({
        userId: new moongoose.Types.ObjectId(userId),
        bookmark: [{ recipeId: new moongoose.Types.ObjectId(recipeId) }],
      });

      await newBookmark.save();
    } else {
      const addBookmark = await bookmarkModel.findOneAndUpdate(
        { userId: new moongoose.Types.ObjectId(userId) },
        {
          $push: {
            bookmark: { recipeId: new moongoose.Types.ObjectId(recipeId) },
          },
        }
      );
    }

    res.status(200).json({ message: 'Recipe added to bookmarks' });
  }
}
module.exports = new Bookmark();
