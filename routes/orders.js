const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { Order, Product } = require('../models');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.get('/', OrderController.getOrdersWithProducts);
router.post('/', authentication, OrderController.createOrder);
router.delete('/:id', authentication, isAdmin, OrderController.deleteOrder);

module.exports = router;
