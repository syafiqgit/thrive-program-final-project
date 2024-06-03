const statusMessage = require("../utils/statusMessage")
const { verifyJwt } = require("../utils/token")

const authentication = (req, res, next) => {
    const { token } = req.cookies
    if (!token) statusMessage(res, 401, "Unauthenticated")
    try {
        const { id, role } = verifyJwt(token)
        req.user = { id, role }
        next()
    } catch (error) {
        statusMessage(res, 401, "Unauthenticated")
    }
}

module.exports = {
    authentication
}