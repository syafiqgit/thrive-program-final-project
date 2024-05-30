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
      Product.belongsTo(models.Store, { foreignKey: 'store_id' })
    }
  }
  Product.init({
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    store_id: {
      type: DataTypes.UUID,
      field: 'store_id',
      allowNull: false,
      validate: {
        notNull: { msg: "Store id can't be null" },
        notEmpty: { msg: "Store id can't be empty" },
      }
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Product name can't be null" },
        notEmpty: { msg: "Product name can't be empty" },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Description can't be null" },
        notEmpty: { msg: "Description can't be empty" },
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Quantity can't be null" },
        notEmpty: { msg: "Quantity can't be empty" },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price can't be null" },
        notEmpty: { msg: "Price can't be empty" },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};