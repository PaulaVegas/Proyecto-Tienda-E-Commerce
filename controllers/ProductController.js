const {
    Product,
    Category,
    ProductCategory,
    Review,
    User,
} = require('../models/index.js');
const { Op } = require('sequelize');

const ProductController = {
    createProduct: async (req, res) => {
        try {
            const { name, price, description, CategoryIds } = req.body;
            const imagePath = req.file ? req.file.path : null;
            if (!name || price === undefined || !description) {
                return res.status(400).json({
                    message:
                        'Error: Debes rellenar todos los campos obligatorios: name, price y description.',
                });
            }

            if (typeof price !== 'number' || price < 0) {
                return res.status(400).json({
                    message:
                        'Error: El campo price debe ser un número positivo.',
                });
            }

            const newProduct = await Product.create({
                ...req.body,
                image: imagePath,
            });

            if (CategoryIds && CategoryIds.length > 0) {
                const categories = await Category.findAll({
                    where: { id: CategoryIds },
                });

                await newProduct.addCategories(categories);
            }

            const productWithCategories = await Product.findByPk(
                newProduct.id,
                {
                    include: Category,
                    through: { attributes: [] },
                }
            );

            res.status(201).json({
                message: 'Producto creado',
                productWithCategories,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al crear el producto',
                error: error.message,
            });
        }
    },

    async getAll(req, res) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        as: 'categories',
                        through: { attributes: [] },
                    },
                    {
                        model: Review,
                        as: 'reviews',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'username', 'email'],
                            },
                        ],
                    },
                ],
            });
            console.log(JSON.stringify(products, null, 2));
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al obtener los productos',
                error: error.message,
            });
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
            res.status(500).send({ message: 'Error al eliminar el producto' });
        }
    },

    async update(req, res) {
        console.log('req.body:', req.body);
        try {
            const productId = req.params.id;
            const { name, price, description, CategoryIds } = req.body;

            const product = await Product.findByPk(productId);
            if (!product) {
                return res
                    .status(404)
                    .send({ message: 'Producto no encontrado' });
            }

            const imagePath = req.file ? req.file.path : product.image;

            // Validar y parsear price a número
            const priceNum = parseFloat(price);
            if (isNaN(priceNum) || priceNum < 0) {
                return res.status(400).json({
                    message: 'El campo price debe ser un número positivo',
                });
            }

            // Actualizar el producto
            await Product.update(
                { name, price: priceNum, description, image: imagePath },
                { where: { id: productId } }
            );

            // Manejar categorías solo si CategoryIds está definido
            if (CategoryIds) {
                let categoryIdsArray;
                try {
                    categoryIdsArray = Array.isArray(CategoryIds)
                        ? CategoryIds
                        : JSON.parse(CategoryIds);
                } catch {
                    return res.status(400).json({
                        message: 'CategoryIds debe ser un array JSON válido',
                    });
                }

                if (Array.isArray(categoryIdsArray)) {
                    const categories = await Category.findAll({
                        where: { id: categoryIdsArray },
                    });
                    await product.setCategories(categories);
                } else {
                    return res
                        .status(400)
                        .json({ message: 'CategoryIds debe ser un array' });
                }
            }

            // Traer el producto actualizado para enviar como respuesta
            const updatedProduct = await Product.findByPk(productId, {
                include: {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
                },
            });

            res.json({
                message: 'Producto actualizado con éxito',
                product: updatedProduct,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'No ha sido posible actualizar el producto',
                error: error.message,
            });
        }
    },

    async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [
                    {
                        model: Category,
                        as: 'categories',
                        through: { attributes: [] },
                    },
                    {
                        model: Review,
                        as: 'reviews',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'username', 'email'],
                            },
                        ],
                    },
                ],
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
                    through: { attributes: [] },
                },
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async orderByPriceDesc(req, res) {
        try {
            const products = await Product.findAll({
                order: [['price', 'DESC']],
                include: {
                    model: Category,
                    through: { attributes: [] },
                },
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async addCategories(req, res) {
        try {
            const { productId, categoryIds } = req.body;
            const product = await Product.findByPk(productId);
            if (!product)
                return res
                    .status(404)
                    .json({ message: 'Producto no encontrado' });
            const categories = await Category.findAll({
                where: {
                    id: categoryIds,
                },
            });
            if (categories.length !== categoryIds.length) {
                return res.status(400).json({
                    message: 'Algunas categorías no fueron encontradas',
                });
            }
            await product.addCategories(categories);
            res.status(200).json({
                message: 'Categorías añadidas al producto correctamente',
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ProductController;
