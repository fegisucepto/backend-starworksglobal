"use strict";

const { readPayload } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalid Token" };
    }
    const payloadUser = readPayload(access_token);
    const { id } = payloadUser;
    const checkUser = await User.findByPk(id);

    if (checkUser) {
      req.loggedUser = {
        id: payloadUser.id,
        email: payloadUser.email,
      };
    }
    if (!checkUser) {
      throw { name: "Invalid Token" };
    }
    next();
  } catch (err) {
    const { name } = err;
    if (name === "invalid Token" || name === "JsonWebTokenError") {
      res.status(401).json({
        status: "failed",
        code: 401,
        message: "Access Token is Invalid",
      });
    } else {
      res.status(500).json({
        status: "Failed",
        code: 500,
        message: err,
      });
    }
  }
};

module.exports = authentication;
