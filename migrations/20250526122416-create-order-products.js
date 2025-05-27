'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderProducts', {
            orderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Orders',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('OrderProducts');
    },
};
