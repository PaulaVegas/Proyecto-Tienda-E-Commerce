const { User, Order, Token, Sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
const { Op } = Sequelize;

const UserController = {
    create(req, res) {
        req.body.role = 'user';
        const passwordEncrypted = bcrypt.hashSync(req.body.password, 10);
        User.create({ ...req.body, password: passwordEncrypted })
            .then(user =>
                res
                    .status(201)
                    .send({ message: 'Usuario creado con éxito', user })
            )
            .catch(err => console.error(err));
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
            res.send({ message: 'Bienvenid@ ' + user.name, user, token });
        });
    },
    async logout(req, res) {
        try {
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
                message: 'hubo un problema al tratar de desconectarte',
            });
        }
    },
};

module.exports = UserController;
