'use strict';

const express = require('express');
const router = express.Router();
const homeController = require('../components/home/homeController');

/* GET home page. */
router.get('/', homeController.index);

router.get('/blogs', function (req, res, next) {
  res.render('blogs/views/blogs');
});

router.get('/blogDetail', function (req, res, next) {
  res.render('blogs/views/blogDetail');
});

router.get('/contact', function (req, res, next) {
  res.render('contact');
});

module.exports = router;
