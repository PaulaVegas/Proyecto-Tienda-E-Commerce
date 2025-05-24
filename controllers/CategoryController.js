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

    // Actualizar una categoría
    async update(req, res) {
        await Category.update(
            { name: req.body.name, description: req.body.description },
            { where: { id: req.params.id } }
        );
        res.send('Categoría actualizada con éxito');
    },
};
module.exports = CategoryController;
