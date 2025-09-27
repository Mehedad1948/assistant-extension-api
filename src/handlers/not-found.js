exports.notFound = (req, res)=> {
    res.status(404)
    res.send({
        error: `Not Found: ${req.originalURL}`
    })
}