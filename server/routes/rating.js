const { authenticateUser } = require('../services/authenticateUser');
const express = require('express');
const router = express.Router();
const { validateRating } = require('../services/validationChain');
const { createRating } = require('../services/ratingFunctions');

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

router.post(
  '/rating/recs/:id',
  authenticateUser,
  validateRating,
  asyncHandler(async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = req.currentUser;
    await createRating(id, user, body);
    res.status(204).end();
  })
);

router.put('/rating/recs/:id', (req, res) => {});

module.exports = router;
