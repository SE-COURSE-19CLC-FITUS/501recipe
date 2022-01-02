'use strict';

const recipeService = require('./recipeServices');
const mongoose = require('mongoose');

class SubmitRecipe {
  show(req, res, next) {
    res.render('recipes/views/submitRecipe');
  }
  async submit(req, res, next) {
    const { _id: userId, username } = req.user;
    const content = req.body;

    let ingredients;
    if (typeof content.ingredients === 'string') {
      ingredients = [{ text: content.ingredients }];
    } else {
      ingredients = content.ingredients.map(ingredient => ({
        text: ingredient,
      }));
    }
    let steps;
    if (typeof content.steps === 'string') {
      steps = [{ text: content.steps }];
    } else {
      steps = content.steps.map(step => ({ text: step }));
    }
    let tips;
    if (typeof content.tips === 'string') {
      tips = [{ text: content.tips }];
    } else {
      tips = content.tips.map(tip => ({ text: tip }));
    }
    const recipe = {
      _id: new mongoose.Types.ObjectId(),
      datePublish: new Date(),
      ingredients: ingredients,
      instructions: steps,
      levelSkill: content.skill,
      mealType: content.mealType,
      publisher: { id: userId, username },
			rating: 0,
      servings: content.servings,
      tags: content.tags.split(',').map(tag => ({
        text: tag,
      })),
      timeCook: content.cookTime,
      tips: tips,
      title: content.title,
    };
    const result = await recipeService.saveRecipe(recipe);
    if (result) {
      res.status(200).json({ message: 'Thêm thành công', success: true });
    } else {
      res.status(500).json({ message: 'Thêm thất bại', success: false });
    }
  }
}

module.exports = new SubmitRecipe();
