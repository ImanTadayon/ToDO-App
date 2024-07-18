const { chkAuth, chkAuthLogin } = require("../model/usersData");

const authMiddleware = async (req, res, next) => {
    try {
        const bodyEmail = req.body.email;
        const bodyPassword = req.body.password;

        const loginAuthorized = await chkAuthLogin(bodyEmail, bodyPassword);
        const isAuthorized = await chkAuth(bodyEmail);


        if (req.method === 'POST') {
            if (req.path === '/signup') {
                if (isAuthorized === true) {
                    next();

                } else {
                    res.status(409).send({
                        message: 'A username has already been created with the entered email'
                    });
                    console.log({
                        message: `A username has already been created with the entered email .  status code : 409`
                    });
                }
            } else if (req.path === '/login') {
                if (loginAuthorized === true) {
                    next();

                } else {
                    res.status(401).json({ error: 'Incorrect email or password' });
                    console.log({ error: 'Incorrect email or password' });

                }
            } else if (req.path === '/token') {

                if (loginAuthorized === true) {
                    next();

                } else {
                    res.status(401).json({
                        error: "Invalid email or password"
                    });
                    console.log({
                        error: "Invalid email or password"
                    });

                }
            } else {
                res.status(404).json({ error: 'Invalid route' });
            }

        } else {
            res.status(404).json({ error: 'Invalid route' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { authMiddleware };
