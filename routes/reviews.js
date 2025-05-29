const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.get('/', ReviewController.getAllReviews);
router.post('/', ReviewController.createReview);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;