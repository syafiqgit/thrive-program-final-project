'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "User id cannot be empty" },
          notNull: { msg: "User id cannot be empty" }
        }
      },
      store_id: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Store id cannot be empty" },
          notNull: { msg: "Store id cannot be empty" }
        }
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product name cannot be empty" },
          notNull: { msg: "Product name cannot be empty" }
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "quantity cannot be empty" },
          notNull: { msg: "quantity cannot be empty" }
        }
      },
      total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: { msg: "total_price cannot be empty" },
          notNull: { msg: "total_price cannot be empty" }
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
    await queryInterface.dropTable('Transactions');
  }
};