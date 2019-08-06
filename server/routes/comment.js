const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../app');
const { validateComment } = require('../services/validationChain');
const asyncHanlder = require('../services/asyncErrorHanlder');
const {
  createComment,
  updateComment,
  deleteComment,
  getComment,
} = require('../services/commentFunctions');
const { verifyUser } = require('../services/ratingFunctions');

// POST /rec/comment status: 201 - creating a new rating for a given recommendation
router.post(
  '/rec/:id/comment',
  validateComment,
  authenticateUser,
  asyncHanlder(async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = req.user;
    const comment = createComment(id, body, user);
    res.status(200).json(comment);
  })
);

// GET /comment status 200 - gets all comments for a recommendation
// router.get('comment', async (req, res) => {});

module.exports = router;
