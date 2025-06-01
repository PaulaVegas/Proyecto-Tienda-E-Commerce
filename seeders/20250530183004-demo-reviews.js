'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.bulkDelete('Reviews', null, {});

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
                const randomUser =
                    users[Math.floor(Math.random() * users.length)];

                reviews.push({
                    content: 'Reseña generada automáticamente',
                    rating: Math.floor(Math.random() * 5) + 1,
                    UserId: randomUser.id,
                    ProductId: product.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }

            // También puedes añadir reseñas fijas si lo deseas:
            reviews.push(
                {
                    content: 'Excelente camiseta, muy cómoda y fresca.',
                    rating: 5,
                    UserId: 1,
                    ProductId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    content: 'Las zapatillas son buenas pero algo rígidas.',
                    rating: 3,
                    UserId: 2,
                    ProductId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                // Puedes agregar más si lo deseas
            );

            await queryInterface.bulkInsert('Reviews', reviews);
        } catch (error) {
            console.error('Error en bulkInsert Reviews:', error);
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Reviews', null, {});
    },
};
