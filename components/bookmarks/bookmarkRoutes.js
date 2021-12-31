'use strict';

const express = require('express');
const router = express.Router();
const bookmark = require('./bookmarkController');
router.post('/add', bookmark.addBookmark);
module.exports = router;
