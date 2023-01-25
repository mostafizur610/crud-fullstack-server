module.exports = (err, req, res, next) => {
    res.status(err.statusCode | 404).send({
        message: err.message
    });
    next();
}