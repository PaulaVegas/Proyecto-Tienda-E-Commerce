'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Un usuario tiene muchos pedidos (Orders)
            User.hasMany(models.Order, {
                foreignKey: 'UserId',
                as: 'orders',
            });

            // Un usuario puede tener muchos tokens (por ejemplo, para sesiones)
            User.hasMany(models.Token, {
                foreignKey: 'UserId',
                as: 'tokens',
            });
            User.hasMany(models.Review, { foreignKey: 'UserId' });
        }
    }

    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
