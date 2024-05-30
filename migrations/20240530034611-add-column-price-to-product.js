'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('Products', 'price', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price can't be null" },
        notEmpty: { msg: "Price can't be empty" },
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
