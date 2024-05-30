const { Product, Store } = require("../models")
const statusMessage = require("../utils/status.message")
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/index')

const getAllProducts = async (req, res) => {
    try {
        const product = await sequelize.query(`SELECT * FROM products`, { type: QueryTypes.SELECT });
        if (!product) throw new Error("Product not found")
        statusMessage(res, 200, "Get all product success", product)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

const getMyProducts = async (req, res) => {
    try {
        const { id } = req.user
        const store = await Store.findOne({ where: { user_id: id } })
        const product = await Product.findAll({ where: { store_id: store.store_id } })
        if (!product) throw new Error("Product not found")
        statusMessage(res, 200, "Get my product success", product)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

const createProduct = async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.user
        const store = await Store.findOne({ where: { user_id: id } })
        payload.store_id = store.store_id
        const product = await Product.create(payload)
        statusMessage(res, 201, "Product created", product)
    } catch (error) {
        console.log(error)
        statusMessage(res, 400, error.message)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        await Product.update(payload, { where: { product_id: id } })
        statusMessage(res, 201, "Update product successfull", payload)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.destroy({ where: { product_id: id } })
        statusMessage(res, 201, "Delete product successfull", product)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

module.exports = {
    getAllProducts,
    getMyProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}