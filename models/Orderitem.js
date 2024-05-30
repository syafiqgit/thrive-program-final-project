'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItem.belongsTo(models.Product, {foreignKey: "product_id", as: "product"})
      OrderItem.belongsTo(models.Order)
    }
  }
  OrderItem.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4
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
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Price can't be null" },
        notEmpty: { msg: "Price can't be empty" },
      }
    },
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};