
// #################    Create Token    #################
const jwt = require('jsonwebtoken');

const { query } = require('../core/database/database');


// #################    Find User id    #################
const getUserIdFromDatabase = async (email) => {

    // اجرای کوئری برای یافتن آیدی یوزر با ایمیل مشخص
    const sql = 'SELECT id FROM login WHERE email = ?';

    const [rows] = await query(sql, [email]);

    if (rows.length > 0) {

        return rows[0].id;

    } else {

        return null;

    }

};







// #################    Add ID to token    #################
const authUserToken = async (req, res, next) => {
    try {
        const bodyDataInput = {
            email: req.body.email,
            password: req.body.password
        };
        if (!bodyDataInput.email) {
            throw new Error('Email is required');
        }

        const userId = await getUserIdFromDatabase(bodyDataInput.email);
        if (!userId) {
            throw new Error('User not found');
        }

        console.log("User ID:", userId);
        const userTokenData = {
            ...bodyDataInput,
            userId: userId
        };

        const userToken = jwt.sign(userTokenData, 'secretkey', { expiresIn: '1h' });

        console.log('#####################################################################');
        console.log("New Token:", userToken);
        console.log('#####################################################################');

        res.status(201).json({ userToken });

    } catch (error) {

        console.error("Error:", error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).send({
                message: 'Invalid token'
            });

        } else if (error instanceof jwt.TokenExpiredError) {
            res.status(403).send({
                message: 'Token expired'
            });

        } else {
            res.status(403).send({
                message: 'Check input data'
            });
        }
    }
};

module.exports = {
    authUserToken,
};
