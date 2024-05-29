const { User } = require("../models")
const comparePassword = require("../utils/compare.password")
const statusMessage = require("../utils/status.message")
const { createJwt } = require("../utils/token")

const register = async (req, res) => {
    try {
        const payload = req.body
        const user = await User.create(payload)
        delete user.dataValues.password
        statusMessage(res, 201, "User created", user)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        const isValidUser = user && await comparePassword(req.body.password, user.password)
        if (!isValidUser) throw new Error("Invalid email or password")
        const token = createJwt({ id: user.id, role: user.role })
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 3600 * 1000
        })
        delete user.dataValues.password
        statusMessage(res, 200, "Login success", user)
    } catch (error) {
        statusMessage(res, 400, error.message)
    }
}

module.exports = {
    register,
    login
}