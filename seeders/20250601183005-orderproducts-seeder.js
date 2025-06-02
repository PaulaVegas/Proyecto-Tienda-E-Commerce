'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('OrderProducts', [
            {
                OrderId: 1,
                ProductId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                OrderId: 1,
                ProductId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                OrderId: 2,
                ProductId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('OrderProducts', null, {});
    },
};
