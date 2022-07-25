'use strict';
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.UserIdentity, { foreignKey: 'UserId' });
      // User.belongsToMany(models.Course, { through: 'User_Wallets' });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Required First Name',
          },
          is: {
            args: ['^[a-z]+$', 'i'],
            msg: 'Only letters allowed',
          },
          len: {
            args: [2, 20],
            msg: 'Minimum 2 and Maximum 20 characters required in firstName',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Required Last Name',
          },
          is: {
            args: ['^[a-z]+$', 'i'],
            msg: 'Only letters allowed',
          },
          len: {
            args: [2, 20],
            msg: 'Minimum 2 and Maximum 20 characters required in lastName',
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Date is Required',
          },
          maxDate(value) {
            if (new Date(value) > new Date()) {
              throw new Error("Can't exceed today");
            }
          },
        },
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Street Address is Required',
          },
          is: {
            args: [/^[a-zA-Z0-9 ]*$/],
            msg: 'Only letters allowed',
          },
          len: {
            args: [5, 40],
            msg: 'Minimum 5 and Maximum 40 characters required streetAddress',
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'City is Required',
          },
          is: {
            args: [/^[a-zA-Z0-9 ]*$/],
            msg: 'Only letters allowed',
          },
          len: {
            args: [2, 20],
            msg: 'Minimum 2 and Maximum 20 characters required city',
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Province is Required',
          },
        },
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Telephone is Required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email must be unique',
        },
        validate: {
          notNull: {
            msg: `Email is required`,
          },
          notEmpty: {
            msg: `Email is required`,
          },
          isEmail: {
            msg: `invalid email format`,
          },
          isUnique: (value, next) => {
            User.findAll({
              where: { email: value },
              attributes: ['id'],
            })
              .then((user) => {
                if (user.length != 0) next(new Error('Email address already in use!'));
                next();
              })
              .catch((err) => console.log(err));
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'username must be unique',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Username is Required',
          },
          isUnique: (value, next) => {
            User.findAll({
              where: { username: value },
              attributes: ['id'],
            })
              .then((user) => {
                if (user.length != 0) next(new Error('Username already in use!'));
                next();
              })
              .catch((err) => console.log(err));
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'password required',
          },
          notNull: {
            msg: 'password required',
          },
          len: {
            args: 8,
            msg: 'Password must be at least 8 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate(instance, options) {
          let kata = '';
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
          kata = instance.email.split('@')[1];
          kata = kata.split('.')[0];
        },
      },
    }
  );
  return User;
};
