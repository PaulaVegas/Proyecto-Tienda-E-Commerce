'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const [products] = await queryInterface.sequelize.query(
            `SELECT id FROM Products;`
        );
        const [users] = await queryInterface.sequelize.query(
            `SELECT id FROM Users;`

        );
        if (users.length === 0) {
            throw new Error(
                'No hay usuarios disponibles para asociar a las reseñas.'
            );
        }

        const reviews = [];

        for (const product of products) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            reviews.push(
                {
                    content: 'Excelente producto, lo recomiendo mucho.',
                    rating: 5,
                    ProductId: product.id,
                    UserId: randomUser.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    content: 'Bueno, pero podría mejorar en algunos aspectos.',
                    rating: 3,
                    ProductId: product.id,
                    UserId: randomUser.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            );
        }

        await queryInterface.bulkInsert('Reviews', reviews, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Reviews', null, {});
    },
};
