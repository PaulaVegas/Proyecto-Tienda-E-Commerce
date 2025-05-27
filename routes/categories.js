const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.create); // Crear categoría
router.get('/', CategoryController.getAllCategories);
router.put('/:id', CategoryController.update); // Actualizar categoría
router.get('/:id', CategoryController.getById); // Mostrar categoría por Id
router.delete('/:id', CategoryController.delete); // Borrar categoría
router.get('/search/name/:name', CategoryController.getOneByName); // Buscar por nombre

module.exports = router;
