const Joi = require('joi');
const validationHandler = require('../common/validate');

const createTaskList = Joi.object({
    taskName: Joi.string().required(),
    status: Joi.string().valid('pending', 'completed'),
    company: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const updateTaskList = Joi.object({
    taskName: Joi.string().required(),
    status: Joi.string().valid('pending', 'completed')
});

const createTaskListValidator = validationHandler({
    body: createTaskList,
});

const updateTaskListValidator = validationHandler({
    body: updateTaskList,
});


module.exports = {
    createTaskListValidator,
    updateTaskListValidator
};
