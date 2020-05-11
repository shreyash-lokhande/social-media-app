const Joi = require('@hapi/joi');

const registerValidation = data => {
    const Schema = Joi.object({
        username: Joi.string().max(20).required(),
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        email: Joi.string().max(20).required(),
        password: Joi.string().min(6).required()
    });
    return Schema.validate(data);
}

const loginValidation = data => {
    if(data.username) {
        const case1 = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).required()
        });
        return case1.validate(data);
    }
    if(data.email) {
        const case2 = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(6).required()
        });
        return case2.validate(data);
    }
}

const commentValidation = data => {
    const Schema = Joi.object({
        text: Joi.string().required()
    });
    return Schema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation,
    commentValidation
}