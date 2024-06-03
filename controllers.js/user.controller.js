const { User } = require("../models")
const statusMessage = require("../utils/statusMessage")

const getUser = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findOne({ where: { id } })
        if (!user) statusMessage(res, 404, "User not found")
        user.dataValues.password = undefined
        statusMessage(res, 202, "Get user success", user)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.user
        const payload = req.body
        const user = await User.update(payload, { where: { id } })
        if (!user) statusMessage(res, 404, "User not found")
        statusMessage(res, 202, "Update user success", user)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.destroy({ where: { id } })
        if (!user) statusMessage(res, 404, "User not found")
        statusMessage(res, 202, "Delete user success")
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser
}