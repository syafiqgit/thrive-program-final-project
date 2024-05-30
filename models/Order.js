'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderItem)
    }
  }
  Order.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Total price can't be null" },
        notEmpty: { msg: "Total price can't be empty" },
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};