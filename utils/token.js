const jwt = require("jsonwebtoken")

const createJwt = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    return token
}

module.exports = {
    createJwt
}