'use strict';

const mongoose = require('mongoose');
const bookmarkModel = require('./bookmarkModel');
const bookmarkService = require('./bookmarkService');
const recipeService = require('../recipes/recipeServices');
class Bookmark {
  async getBookmark(req, res) {
    const userId = req.user._id;
    const myBookmark = await bookmarkService.getAllBookmark(userId);
    //console.log('myBookmark', myBookmark);
    let recipes = [];
    if (myBookmark) {
      for (let i = 0; i < myBookmark.bookmark.length; i++) {
        let item = myBookmark.bookmark[i];
        let recipe = await recipeService.getRecipeById(item.recipeId);
        recipes.push(recipe);
      }
    }

    res.render('recipes/views/recipes.hbs', { recipes });
  }

  async addBookmark(req, res) {
    const { recipeId } = req.body;
    const userId = req.user._id;

    const bookmarkItem = await bookmarkService.findBookmark(userId, recipeId); // đoạn này có thể bỏ
    if (bookmarkItem.length !== 0) {
      return res.status(400).json({ message: 'Recipe already in bookmarks' });
    }
    const bookmark = await bookmarkModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!bookmark) {
      const newBookmark = new bookmarkModel({
        userId: new mongoose.Types.ObjectId(userId),
        bookmark: [{ recipeId: new mongoose.Types.ObjectId(recipeId) }],
      });

      await newBookmark.save();
    } else {
      const addBookmark = await bookmarkModel.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(userId) },
        {
          $push: {
            bookmark: { recipeId: new mongoose.Types.ObjectId(recipeId) },
          },
        }
      );
    }

    res.status(200).json({ message: 'Recipe added to bookmarks' });
  }
  async removeBookmark(req, res) {
    const { recipeId } = req.body;
    const userId = req.user._id;
    const removeBookmark = await bookmarkModel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      {
        $pull: {
          bookmark: { recipeId: new mongoose.Types.ObjectId(recipeId) },
        },
      }
    );
    res.status(200).json({ message: 'Recipe removed from bookmarks' });
  }
}
module.exports = new Bookmark();
