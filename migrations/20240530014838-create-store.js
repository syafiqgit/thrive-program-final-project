'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        validate: {
          notNull: { msg: "Owner id can't be null" },
          notEmpty: { msg: "Owner id can't be empty" },
        }
      },
      store_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Store name can't be null" },
          notEmpty: { msg: "Store name can't be empty" },
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
    await queryInterface.dropTable('Stores');
  }
};