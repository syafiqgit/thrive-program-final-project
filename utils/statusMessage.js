const statusMessage = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        message: message,
        data: data || null
    })
}

module.exports = statusMessage