const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.post('/', authentication, isAdmin, ProductController.createProduct);
router.put('/:id', authentication, isAdmin, ProductController.update);
router.delete('/:id', authentication, isAdmin, ProductController.delete);
router.get('/', ProductController.getAll);
router.get('/search/name/:name', ProductController.searchProductByName);
router.get('/search/price/:price', ProductController.searchProductByPrice);
router.get('/order/price/desc', ProductController.orderByPriceDesc);
router.get('/:id', ProductController.getById);
router.post('/addCategories', ProductController.addCategories);

module.exports = router;
