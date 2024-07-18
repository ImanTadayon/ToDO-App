const passwordComplexity = require("joi-password-complexity");
const error = require('../middlewares/errHandeling')

const Joi = require('joi');
const postData = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(50),
    email: Joi.string()
        .email()
        .required(),
    password:
        passwordComplexity()
            .required(),
    confirm_password:
        passwordComplexity()
            .required(),
});

const validateData = async (req, res, next) => {
    try {
        const result = await postData.validateAsync(req.body);
        next();
    }
    catch (error) {
        next(error)
    }
};



module.exports = {
    validateData
};