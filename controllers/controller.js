const { User,Wallet } = require('../models');
const { hashPassword, verifyPassword } = require('../helper/index');
const { addToken } = require('../helper/jwt');
// // import sjcl from 'sjcl'
// const jsSHA = require('jssha');
// const jsSHA = require('jssha/sha1');
// const jsSHA = require('jssha/dist/sha1');
const sha256 = require('crypto-js/sha256');

// const {sjcl} = require('sjcl')

class Controller {
  static async registrasi(req, res, next) {
    try {
      const { firstName, lastName, dateOfBirth, streetAddress, city, province, telephone, email, username, password } = req.body;
        
      const createUser = await User.create({
        firstName,
        lastName,
        dateOfBirth,
        streetAddress,
        city,
        province,
        telephone,
        email,
        username,
        password,
      });
      const walletId = (username + ':' + email);
      const UserId = createUser.id
      const hashcode = await Wallet.create({
        walletId,
        UserId,
      })
      res.status(200).json({
        statusCode: 200,
        data: {
          id: createUser.id,
          username: createUser.username,
          email: createUser.email,
          walletId: hashcode.walletId
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const checkUser = await User.findOne({
        where: { username },
      });
      if (!checkUser) {
        throw new Error('User not found');
      }
      const comparePassword = verifyPassword(password, checkUser.password);

      if (!comparePassword) {
        throw new Error('User not found');
      }

      const payloadUser = {
        id: checkUser.id,
        username: checkUser.username,
      };
      const tokenUser = addToken(payloadUser);
      res.status(200).json({
        statusCode: 200,
        data: {
          username: username,
          access_token: tokenUser,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
