
// #################    verify Token    #################
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.send(error)
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.status(403).send({
            message: "You are not allowed to log in without authentication. Please enter your token."
        });
    }
}


module.exports = {
    verifyToken
}