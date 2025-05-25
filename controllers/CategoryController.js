const { Category, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

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

    // Eliminar una categoría
    async delete(req, res) {
        await Category.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.send('La categoría ha sido eliminada con éxito');
    },

    // Devolver categoría con id
    // ***** Cuando estén todos los productos creados, deberá traer también los productos asociados
    async getById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res
                    .status(404)
                    .send({ message: 'Categoría no encontrada' });
            }
            res.send(category);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al buscar la categoría' });
        }
    },

    // Devolver categoría por nombre
    getOneByName(req, res) {
        Category.findOne({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`,
                },
            },
            // include: [Product], para cuando esté product creado
        }).then(category => res.send(category));
    },
};
module.exports = CategoryController;
