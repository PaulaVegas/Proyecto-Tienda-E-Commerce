const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.get('/', ProductController.getAll);
router.get('/search/name/:name', ProductController.searchProductByName);
router.get('/search/price/:price', ProductController.searchProductByPrice);
router.get('/order/price/desc', ProductController.orderByPriceDesc);
router.get('/:id', ProductController.getById);

module.exports = router;
