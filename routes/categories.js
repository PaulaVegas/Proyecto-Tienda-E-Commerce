const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.create); // Crear categoría
router.put('/id/:id', CategoryController.update); // Actualizar categoría
router.get('/id/:id', CategoryController.getById); // Mostrar categoría por Id
router.delete('/id/:id', CategoryController.delete); // Borrar categoría

module.exports = router;
