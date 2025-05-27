'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsToMany(models.Product, {
                through: 'OrderProducts',
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
