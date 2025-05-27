const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { Order, Product } = require('../models');

router.get('/', OrderController.getOrdersWithProducts);
router.post('/', OrderController.createOrder);
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
