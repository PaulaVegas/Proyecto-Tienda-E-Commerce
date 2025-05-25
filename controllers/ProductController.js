const { Product, Category } = require('../models');
const { Op } = require('sequelize');

const ProductController = {
    async createProduct(req, res) {
        try {
            const { name, price, categoryIds } = req.body;
            const product = await Product.create({ name, price });

            if (categoryIds && categoryIds.length > 0) {
                await product.setCategories(categoryIds);
            }

            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateProduct(req, res) {
        try {
            const { name, price, categoryIds } = req.body;
            const product = await Product.findByPk(req.params.id);

            if (!product)
                return res.status(404).json({ error: 'Product not found' });

            await product.update({ name, price });

            if (categoryIds) {
                await product.setCategories(categoryIds); // corregido setCategories
            }

            res.json(product);
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

            if (name) where.name = { [Op.iLike]: `%${name}%` };
            if (price) where.price = price; // corregido price en vez de precio

            const products = await Product.findAll({
                where,
                include: {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
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

    async getProductById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
                },
            });

            if (!product)
                return res.status(404).json({ error: 'Product not found' });

            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async searchProductByName(req, res) {
        try {
            const { name } = req.params;
            const products = await Product.findAll({
                where: { name: { [Op.iLike]: `%${name}%` } },
                include: {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
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
                    as: 'categories',
                    through: { attributes: [] },
                },
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ProductController;
