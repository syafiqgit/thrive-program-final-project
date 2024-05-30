const { Store } = require('../models')
const statusMessage = require('../utils/status.message')

const getStore = async (req, res) => {
    try {
        const { id } = req.user
        const store = await Store.findOne({ where: { user_id: id } })
        if (!store) throw new Error("Store not found")
        statusMessage(res, 200, "Get store success", store)
    } catch (error) {
        statusMessage(res, 404, error.message)
    }
}
const createStore = async (req, res) => {
    try {
        const { id } = req.user
        const payload = req.body
        payload.user_id = id
        const store = await Store.create(payload)
        req.store = { id: store.store_id }
        console.log(req.store)
        statusMessage(res, 201, "Store created", store)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

const updateStore = async (req, res) => {
    try {
        const { id } = req.user
        const payload = req.body
        const store = await Store.findOne({ where: { user_id: id } })
        if (!store) throw new Error("Store not found")
        await Store.update(payload, { where: { store_id: id } })
        statusMessage(res, 200, "Store updated", payload)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

const deleteStore = async (req, res) => {
    try {
        const { id } = req.user
        const store = await Store.findOne({ where: { user_id: id } })
        if (!store) throw new Error("Store not found")
        await Store.destroy({ where: { user_id: id } })
        statusMessage(res, 200, "Store deleted")
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

module.exports = {
    getStore,
    createStore,
    updateStore,
    deleteStore
}