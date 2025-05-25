const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/search/name/:name', ProductController.searchProductByName);
router.get('/search/price/:price', ProductController.searchProductByPrice);

module.exports = router;