'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

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
