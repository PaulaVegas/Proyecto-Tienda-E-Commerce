'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Relación many-to-many con Category mediante ProductCategories
            Product.belongsToMany(models.Category, {
                through: 'ProductCategory',
                foreignKey: 'ProductId',
                otherKey: 'CategoryId',
                as: 'categories', // alias opcional
            });

            // Relación many-to-many con Order mediante OrderProducts
            Product.belongsToMany(models.Order, {
                through: 'OrderProducts',
                foreignKey: 'ProductId',
                otherKey: 'OrderId',
                as: 'orders',
            });

            // Relación one-to-many con Review
            Product.hasMany(models.Review, {
                foreignKey: 'ProductId',
                as: 'reviews',
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
