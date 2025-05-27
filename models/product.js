'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsToMany(models.Category, {
                through: 'ProductCategory',
            });

            Product.belongsToMany(models.Order, {
                through: 'OrderProducts',
                foreignKey: 'productId',
                otherKey: 'orderId',
            });
        }
    }

    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.DECIMAL,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Product',
        }
    );

    return Product;
};
