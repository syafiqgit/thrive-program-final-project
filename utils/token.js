const jwt = require("jsonwebtoken")

const createJwt = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    return token
}

const verifyJwt = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    return decoded
}

module.exports = {
    createJwt,
    verifyJwt
}