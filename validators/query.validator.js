const Joi = require('joi');

const { ageValidator, nameValidator, emailValidator } = require('./common.validator');

module.exports = {
    findAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
    })
};