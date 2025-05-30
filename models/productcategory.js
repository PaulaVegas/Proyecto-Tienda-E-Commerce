'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategory extends Model {
        static associate(models) {
            models.Product.belongsToMany(models.Category, {
                through: 'ProductCategory',
                foreignKey: 'ProductId',
                otherKey: 'CategoryId',
            });
            models.Category.belongsToMany(models.Product, {
                through: 'ProductCategory',
                foreignKey: 'CategoryId',
                otherKey: 'ProductId',
            });
        }
    }
    ProductCategory.init(
        {
            ProductId: DataTypes.INTEGER,
            CategoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'ProductCategory',
        }
    );
    return ProductCategory;
};
