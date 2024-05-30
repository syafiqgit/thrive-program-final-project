'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      store_id: {
        type: Sequelize.UUID,
        field: 'store_id',
        allowNull: false,
        validate: {
          notNull: { msg: "Store can't be null" },
          notEmpty: { msg: "Store can't be empty" },
        }
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Product name can't be null" },
          notEmpty: { msg: "Product name can't be empty" },
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description can't be null" },
          notEmpty: { msg: "Description can't be empty" },
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Quantity can't be null" },
          notEmpty: { msg: "Quantity can't be empty" },
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
    await queryInterface.dropTable('Products');
  }
};