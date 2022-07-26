'use strict';
const WalletController = require('../controllers/walletcontroller');
const express = require('express');
const router = express.Router();

router.get('/', WalletController.walletbalance);
router.post('/topup/:id', WalletController.topupwallet);
router.post('/pay/:id', WalletController.walletpay);
router.get('/:id', WalletController.balanceDetail);

module.exports = router;
