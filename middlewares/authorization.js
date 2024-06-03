const statusMessage = require("../utils/statusMessage")

const authorization = (req, res, next) => {
    const { role } = req.user
    console.log(req.user)
    if (role !== "seller") statusMessage(res, 401, "Unauthorized")
    next()
}

module.exports = {
    authorization
}