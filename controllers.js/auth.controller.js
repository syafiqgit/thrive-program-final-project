const { User } = require('../models')
const { comparePassword } = require('../utils/password')
const statusMessage = require('../utils/statusMessage')
const { createJwt } = require('../utils/token')

const register = async (req, res) => {
    try {

        const payload = req.body
        const user = await User.create(payload)
        user.dataValues.password = undefined
        statusMessage(res, 201, "Register Success", user)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

const login = async (req, res) => {
    try {
        const payload = req.body
        const user = await User.findOne({ where: { email: payload.email } })
        const isValidUser = user && await comparePassword(payload.password, user.password)
        if (!isValidUser) throw new Error("Invalid Email or Password")
        user.dataValues.password = undefined
        const token = createJwt({ id: user.id, role: user.role })
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        statusMessage(res, 200, "Login Success", user)
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        statusMessage(res, 201, "Logut success")
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            statusMessage(res, 400, error.errors[0].message)
        } else {
            statusMessage(res, 400, error.message)
        }
    }
}

module.exports = {
    register,
    login,
    logout
}