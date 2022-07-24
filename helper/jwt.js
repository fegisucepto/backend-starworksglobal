"use strict";

const jwt = require("jsonwebtoken");
const KEY = process.env.KEY;

const addToken = (data) => {
  return jwt.sign(data, KEY);
};

const readPayload = (token) => {
  return jwt.verify(token, KEY);
};

module.exports = {
  addToken,
  readPayload,
};
