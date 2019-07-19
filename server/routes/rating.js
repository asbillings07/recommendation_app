const { authenticateUser } = require('../services/authenticateUser');
const express = require('express');
const router = express.Router();
const { validateRating } = require('../services/validationChain');
const {
  createRating,
  verifyUser,
  updateRating,
  deleteRating,
  getRatings,
} = require('../services/ratingFunctions');

// HOF try/catch error handling
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      if (err === 'SequelizeDatabaseError') {
        res.status(err.status).json({ error: err.message });
        console.log(err);
      } else {
        res.json({ error: err });
        console.log(err);
      }
    }
  };
}
// GET /rating status 200 - gets all ratings for user
router.get('/rating', authenticateUser, async (req, res) => {
  const userId = req.currentUser.id;
  const ratings = await getRatings(userId);
  res.status(200).json(ratings);
});
// POST /rating/recs/:id status: 204 - creating a new rating for a given recommendation
router.post(
  '/rating/recs/:id',
  authenticateUser,
  validateRating,
  asyncHandler(async (req, res) => {
    const body = req.body;
    const id = +req.params.id;
    const user = req.currentUser;
    await createRating(id, user, body);
    res.status(204).end();
  })
);
// PUT /rating/recs/:id - status: 204 - updates a rating for an existing recommendaion if the user owns the rating - returns no content.
router.put(
  '/rating/recs/:id',
  authenticateUser,
  validateRating,
  async (req, res) => {
    const body = req.body;
    const id = +req.params.id;
    const user = req.currentUser;
    const authedUser = await verifyUser(id);
    if (authedUser.userid === user.id) {
      await updateRating(id, body);
      res.status(204).end();
    } else {
      res.status(403).json({
        error: '403 Forbidden',
        message: 'You can not edit ratings or comments that you do not own',
      });
    }
  }
);
// DELETE /rating/recs/:id - status: 204 - deletes a rating for an existing recommendaion if the user owns the rating - returns no content.
router.delete('/rating/recs/:id', authenticateUser, async (req, res) => {
  const id = +req.params.id;
  const user = req.currentUser;
  const authedUser = await verifyUser(id);
  if (authedUser.userid === user.id) {
    await deleteRating(id);
    res.status(204).end();
  } else {
    res.status(403).json({
      error: '403 Forbidden',
      message: 'You can not delete ratings or comments that you do not own',
    });
  }
});

module.exports = router;
