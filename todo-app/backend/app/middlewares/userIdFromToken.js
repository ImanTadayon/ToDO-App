// ############     Get ID from token     ###########
const jwt = require('jsonwebtoken');

const userIdFromToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secretkey');
        req.user_id = decodedToken.userId;
        console.log("#####   " + "user by ID : " + req.user_id + "   #####");
        const user_id = req.user_id
        next();
        return user_id

    } catch (error) {
        res.status(401).json({ message: 'Authentication failed.' });
        console.log({ message: 'Authentication failed.' });
    }
};
module.exports = userIdFromToken;

