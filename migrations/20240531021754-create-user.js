'use strict';
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
        defaultValue: "buyer",
        validate: {
          notEmpty: { msg: "Firstname cannot be empty" },
          notNull: { msg: "Firstname cannot be null" },
          isIn: [["buyer", "seller"]]
        }
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Firstname cannot be empty" },
          notNull: { msg: "Firstname cannot be null" }
        }
      },
      lastname: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email cannot be empty" },
          notNull: { msg: "Email cannot be null" },
          isEmail: { msg: "Email is not valid" }

        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password cannot be empty" },
          notNull: { msg: "Password cannot be null" }
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Address cannot be empty" },
          notNull: { msg: "Address cannot be null" },
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