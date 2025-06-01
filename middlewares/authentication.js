const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ message: 'Token no proporcionado' });
        }

        // Si el token viene en formato "Bearer <token>"
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        const payload = jwt.verify(token, jwt_secret);

        const user = await User.findByPk(payload.id);
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const tokenFound = await Token.findOne({
            where: { [Op.and]: [{ UserId: user.id }, { token }] },
        });

        if (!tokenFound) {
            return res.status(401).send({ message: 'No estás autorizado' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Error de autenticación:', error.message);
        res.status(401).send({
            message: 'Ha habido un problema con el token',
        });
    }
};
