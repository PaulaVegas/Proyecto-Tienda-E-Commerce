'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Products', [
            {
                name: 'Camiseta básica',
                price: 12.99,
                description: 'Camiseta de algodón 100% en varios colores.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Zapatillas deportivas',
                price: 59.9,
                description: 'Zapatillas para correr con suela amortiguada.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'El nombre del viento',
                price: 18.95,
                description:
                    'Primera entrega de la trilogía "Crónica del asesino de reyes" de Patrick Rothfuss.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Sapiens: De animales a dioses',
                price: 22.5,
                description:
                    'Ensayo de Yuval Noah Harari que repasa la historia de la humanidad desde la prehistoria hasta la actualidad.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Smartphone XYZ',
                price: 399.99,
                description:
                    'Teléfono inteligente con pantalla OLED de 6.5 pulgadas y cámara de 48MP.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Auriculares Bluetooth ABC',
                price: 79.9,
                description:
                    'Auriculares inalámbricos con cancelación de ruido y batería de larga duración.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Products', null, {});
    },
};
