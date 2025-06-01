const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Token } = require('../models'); // Ajusta la ruta según tu estructura

const JWT_SECRET = 'tu_secreto_muy_seguro'; // Cambia esto a un secreto real y seguro

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Validar contraseña
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear payload para JWT
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        // Generar token con expiración de 1 hora
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // Guardar token en la base de datos
        await Token.create({
            token,
            UserId: user.id,
        });

        // Devolver token al cliente
        res.json({ token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
