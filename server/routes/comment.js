const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../app');
const { validateComment } = require('../services/validationChain');
const asyncHanlder = require('../services/asyncErrorHanlder');
const {
  createComment,
  updateComment,
  deleteComment,
} = require('../services/commentFunctions');
const { verifyUser } = require('../services/commentFunctions');

// POST /rec/comment status: 201 - creating a new rating for a given recommendation
router.post(
  '/rec/:id/comment',
  authenticateUser,
  validateComment,
  asyncHanlder(async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = req.user;
    const comment = await createComment(id, body, user);
    if (comment) {
      res.status(201).end();
    } else {
      res.status(404).json({ error: '404 Not found' });
    }
  })
);

router.put(
  '/rec/:id/comment',
  authenticateUser,
  validateComment,
  asyncHanlder(async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = req.user;

    const authedUser = await verifyUser(id);

    if (authedUser.userid === user.id) {
      await updateComment(id, body);
      res.status(201).end();
    } else {
      res
        .status(403)
        .json({ message: 'You can not update comments you do not own' });
    }
  })
);

router.delete(
  '/rec/:id/comment',
  authenticateUser,
  asyncHanlder(async (req, res) => {
    const id = +req.params.id;
    const user = req.user;
    const authedUser = await verifyUser(id);
    console.log(authedUser);

    if (authedUser.userid === user.id) {
      await deleteComment(id);
      res.status(204).end();
    } else {
      res.status(403).json({
        message: 'You can not delete recommendations that you do not own',
      });
    }
  })
);

// GET /comment status 200 - gets all comments for a recommendation
// router.get('comment', async (req, res) => {});

module.exports = router;
