const { Product, Category, ProductCategory } = require('../models/index.js');
const { Op } = require('sequelize');

const ProductController = {
    createProduct(req, res) {
        Product.create(req.body)
            .then(Product => {
                Product.addCategory(req.body.CategoryId);
                res.send(Product);
            })
            .catch(err => console.error(err));
    },

    async getAll(req, res) {
        try {
            const products = await Product.findAll({
                include: [{ model: Category, through: { attributes: [] } }],
            });
            res.send(products);
        } catch (error) {
            console.error(error);
        }
    },

    async delete(req, res) {
        try {
            await Product.destroy({
                where: { id: req.params.id },
            });
            await ProductCategory.destroy({
                where: { ProductId: req.params.id },
            });
            res.send({ message: 'El producto ha sido eliminado' });
        } catch (error) {
            console.log(error);
        }
    },

    async update(req, res) {
        try {
            await Product.update(req.body, {
                where: { id: req.params.id },
            });
            const Product = await product.findByPk(req.params.id);
            Product.setCategories(req.body.CategoryId);
            res.send('Producto actualizado con éxito');
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'no ha sido posible actualizar el producto',
            });
        }
    },

    async getById(req, res) {
        try {
            const Product = await Product.findByPk(req.params.id, {
                include: {
                    model: Category,
                    as: 'Category',
                },
            });

            if (!Product) {
                return res
                    .status(404)
                    .send({ message: 'Producto no encontrado' });
            }

            res.json(Product);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al buscar el producto' });
        }
    },
    async searchProductByName(req, res) {
        try {
            const { name } = req.params;
            const products = await Product.findAll({
                where: { name: { [Op.like]: `%${name}%` } },
                include: {
                    model: Category,
                    as: 'Category',
                },
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async searchProductByPrice(req, res) {
        try {
            const { price } = req.params;
            const products = await Product.findAll({
                where: { price },
                include: {
                    model: Category,
                    as: 'Category',
                },
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ProductController;
