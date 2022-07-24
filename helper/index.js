'use strict'

const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

const verifyPassword = (input, dataPassword) => {
    return bcrypt.compareSync(input, dataPassword)
}

module.exports = {
    hashPassword,
    verifyPassword
}