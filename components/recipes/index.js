var express = require('express');
var router = express.Router();
const productController = require('./productController')


router.get('/', productController.listRecipe);
router.get('/recipe?page=', productController.category);
router.get('/recipe/:recipeID', productController.getProductBySlug);

module.exports = router;
