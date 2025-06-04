'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.belongsToMany(models.Product, {
                through: 'ProductCategory',
                foreignKey: 'CategoryId',
                otherKey: 'ProductId',
                as: 'products',
            });
        }
    }

    Category.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Category',
        }
    );

    return Category;
};
