'use strict';

const { User } = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'buyer',
        validate: {
          isIn: { args: [['buyer', 'seller']], msg: 'Role must be buyer or seller' },
          notNull: { msg: "Role can't be null" },
          notEmpty: { msg: "Role can't be empty" },
        }
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Firstname can't be null" },
          notEmpty: { msg: "Firstname can't be empty" },
        }
      },
      lastname: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email can't be null" },
          notEmpty: { msg: "Email can't be empty" },
          isEmail: { msg: "Email must be valid" },
          checkEmail: (value) => {
            const isEmailExist = User.findOne({ where: { email: value } })
            if (isEmailExist) throw new Error("Email already exist")
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password can't be null" },
          notEmpty: { msg: "Password can't be empty" },
          checkPassword: (value) => {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/
            if (!passwordRegex.test(value)) throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
          }
        }
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone number can't be null" },
          notEmpty: { msg: "Phone number can't be empty" },
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};