'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "phone_number", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone number cannot be empty" },
        notNull: { msg: "Phone number cannot be null" }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
