const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
} = require('../services/categoryFunctions');
const { validateCategory } = require('../services/validationChain');
const asyncHanlder = require('../services/asyncErrorHanlder');

//GET /category 200 - Returns a list of categories (including the recommendations that belong to each category)
router.get(
  '/category',
  asyncHanlder(async (req, res) => {
    const category = await getCategories();
    res.status(200).json({ category });
  })
);
//GET /category/:id 200 - Returns a category (including the recommendations that belong to that category) for the provided category id
router.get(
  '/category/:id',
  asyncHanlder(async (req, res) => {
    const id = +req.params.id;
    if (id) {
      const category = await getCategory(id);
      res.status(200).json({ category });
    } else {
      res.status(404).json({
        error: '404 Not Fount',
        message: 'Category not found at selected route',
      });
    }
  })
);
//POST /category 201 - Creates a category, sets the Location header to the URI for the category, and returns no content
router.post(
  '/category',
  validateCategory,
  asyncHanlder(async (req, res) => {
    const category = req.body;
    await createCategory(category);
    res.status(201).end();
  })
);

module.exports = router;
