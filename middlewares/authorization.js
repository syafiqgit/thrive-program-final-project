const authorization = (req, res, next) => {
    const { role } = req.user
    if (role !== "seller") {
        return res.status(403).json({ message: "Unauthorized" })
    }
    next()
}

module.exports = authorization