'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Relación many-to-many con Category mediante ProductCategories
            Product.belongsToMany(models.Category, {
                through: 'ProductCategories',
                foreignKey: 'ProductId',
                otherKey: 'CategoryId',
                as: 'categories', // alias para la relación, opcional pero recomendable
            });

            // Relación con Order a través de OrderProducts
            Product.belongsToMany(models.Order, {
                through: 'OrderProducts',
                foreignKey: 'ProductId',
                otherKey: 'OrderId',
                as: 'orders',
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
