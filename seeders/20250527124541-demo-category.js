'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Categories', [
            {
                name: 'Libros',
                description: 'Categoría para libros y material de lectura.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Tecnología',
                description: 'Productos tecnológicos y gadgets.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Ropa',
                description: 'Prendas de vestir y accesorios de moda.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Deportes',
                description: 'Equipamiento y ropa deportiva.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Accesorios',
                description: 'Complementos y accesorios varios.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
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
