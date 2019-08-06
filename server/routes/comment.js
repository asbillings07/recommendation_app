const express = require('express');
const router = express.Router();
const asyncHanlder = require('../services/asyncErrorHanlder');
const {
  createComment,
  updateComment,
  deleteComment,
  getComment,
} = require('../services/commentFunctions');

router.get('comment', async (req, res) => {});
router.post('/rec/comment');

module.exports = router;
