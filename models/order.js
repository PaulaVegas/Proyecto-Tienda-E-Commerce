'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // Muchos a muchos con Product a través de OrderProducts
            Order.belongsToMany(models.Product, {
                through: 'OrderProducts',
                foreignKey: 'OrderId',
                otherKey: 'ProductId',
                as: 'products',
            });

            // Muchos a uno con User (un usuario tiene muchos pedidos)
            Order.belongsTo(models.User, {
                foreignKey: 'UserId',
                as: 'user',
            });
        }
    }

    Order.init(
        {
            total: DataTypes.DECIMAL,
            status: DataTypes.STRING,
            // otros campos que tenga tu tabla de ordenes
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );

    return Order;
};
