'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsToMany(models.Product, {
                through: 'OrderProducts',
                foreignKey: 'OrderId',
                otherKey: 'ProductId',
                as: 'products',
            });
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
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );

    return Order;
};
