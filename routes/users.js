const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.get('/', authentication, UserController.getAll);
router.put('/:id', authentication, UserController.update);
router.delete('/logout', authentication, UserController.logout);
router.delete('/:id', authentication, UserController.delete);

module.exports = router;
