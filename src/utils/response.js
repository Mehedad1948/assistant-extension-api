const response = (handler) => (req, res, next) => {
    return handler(req, res, next).catch((err) => {
        if (process.env.NODE_ENV !== "production") {
            console.error(err)
        }

        res.status(err.status || 500)
        res.send({
            error: err.message || "Internal Server Error"
        })
    })
}

module.exports = response