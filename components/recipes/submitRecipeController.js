const recipeService = require('./recipeServices');
const mongoose = require('mongoose');

class submitRecipe {
  show(req, res, next) {
    res.render('recipes/views/submitRecipe');
  }
  async submit(req, res, next) {
    const user = req.user;
    if (user) {
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
      const recipe = {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(user._id),
        title: content.title,
        description: content.description,
        content: content.content,
        image: content.fileUpload,
        ingredients: ingredients,
        instructions: steps,
        servings: content.servings,
        timeCook: `${
          parseInt(content.preTime) + parseInt(content.cookTime)
        } phút`,
        tags: content.tags.split(',').map(tag => ({
          text: tag,
        })),
        levelSkill: content.skill,
        mealType: content.mealType,
        datePublish: new Date().toLocaleDateString('en-US'),
      };
      const result = await recipeService.saveRecipe(recipe);
      if (result) {
        res.status(200).json({ message: 'Thêm thành công', success: true });
      } else {
        res.status(500).json({ message: 'Thêm thất bại', success: false });
      }
    } else {
      res.status(501).json({ message: 'Bạn chưa đăng nhập', success: false });
    }
  }
}

module.exports = new submitRecipe();
