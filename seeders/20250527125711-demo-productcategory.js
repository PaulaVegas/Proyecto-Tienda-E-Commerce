'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('ProductCategories', [
            // Camiseta básica -> Ropa (3) y Ofertas (6)
            {
                ProductId: 1,
                CategoryId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ProductId: 1,
                CategoryId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Zapatillas deportivas -> Deportes (4)
            {
                ProductId: 2,
                CategoryId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // El nombre del viento -> Libros (1)
            {
                ProductId: 3,
                CategoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Sapiens: De animales a dioses -> Libros (1)
            {
                ProductId: 4,
                CategoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Smartphone XYZ -> Tecnología (2) y Ofertas (6)
            {
                ProductId: 5,
                CategoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ProductId: 5,
                CategoryId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Auriculares Bluetooth ABC -> Tecnología (2)
            {
                ProductId: 6,
                CategoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ProductCategories', null, {});
    },
};
