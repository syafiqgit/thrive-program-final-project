const { Store, Product } = require("../models")
const statusMessage = require("../utils/statusMessage")
const { sequelize } = require("../models")
const { QueryTypes } = require("sequelize")

const getProducts = async (req, res) => {
    try {
        const product = await sequelize.query('SELECT * FROM `products`')
        if (!product) statusMessage(res, 404, "Product not found")
        statusMessage(res, 200, "Get product success", product)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}
const getMyProduct = async (req, res) => {
    try {
        const { id } = req.user
        const store = await Store.findOne({ where: { user_id: id } })
        const product = await Product.findAll({ where: { store_id: store.id } })
        if (!product) statusMessage(res, 404, "Product not found")
        statusMessage(res, 200, "Get product success", product)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}
const createProduct = async (req, res) => {
    try {
        const { id } = req.user
        const payload = req.body
        const store = await Store.findOne({ where: { user_id: id } })
        payload.store_id = store.id
        const product = await Product.create(payload)
        statusMessage(res, 201, "Create product success", product)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const payload = req.body
        await Product.update(payload, { where: { id: productId } })
        statusMessage(res, 202, "Update product success", payload)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const payload = req.body
        await Product.destroy({ where: { id: productId } })
        statusMessage(res, 202, "Update product success", payload)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

module.exports = {
    getProducts,
    getMyProduct,
    createProduct,
    updateProduct,
    deleteProduct
}