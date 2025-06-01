'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Categories', [
            {
                id: 1,
                name: 'Libros',
                description: 'Categoría para libros y material de lectura.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Tecnología',
                description: 'Productos tecnológicos y gadgets.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'Ropa',
                description: 'Prendas de vestir y accesorios de moda.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'Deportes',
                description: 'Equipamiento y ropa deportiva.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: 'Accesorios',
                description: 'Complementos y accesorios varios.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                name: 'Ofertas',
                description:
                    'Productos con descuentos y promociones especiales.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Categories', null, {});
    },
};
