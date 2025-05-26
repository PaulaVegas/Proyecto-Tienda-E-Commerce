'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Define associations aquí
         */
        static associate(models) {
            // Relación muchos a muchos con Product a través de OrderProducts
            Order.belongsToMany(models.Product, {
                through: 'OrderProducts', // tabla intermedia
                foreignKey: 'orderId',
                otherKey: 'productId',
                as: 'Products', // alias para incluir productos en los pedidos
            });
        }
    }

    Order.init(
        {
            customerName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );

    return Order;
};
