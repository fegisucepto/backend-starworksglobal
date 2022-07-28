const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

router.post('/register', UserController.registrasi);
router.post('/login', UserController.login);

router.use(authentication);
router.use('/wallet', require('./wallet.js'));

module.exports = router;
