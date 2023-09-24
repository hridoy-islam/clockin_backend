const Joi = require('joi');
const validationHandler = require('../common/validate');

const customerSchemaValidation = Joi.object({
    name: Joi.string().required(),
    location: Joi.string(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    phone: Joi.string().required(),
    company: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Assuming it's a valid ObjectId string
});

const customerUpdateSchemaValidation = Joi.object({
  name: Joi.string().required(),
  location: Joi.string(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  phone: Joi.string().required()
});

const customerValidator = validationHandler({
    body: customerSchemaValidation,
  });
  
const customerUpdateValidator = validationHandler({
  body: customerUpdateSchemaValidation,
});
module.exports = {
  customerValidator,
  customerUpdateValidator
};