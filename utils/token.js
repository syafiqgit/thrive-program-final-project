const jwt = require('jsonwebtoken')

const createJwt = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'HS256' })
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