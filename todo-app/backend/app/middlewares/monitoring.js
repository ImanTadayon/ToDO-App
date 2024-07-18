// TODO implement monitoring middleware here. this function will log the request path and method (req.path & req.method) in console

const monitoringMiddleware = (req, res, next) => {
    console.log(`HTTP Method: ${req.method}, URL: ${req.path}`);

    next();
};

module.exports = monitoringMiddleware;
