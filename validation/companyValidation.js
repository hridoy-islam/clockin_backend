const Joi = require('joi');
const validationHandler = require('../common/validate');

const companySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string(),
  contactName: Joi.string(),
  contactPhone: Joi.string(),
  verified: Joi.boolean().default(false)
});


const companyValidator = validationHandler({
  body: companySchema,
});

module.exports = companyValidator;
