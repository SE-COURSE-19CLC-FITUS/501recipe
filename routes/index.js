var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/submit-recipe', function(req, res, next) {
  res.render('recipes/views/submitRecipe');
});

router.get('/blogs', function(req, res, next) {
  res.render('blogs/views/blogs');
});

router.get('/blogDetail', function(req, res, next) {
  res.render('blogs/views/blogDetail');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/login', function(req, res, next) {
  res.render('auth/views/login', {layout: false});
});

router.get('/register', function(req, res, next) {
  res.render('auth/views/register', {layout: false});
});

module.exports = router;
