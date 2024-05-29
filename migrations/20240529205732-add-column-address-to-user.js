'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Address can't be null" },
        notEmpty: { msg: "Address can't be empty" },
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
