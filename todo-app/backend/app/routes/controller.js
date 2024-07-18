

const Users = require('../model/usersData');
const bcrypt = require('bcrypt');


// #################    signup user    #################
const createUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, confirm_password } = req.body;

        if (password !== confirm_password) {
            res.status(400).json({
                message: "Password doesn't match"
            });
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertionResult = await Users.createUser(first_name, last_name, email, hashedPassword);
        res.status(201).json({
            message: "user successfully created.",
            insertedId: insertionResult.insertId
        });
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error)
    }
}





// #################    login user    #################
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.loginUser(email, password);

        if (!user) {

            res.status(401).json({
                message: "Invalid email or password."
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            user.password = "**** arcane ****" // password
            res.status(201).json({
                message: `Dear ' ${user.first_name} ${user.last_name} ', you have successfully logged in ( Login was successful. )`,
                user: user,
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password."
            });
        }
    } catch (error) {
        next(error);
    }
};



module.exports = {
    createUser,
    loginUser
};



