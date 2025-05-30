const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/', ReviewController.getAllReviews);
router.post('/', ReviewController.createReview);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', authentication, isAdmin, ReviewController.deleteReview);

module.exports = router;
