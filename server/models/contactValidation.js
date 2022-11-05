const joi = require("joi");

const validateContactForm = (data) => {
    const schema = joi.object({
        fullName: joi.string().required().label("Full Name"),
        email: joi.string().email().required().label("Email"),
        message: joi.string().required().label("Message"),
    });
    return schema.validate(data);
};

module.exports = validateContactForm;