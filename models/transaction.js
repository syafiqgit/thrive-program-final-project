'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsToMany(models.Store, { foreignKey: "store_id", onDelete: "CASCADE", onUpdate: "CASCADE", through: "transactions" })
      Transaction.belongsToMany(models.User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE", through: "transactions" })
    }
  }
  Transaction.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: { msg: "User id cannot be empty" },
        notNull: { msg: "User id cannot be empty" }
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    store_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Store id cannot be empty" },
        notNull: { msg: "Store id cannot be empty" }
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Product name cannot be empty" },
        notNull: { msg: "Product name cannot be empty" }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "quantity cannot be empty" },
        notNull: { msg: "quantity cannot be empty" }
      }
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: { msg: "total_price cannot be empty" },
        notNull: { msg: "total_price cannot be empty" }
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};