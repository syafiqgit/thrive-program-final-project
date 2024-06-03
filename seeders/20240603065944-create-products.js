'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: "d71bf17d-98c7-4297-9b00-f0f8f02fc69c",
        store_id: "8d166fd1-2501-4116-85be-ba470e11d580",
        name: "Laptop Lenovo ThinkPad X1 Carbon",
        description: "Laptop Lenovo ThinkPad X1 Carbon dengan prosesor Intel Core i7, RAM 16GB, dan SSD 1TB.",
        stok: 18,
        price: 15000000
      },
      {
        id: "54a4abb0-76f0-4b34-a141-937afb0c28b5",
        store_id: "8d166fd1-2501-4116-85be-ba470e11d580",
        name: "PC Desktop Dell XPS",
        description: "PC Desktop Dell XPS dengan prosesor Intel Core i9, RAM 32GB, SSD 2TB, dan NVIDIA GeForce RTX 3080.",
        stok: 12,
        price: 25000000
      },
      {
        id: "69840282-fb46-48db-886a-8e88d45b2e48",
        store_id: "8d166fd1-2501-4116-85be-ba470e11d580",
        name: "Monitor Samsung Odyssey G9",
        description: "Monitor Samsung Odyssey G9 dengan resolusi super ultra-lebar 5120x1440, refresh rate 240Hz, dan HDR1000.",
        stok: 8,
        price: 20000000
      },
      {
        id: "0abad0dd-9b31-4208-a814-7556a58cc45d",
        store_id: "8d166fd1-2501-4116-85be-ba470e11d580",
        name: "Mouse Logitech G Pro Wireless",
        description: "Mouse Logitech G Pro Wireless dengan sensor HERO 25K dan konektivitas nirkabel LIGHTSPEED.",
        stok: 30,
        price: 1200000
      },
      {
        id: "f9bcd400-dbf1-4926-9bc3-e23d208a25fd",
        store_id: "8d166fd1-2501-4116-85be-ba470e11d580",
        name: "Mouse Logitech G502 HERO",
        description: "Mouse Logitech G502 HERO dengan sensor HERO 16K dan 11 tombol programable.",
        stok: 40,
        price: 700000
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
