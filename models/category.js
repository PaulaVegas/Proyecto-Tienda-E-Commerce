'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // Many-to-many con Product a través de ProductCategories
            Category.belongsToMany(models.Product, {
                through: 'ProductCategories',
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
