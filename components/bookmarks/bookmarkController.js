const moongoose = require('mongoose');
const bookmarkModel = require('./BookmarkModel');
const bookmarkService = require('./bookmarkService');
const recipeService = require('../recipes/recipeServices');
class Bookmark {
  async getBookmark(req, res) {
    const userId = req.user._id;
    let myBookmark = await bookmarkService.getAllBookmark(userId);
    let recipes = [];
    for (let i = 0; i < myBookmark.bookmark.length; i++) {
      let item = myBookmark.bookmark[i];
      let recipe = await recipeService.getRecipeById(item.recipeId);
      recipes.push(recipe);
    }

    console.log(recipes);
    res.render('recipes/views/recipes.hbs', { recipes });
  }

  async addBookmark(req, res) {
    const recipeId = req.body.recipeId;
    const userId = req.user._id;

    const bookmarkItem = await bookmarkService.findBookmark(userId, recipeId); //đoạn này có thể bỏ
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
  async removeBookmark(req, res) {
    const recipeId = req.body.recipeId;
    const userId = req.user._id;
    const removeBookmark = await bookmarkModel.findOneAndUpdate(
      { userId: new moongoose.Types.ObjectId(userId) },
      {
        $pull: {
          bookmark: { recipeId: new moongoose.Types.ObjectId(recipeId) },
        },
      }
    );
    res.status(200).json({ message: 'Recipe removed from bookmarks' });
  }
}
module.exports = new Bookmark();
