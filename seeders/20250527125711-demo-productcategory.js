'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('ProductCategories', [
            // Camiseta básica -> Ropa (3) y Ofertas (6)
            {
                ProductId: 1,
                CategoryId: 3, // Ropa  en mi pc es 6, en tu pc puede ser 3
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ProductId: 1,
                CategoryId: 6, // Ofertas (6) en mi pc es 9, en tu pc puede ser 6
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Zapatillas deportivas -> Deportes (4)
            {
                ProductId: 2,
                CategoryId: 4, // Deportes (4) en mi pc es 7, en tu pc puede ser 4
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // El nombre del viento -> Libros (1)
            {
                ProductId: 3,
                CategoryId: 1, // Libros (1) en mi pc es 4, en tu pc puede ser 1
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Sapiens: De animales a dioses -> Libros (1)
            {
                ProductId: 4,
                CategoryId: 1, // Libros (1) en mi pc es 4, en tu pc puede ser 1
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Smartphone XYZ -> Tecnología (2) y Ofertas (6)
            {
                ProductId: 5,
                CategoryId: 2, // Tecnología (2) en mi pc es 5, en tu pc puede ser 2
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ProductId: 5,
                CategoryId: 6, // Ofertas (6) en mi pc es 9, en tu pc puede ser 6
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            // Auriculares Bluetooth ABC -> Tecnología (2)
            {
                ProductId: 6,
                CategoryId: 2, // Tecnología (2) en mi pc es 5, en tu pc puede ser 2
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ProductCategories', null, {});
    },
};

// Ojo! si ya tenías productos y categorías creadas, debes revisar los IDs de las categorías y productos en tu base de datos para que coincidan con los que se están insertando aquí. Los IDs pueden variar dependiendo del orden en que se hayan creado las categorías y productos. Asegúrate de ajustar los IDs en el código según sea necesario.
