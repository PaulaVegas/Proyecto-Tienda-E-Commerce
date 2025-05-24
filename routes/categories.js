const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.create);
router.put('/id/:id', CategoryController.update);

module.exports = router;
