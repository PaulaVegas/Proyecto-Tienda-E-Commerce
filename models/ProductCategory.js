'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define(
        'ProductCategory',
        {
            ProductId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            CategoryId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            timestamps: true,
            tableName: 'ProductCategory',
        }
    );
    return ProductCategory;
};
