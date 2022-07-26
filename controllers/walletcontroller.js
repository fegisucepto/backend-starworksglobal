const { Wallet } = require('../models');

class WalletController {
  static async walletbalance(req, res, next) {
    try {
      const walletList = await Wallet.findAll({});
      res.status(200).json({
        statusCode: 200,
        data: walletList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async topupwallet(req, res, next) {
    try {
      const { amount } = req.body;
      const wallet = await Wallet.findOne({
        where: {
          id: +req.params.id,
        },
      });
      let balance = amount + wallet.dataValues.balance;
      let data = { balance };
      const topupwallet = await Wallet.update(data, {
        where: {
          id: +req.params.id,
        },
      });
      if (topupwallet[0] === 0) {
        throw new Error('error not found');
      }
      res.status(201).json({
        statusCode: 201,
        message: 'This Successfully TopUp',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async walletpay(req, res, next) {
    try {
      const { amount } = req.body;
      const wallet = await Wallet.findOne({
        where: {
          id: +req.params.id,
        },
      });
      let balance = wallet.dataValues.balance - amount;
      let data = { balance };
      const walletpay = await Wallet.update(data, {
        where: {
          id: +req.params.id,
        },
      });
      if (walletpay[0] === 0) {
        throw new Error('error not found');
      }
      res.status(201).json({
        statusCode: 201,
        message: 'This Successfully pay',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async balanceDetail(req, res, next) {
    try {
      const wallet = await Wallet.findOne({
        where: {
          id: +req.params.id,
        },
      });
      if (wallet === null) {
        throw new Error('error not found');
      }

      res.status(200).json({
        statusCode: 200,
        message: 'This Wallet Has been Show',
        data: wallet.balance,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WalletController;
