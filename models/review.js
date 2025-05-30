'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
            Review.belongsTo(models.Product, { foreignKey: 'ProductId' });
        }
    }
    Review.init(
        {
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            UserId: DataTypes.INTEGER,
            ProductId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Review',
        }
    );
    return Review;
};
