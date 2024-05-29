const statusMessage = (res, statusCode, message, data) => {
    res.status(statusCode || 500).json({
        message: message || "Internal server error",
        data: data || null
    })
}

module.exports = statusMessage