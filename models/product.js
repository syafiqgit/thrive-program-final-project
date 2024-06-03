'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Store, { foreignKey: "store_id", onDelete: "CASCADE", onUpdate: "CASCADE" })
    }
  }
  Product.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    store_id: {
      allowNull: false,
      type: DataTypes.UUID,
      validate: {
        notNull: { msg: "Store id cannot be null" },
        notEmpty: { msg: "Store id cannot be empty" }
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name cannot be null" },
        notEmpty: { msg: "Name cannot be empty" }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name cannot be null" },
        notEmpty: { msg: "Name cannot be empty" }
      }
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Stok cannot be null" },
        notEmpty: { msg: "Stok cannot be empty" }
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "Price cannot be null" },
        notEmpty: { msg: "Price cannot be empty" }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};