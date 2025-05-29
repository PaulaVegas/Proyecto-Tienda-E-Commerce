'use strict';

const bcrypt = require('bcryptjs'); // Opcional si quieres guardar passwords encriptadas

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                id: 1,
                username: 'juanperez',
                email: 'juan.perez@example.com',
                password: bcrypt.hashSync('password123', 10), // Encriptar password si tienes ese campo
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                username: 'ana_lopez',
                email: 'ana.lopez@example.com',
                password: bcrypt.hashSync('securepass', 10),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
