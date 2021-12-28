const recipeService = require('./recipeServices');
const mongoose = require('mongoose');

class submitRecipe {
  show(req, res, next) {
    res.render('recipes/views/submitRecipe');
  }
  async submit(req, res, next) {
    const content = req.body;
    const ingredients = content.ingredients.map(ingredient => ({
      text: ingredient,
    }));
    const step = content.steps.map(step => ({ text: step }));
    const recipe = {
      _id: new mongoose.Types.ObjectId(),
      title: content.title,
      description: content.description,
      content: content.content,
      image: content.fileUpload,
      ingredients: ingredients,
      instructions: step,
      servings: content.servings,
      timeCook: `${
        parseInt(content.preTime) + parseInt(content.cookTime)
      } phút`,
      tags: content.tags.split(',').map(tag => ({
        text: tag,
      })),
      levelSkill: content.skill,
      recipeType: content.recipeType,
      datePublish: new Date().toLocaleDateString('en-US'),
    };
    const result = await recipeService.saveRecipe(recipe);
  }
}

module.exports = new submitRecipe();
