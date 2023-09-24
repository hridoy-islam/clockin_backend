const Joi = require('joi');
const validationHandler = require('../common/validate');

const createWorker = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    otp: Joi.string(),
    holidays: Joi.number()
});

const createWorkerValidator = validationHandler({
    body: createWorker,
});


module.exports = {
    createWorkerValidator
};