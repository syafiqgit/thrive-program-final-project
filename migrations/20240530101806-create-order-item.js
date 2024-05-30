'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Quantity can't be null" },
          notEmpty: { msg: "Quantity can't be empty" },
        }
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Price can't be null" },
          notEmpty: { msg: "Price can't be empty" },
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
    await queryInterface.dropTable('orderItems');
  }
};