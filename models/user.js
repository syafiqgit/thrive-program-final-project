'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../utils/password');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Store, { foreignKey: "user_id" })
      User.hasMany(models.Transaction, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" })
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
      defaultValue: "buyer",
      validate: {
        notEmpty: { msg: "Firstname cannot be empty" },
        notNull: { msg: "Firstname cannot be null" },
        isIn: [["buyer", "seller"]]
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Firstname cannot be empty" },
        notNull: { msg: "Firstname cannot be null" }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Email cannot be empty" },
        notNull: { msg: "Email cannot be null" },
        isEmail: { msg: "Email is not valid" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty" },
        notNull: { msg: "Password cannot be null" }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Address cannot be empty" },
        notNull: { msg: "Address cannot be null" }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone number cannot be empty" },
        notNull: { msg: "Phone number cannot be null" }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    const checkEmail = await User.findOne({ where: { email: user.email } })
    if (checkEmail) throw new Error("Email already exists")
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    if (!regexPassword.test(user.password)) throw new Error("Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character")
    user.password = await hashingPassword(user.password)
  })
  return User;
};