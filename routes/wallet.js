'use strict';
const WalletController = require('../controllers/walletcontroller');
const express = require('express');
const router = express.Router();

router.get('/', WalletController.walletbalance);
router.post('/topup', WalletController.wallet);
router.post('/topup/:id', WalletController.topupwallet);
router.get('/:id', WalletController.balanceDetail);

module.exports = router;
