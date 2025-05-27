const express = require('express');
const router = express.Router();
const { Order, Product } = require('../models');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll({ model: Product, as: 'Products' });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { customerName, productIds } = req.body;

        const order = await Order.create({ customerName });

        if (productIds && productIds.length) {
            const products = await Product.findAll({
                where: { id: productIds },
            });
            await order.addProducts(products);
        }

        const result = await Order.findByPk(order.id, { model: Product, as: 'Products' });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
