'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.belongsTo(models.User, { foreignKey: "user_id" })
      Store.hasMany(models.Product, { foreignKey: "store_id", onDelete: "CASCADE", onUpdate: "CASCADE" })
      Store.hasMany(models.Transaction, { foreignKey: "store_id", onDelete: "CASCADE", onUpdate: "CASCADE" })
    }
  }
  Store.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "User id cannot be empty" },
        notNull: { msg: "User id cannot be null" }
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name id cannot be empty" },
        notNull: { msg: "Name id cannot be null" }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description id cannot be empty" },
        notNull: { msg: "Description id cannot be null" }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Address id cannot be empty" },
        notNull: { msg: "Address id cannot be null" }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone number id cannot be empty" },
        notNull: { msg: "Phone number id cannot be null" }
      }
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  Store.beforeCreate(async (store) => { 
    const storeAlreadyExist = await Store.findOne({ where: { user_id: store.user_id } })
    if (storeAlreadyExist) throw new Error("Store already exist")
  })
  return Store;
};