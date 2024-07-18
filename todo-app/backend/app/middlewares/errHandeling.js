const errHandler = (err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message })
    console.error(err);
}

module.exports = errHandler;