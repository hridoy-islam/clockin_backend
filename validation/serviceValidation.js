const Joi = require('joi');
const validationHandler = require('../common/validate');

const createServiceSchemaValidation = Joi.object({
    serviceName: Joi.string().required(),
    serviceDate: Joi.date().required(), // Format: mm/dd/yyyy
    serviceTimeStart: Joi.string().required(), 
    serviceTimeEnd: Joi.string().required(), 
    status: Joi.string().required(),
    customer: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Assuming it's a valid ObjectId string
    worker: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Assuming it's a valid ObjectId string
    company: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Assuming it's a valid ObjectId string
    taskList: Joi.array().items(
        Joi.object({
            taskName: Joi.string().required(),
            status: Joi.string().required()
        })
    ),
    workerLogin: Joi.string(),
    workerLogout: Joi.string(),
    comment: Joi.string()
});

const commentValidation = Joi.object({
    comment: Joi.string().required()
});


const createServiceValidator = validationHandler({
    body: createServiceSchemaValidation,
});

const commentValidator = validationHandler({
    body: commentValidation,
});



module.exports = {
    createServiceValidator,
    commentValidator
};
