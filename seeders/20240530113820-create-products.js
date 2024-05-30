'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        "product_id": "123e4567-e89b-12d3-a456-426655440000",
        "product_name": "Laptop",
        "description": "Powerful laptop with high performance",
        "quantity": 10,
        "price": 1200
      },
      {
        "product_id": "123e4567-e89b-12d3-a456-426655440001",
        "product_name": "Smartphone",
        "description": "Latest smartphone model with advanced features",
        "quantity": 20,
        "price": 800
      },
      {
        "product_id": "123e4567-e89b-12d3-a456-426655440002",
        "product_name": "Headphones",
        "description": "Wireless headphones with noise cancellation",
        "quantity": 30,
        "price": 150
      },
      {
        "product_id": "123e4567-e89b-12d3-a456-426655440003",
        "product_name": "Camera",
        "description": "Professional DSLR camera for photography enthusiasts",
        "quantity": 15,
        "price": 1000
      },
      {
        "product_id": "123e4567-e89b-12d3-a456-426655440004",
        "product_name": "Smartwatch",
        "description": "Fitness tracker with heart rate monitor",
        "quantity": 25,
        "price": 200
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  }
};
