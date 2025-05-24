const { Category } = require('../models/index.js');
const CategoryController = {
    // Crear una categoría
    create(req, res) {
        req.body.role = 'category';
        Category.create(req.body)
            .then(category =>
                res
                    .status(201)
                    .send({ message: 'Categoría creada con éxito', category })
            )
            .catch(err => console.error(err));
    },
};
module.exports = CategoryController;
