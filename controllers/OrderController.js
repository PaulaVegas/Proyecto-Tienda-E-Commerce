const { Order, Product, User } = require('../models');

const OrderController = {
    async getOrdersWithProducts(req, res) {
        try {
            const orders = await Order.findAll({
                include: {
                    model: Product,
                    as: 'products',
                    through: { attributes: [] },
                },
            });
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al obtener los pedidos',
                error: error.message,
            });
            console.log(JSON.stringify(order, null, 2));
        }
    },

    async createOrder(req, res) {
        try {
            const { customerName, products } = req.body;

            const newOrder = await Order.create({
                customerName,
                UserId: req.user.id,
            });

            if (products && products.length > 0) {
                const productIds = products.map(p => p.productId);
                const foundProducts = await Product.findAll({
                    where: { id: productIds },
                });
                if (foundProducts.length !== productIds.length) {
                    return res
                        .status(400)
                        .json({ message: 'Algunos productos no existen' });
                }
                await newOrder.addProducts(foundProducts);
                console.log('Productos añadidos a la orden correctamente');
            }

            const orderWithProducts = await Order.findByPk(newOrder.id, {
                include: {
                    model: Product,
                    as: 'products',
                    through: { attributes: [] },
                },
            });

            res.status(201).json({
                message: 'Pedido creado con éxito',
                orderWithProducts,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al crear el pedido',
                error: error.message,
            });
        }
    },

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;

            const order = await Order.findByPk(orderId);

            if (!order) {
                return res.status(404).json({ message: 'Orden no encontrada' });
            }

            await order.setProducts([]);

            await order.destroy();

            res.json({ message: `Orden con id ${orderId} eliminada.` });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al eliminar el pedido',
                error: error.message,
            });
        }
    },
};

module.exports = OrderController;
