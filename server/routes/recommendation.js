const express = require('express');
const router = express.Router();
const { validateRecommendation } = require('../services/validationChain');

// GET /recs status: 200 - Returns a list of recommendations (including the user that owns each recommendation)
router.get('/recs', (req, res) => {});

//GET /recs/:id  status: 200 - Returns a recommendation (including the user that owns the recommendation) for the provided recommendation ID
router.get('recs/:id', (req, res) => {});

//POST /recs status: 201 - Creates a recommendation, sets the Location header to the URI for the recommendation, and returns no content
router.post('/recs', (req, res) => {});
//PUT /recs/:id status: 204 - Updates a recommendation if the user owns it, and returns no content
router.put('/recs/:id', (req, res) => {});
//DELETE - recs/:id status: 204 - deletes a recommendation. Careful, this can not be undone. Deletes a recommendation and returns no content
module.exports = router;
