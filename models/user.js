'use strict';

const bcrypt = require("bcryptjs")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'buyer',
      validate: {
        isIn: { args: [['buyer', 'seller']], msg: 'Role must be buyer or seller' },
        notNull: { msg: "Role can't be null" },
        notEmpty: { msg: "Role can't be empty" },
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Firstname can't be null" },
        notEmpty: { msg: "Firstname can't be empty" },
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Email can't be null" },
        notEmpty: { msg: "Email can't be empty" },
        isEmail: { msg: "Email must be valid" },
        checkEmail: async (value) => {
          const isEmailExist = await User.findOne({ where: { email: value } })
          if (isEmailExist) throw new Error("Email already exist")
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password can't be null" },
        notEmpty: { msg: "Password can't be empty" },
        checkPassword: (value) => {
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/
          if (!passwordRegex.test(value)) throw new Error("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Phone number can't be null" },
        notEmpty: { msg: "Phone number can't be empty" },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  })

  return User;
};