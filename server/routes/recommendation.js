const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../services/authenticateUser');
const { validateRecommendation } = require('../services/validationChain');
const { Recommendation } = require('../models');
const {
  getAllRecs,
  createRec,
  updateRecs,
  deleteRecs,
  getRec,
  verifyUser,
} = require('../services/recommendationFunctions');
// middleware error hanlder
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      if (err === 'SequelizeDatabaseError') {
        res.status(err.status).json({ error: err.message });
      } else {
        res.json({ error: err });
      }
    }
  };
}
// GET /recs status: 200 - Returns a list of recommendations (including the user that owns each recommendation)
router.get(
  '/recs',
  asyncHandler(async (req, res) => {
    const recs = await getAllRecs();
    if (recs) {
      res.status(200).json(recs);
    } else {
      res.status(404).json({
        error: '404 Not Found',
        message: 'Recommendation not found at selected route',
      });
    }
  })
);

//GET /recs/:id  status: 200 - Returns a recommendation (including the user that owns the recommendation) for the provided recommendation ID
router.get(
  '/recs/:id',
  asyncHandler(async (req, res) => {
    const id = +req.params.id;
    const rec = await getRec(id);
    if (rec) {
      res.status(200).json(rec);
    } else {
      res.status(404).json({
        error: '404 Not Found',
        message: 'Recommendation not found at selected route',
      });
    }
  })
);

//POST /recs status: 201 - Creates a recommendation, sets the Location header to the URI for the recommendation, and returns no content
router.post(
  '/recs',
  authenticateUser,
  validateRecommendation,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const rec = req.body;
    const recs = await createRec(user, rec);
    if (recs) {
      res.status(201).json(recs);
    } else {
      res.status(404).json({
        error: '404 Not Found',
        message: 'Recommendation not found at selected route',
      });
    }
  })
);
//PUT /recs/:id status: 204 - Updates a recommendation if the user owns it, and returns no content
router.put(
  '/recs/:id',
  validateRecommendation,
  authenticateUser,
  asyncHandler(async (req, res) => {
    const id = +req.params.id;
    const user = req.currentUser;
    const rec = req.body;
    const authedUser = await verifyUser(id);
    if (authedUser.userid === user.id) {
      recommendation = await updateRecs(id, rec);
      res.status(204).json(recommendation);
    } else {
      res.status(403).json({
        message: 'You can not edit recommendations that you do not own.',
      });
    }
  })
);
//DELETE - recs/:id status: 204 - deletes a recommendation. Careful, this can not be undone. Deletes a recommendation and returns no content
router.delete(
  '/recs/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const id = +req.params.id;
    const user = req.currentUser;
    const authedUser = await verifyUser(id);
    if (authedUser.userid === user.id) {
      await deleteRecs(id);
      res.status(204).end();
    } else {
      res.status(403).json({
        message: 'You can not delete recommendations that you do not own.',
      });
    }
  })
);
module.exports = router;
