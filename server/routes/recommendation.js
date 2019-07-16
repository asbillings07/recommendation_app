const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../services/authenticateUser');
const { validateRecommendation } = require('../services/validationChain');
const {
  getAllRecs,
  createRec,
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
        console.log(err);
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
        message: 'Recommendations not found at selected route',
      });
    }
  })
);

//GET /recs/:id  status: 200 - Returns a recommendation (including the user that owns the recommendation) for the provided recommendation ID
router.get('recs/:id', (req, res) => {});

//POST /recs status: 201 - Creates a recommendation, sets the Location header to the URI for the recommendation, and returns no content
router.post(
  '/recs',
  authenticateUser,
  validateRecommendation,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const rec = req.body;
    const recs = await createRec(user, rec);
    res
      .location(`/recs/:${recs.id}`)
      .status(201)
      .json(recs);
  })
);
//PUT /recs/:id status: 204 - Updates a recommendation if the user owns it, and returns no content
router.put('/recs/:id', (req, res) => {});
//DELETE - recs/:id status: 204 - deletes a recommendation. Careful, this can not be undone. Deletes a recommendation and returns no content
module.exports = router;
