'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // Many-to-Many relationship with Product
            Category.belongsToMany(models.Product, {
                through: 'ProductCategory',
                as: 'products',
                foreignKey: 'CategoryId',
                otherKey: 'ProductId',
            });
        }
    }
    Category.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Category',
        }
    );
    return Category;
};
