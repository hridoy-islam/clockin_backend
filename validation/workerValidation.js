const Joi = require('joi');
const validationHandler = require('../common/validate');

const createWorker = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    otp: Joi.string(),
    holidays: Joi.number(),
    verified: Joi.boolean()
});

const updateWorker = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    otp: Joi.string(),
    holidays: Joi.number(),
    verified: Joi.boolean()
});

const createWorkerValidator = validationHandler({
    body: createWorker,
});

const updateWorkerValidator = validationHandler({
    body: updateWorker,
});


module.exports = {
    createWorkerValidator,
    updateWorkerValidator
};