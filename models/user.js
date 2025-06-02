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
            User.hasMany(models.Review, {
                foreignKey: 'UserId',
                as: 'reviews',
            });
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: 'Por favor introduce tu nombre' },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: 'Por favor introduce tu email' },
                    isEmail: { message: 'Por favor introduce un email válido' },
                },
            },
            password: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
