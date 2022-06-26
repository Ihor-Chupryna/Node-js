const Joi = require('joi');

const { nameValidator, ageValidator, emailValidator, passwordValidator } = require('./common.validator');

module.exports = {
    createUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),

    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator,
    })
}

// const userSubSchema = {
//     name: Joi.string().alphanum().min(2).max(100).required(),
//     age: Joi.number().integer().min(1).max(130),
// };
//
// module.exports = {
//     createUserValidators: Joi.object({
//         ...userSubSchema,
//         email: emailValidator.required(),
//         password: passwordValidator.required()
//     }),
//
//     updateUserValidator: Joi.object(userSubSchema),
// }

