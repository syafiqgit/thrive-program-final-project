const statusMessage = require("../utils/status.message")
const { verifyJwt } = require("../utils/token")

const authentication = (req, res, next) => {
    const { token } = req.cookies
    if (!token) statusMessage(res, 401, "Please login first")
    try {
        const { id, role } = verifyJwt(token)
        req.user = { id, role }
        next()
    } catch (error) {
        statusMessage(res, 401, "Please login first")
    }
}

module.exports = {
    authentication
}