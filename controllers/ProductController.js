const { Product, Category } = require('../models');
const { Op } = require('sequelize');

const ProductController = {
    async createProduct(req, res) {
        try {
            const { name, price, categoryId } = req.body;
            const product = await Product.create({ name, price, categoryId });

            const productWithCategory = await Product.findByPk(product.id, {
                include: {
                    model: Category,
                    as: 'Category',
                },
            });

            res.status(201).json(productWithCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateProduct(req, res) {
        try {
            const { name, price, categoryId } = req.body;
            const product = await Product.findByPk(req.params.id);

            if (!product)
                return res.status(404).json({ error: 'Product not found' });

            await product.update({ name, price });

            if (categoryId) {
                await product.update({ name, price, categoryId });
            }

            const productWithCategories = await Product.findByPk(product.id, {
                include: {
                    model: Category,
                    as: 'Category',
                },
            });

            res.json(productWithCategories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product)
                return res.status(404).json({ error: 'Product not found' });

            await product.destroy();
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllProducts(req, res) {
        try {
            const { name, price, sort } = req.query;
            const where = {};

            if (name) where.name = { [Op.like]: `%${name}%` };
            if (price) where.price = price;

            const products = await Product.findAll({
                where,
                include: {
                    model: Category,
                    as: 'Category',
                },
                order:
                    sort === 'desc'
                        ? [['price', 'DESC']]
                        : sort === 'asc'
                        ? [['price', 'ASC']]
                        : undefined,
            });

            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: {
                    model: Category,
                    as: 'Category',
                },
            });

            if (!product) {
                return res
                    .status(404)
                    .send({ message: 'Producto no encontrado' });
            }

            res.json(product);
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
