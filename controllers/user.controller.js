const { User } = require("../models")
const statusMessage = require("../utils/status.message")

const getUser = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findOne({ where: { id: id } })
        delete user.dataValues.password
        statusMessage(res, 200, "Get user success", user)
    } catch (error) {
        statusMessage(res, 404, error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.user
        await User.update(payload, { where: { id: id } })
        statusMessage(res, 200, "Update user success", payload)
    } catch (error) {
        console.log(error)
        statusMessage(res, 404, error.message)
    }
}

const updateRoleToSeller = async (req, res) => {
    try {
        const { id } = req.user
        await User.update({ role: "seller" }, { where: { id: id } })
        statusMessage(res, 200, "Update role success",)
    } catch (error) {
        statusMessage(res, 404, error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.user
        await User.destroy({ where: { id: id } })
        res.clearCookie("token")
        statusMessage(res, 200, "Delete user success")
    } catch (error) {
        statusMessage(res, 404, error.message)
    }
}

module.exports = {
    getUser,
    updateUser,
    updateRoleToSeller,
    deleteUser
}