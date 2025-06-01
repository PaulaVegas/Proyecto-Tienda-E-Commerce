'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order, {
                foreignKey: 'UserId',
                as: 'orders',
            });
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
                    notNull: { msg: 'Por favor introduce tu nombre' },
                    notEmpty: { msg: 'El nombre no puede estar vacío' },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: 'Por favor introduce tu email' },
                    isEmail: { msg: 'Por favor introduce un email válido' },
                    notEmpty: { msg: 'El email no puede estar vacío' },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'La contraseña es obligatoria' },
                    notEmpty: { msg: 'La contraseña no puede estar vacía' },
                },
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user',
                validate: {
                    isIn: {
                        args: [['user', 'admin']],
                        msg: 'El rol debe ser user o admin',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
