const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');

router.post('/register', Controller.registrasi);
router.post('/login', Controller.login);

router.use(authentication);
router.use('/wallet', require('./wallet.js'));

module.exports = router;
