const { User, Order, Token, Sequelize, Review } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
const { Op } = Sequelize;

const UserController = {
    create(req, res) {
        try {
            if (!req.body.password) {
                return res
                    .status(400)
                    .json({ message: 'Password es obligatorio' });
            }
            req.body.role = 'user';
            const passwordEncrypted = bcrypt.hashSync(req.body.password, 10);
            User.create({ ...req.body, password: passwordEncrypted })
                .then(user =>
                    res
                        .status(201)
                        .send({ message: 'Usuario creado con éxito', user })
                )
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Error creando usuario' });
                });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno' });
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Review,
                        as: 'reviews',
                        attributes: ['id', 'content', 'rating'],
                    },
                ],
            });
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Usuario no encontrado' });
            }

            await user.destroy();
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    },
    async update(req, res) {
        try {
            const id = req.params.id;
            const { username, email, password } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Usuario no encontrado' });
            }

            // Si envían password, cifrarlo
            if (password) {
                const bcrypt = require('bcryptjs');
                req.body.password = bcrypt.hashSync(password, 10);
            } else {
                delete req.body.password; // para evitar sobreescribir con undefined
            }
            await user.update({ username, email, password: req.body.password });

            res.json({ message: 'Usuario actualizado correctamente', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    },
    login(req, res) {
        User.findOne({
            where: { email: req.body.email },
        }).then(user => {
            if (!user) {
                return res
                    .status(400)
                    .send({ message: 'Usuario o contraseña incorrectos' });
            }
            const isMatch = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!isMatch) {
                return res
                    .status(400)
                    .send({ message: 'Usuario o contraseña incorrectos' });
            }
            const token = jwt.sign({ id: user.id }, jwt_secret);
            Token.create({ token, UserId: user.id });
            res.send({ message: 'Bienvenid@ ' + user.username, user, token });
        });
    },
    async logout(req, res) {
        try {
            console.log('Logout de usuario', req.user);
            if (!req.user) {
                return res
                    .status(401)
                    .json({ message: 'Usuario no encontrado' });
            }
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization },
                    ],
                },
            });
            res.send({ message: 'Desconectado con éxito' });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Hubo un problema al tratar de desconectarte',
            });
        }
    },
};

module.exports = UserController;
