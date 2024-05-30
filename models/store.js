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
      Store.belongsTo(models.User, { foreignKey: 'owner_id' })
    }
  }
  Store.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    store_name: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "Store name can't be null" },
        notEmpty: { msg: "Store name can't be empty" },
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Phone number can't be null" },
        notEmpty: { msg: "Phone number can't be empty" },
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Address can't be null" },
        notEmpty: { msg: "Address can't be empty" },
      }
    },
  }, {
    sequelize,
    modelName: 'Store',
  });

  Store.beforeCreate(async (store) => {
    const checkStore = await Store.findOne({ where: { owner_id: store.owner_id } })
    if (checkStore) throw new Error('Store already exists')
  })
  return Store;
};