'use strict';

const express = require('express');
const router = express.Router();
const bookmark = require('./bookmarkController');
router.get('/', bookmark.getBookmark);
router.post('/add', bookmark.addBookmark);
router.post('/remove', bookmark.removeBookmark);
module.exports = router;
