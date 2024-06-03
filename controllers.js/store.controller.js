const { Store } = require("../models")
const statusMessage = require("../utils/statusMessage")

const getStore = async (req, res) => {
    try {
        const { id } = req.user
        const store = await Store.findOne({ where: { user_id: id } })
        if(!store) statusMessage(res, 404, "Store not found")
        statusMessage(res, 200, "Get store success", store)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

const createStore = async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.user
        payload.user_id = id
        const store = await Store.create(payload)
        statusMessage(res, 201, "Create store success", store)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                statusMessage(res, 400, error.errors[0].message)
            } else {
                statusMessage(res, 400, error.message)
            }
        }
    }
}

const updateStore = async (req, res) => {
    try {
        const { id } = req.user
        const payload = req.body
        await Store.update(payload, { where: { user_id: id } })
        statusMessage(res, 202, "Update store success", payload)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                statusMessage(res, 400, error.errors[0].message)
            } else {
                statusMessage(res, 400, error.message)
            }
        }
    }
}

const deleteStore = async (req, res) => {
    try {
        const { id } = req.user
        const payload = req.body
        await Store.destroy({ where: { user_id: id } })
        statusMessage(res, 202, "Update store success", payload)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                statusMessage(res, 400, error.errors[0].message)
            } else {
                statusMessage(res, 400, error.message)
            }
        }
    }
}

module.exports = {
    getStore,
    createStore,
    updateStore,
    deleteStore
}