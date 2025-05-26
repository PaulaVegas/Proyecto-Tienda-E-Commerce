'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Un producto pertenece a una categoría
            Product.belongsToMany(models.Category, {
               through: models.ProductCategory
            });

            // Un producto puede estar en muchos pedidos
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
            categoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Product',
        }
    );

    return Product;
};
