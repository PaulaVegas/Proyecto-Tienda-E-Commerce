const { Category, Product, Sequelize } = require('../models/index.js');
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
    async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll({
                include: {
                    model: Product,
                    as: 'Products',
                },
            });
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error fetching categories',
                error: error.message,
            });
        }
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
            include: {
                model: Product,
                as: 'Products',
            },
        }).then(category => res.send(category));
    },
};
module.exports = CategoryController;
