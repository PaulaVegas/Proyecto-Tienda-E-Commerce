'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Orders', [
            {
                id: 1,
                UserId: 1,
                status: 'pending',
                total: 89.88,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                UserId: 2,
                status: 'completed',
                total: 59.9,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Orders', null, {});
    },
};
