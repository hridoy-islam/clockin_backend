const Joi = require('joi');
const validationHandler = require('../common/validate');

const companySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string(),
  contactName: Joi.string(),
  contactPhone: Joi.string()
});

const companyUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string(),
  contactName: Joi.string(),
  contactPhone: Joi.string(),
  softDelete: Joi.boolean()
});

const companyValidator = validationHandler({
  body: companySchema,
});

const companyUpdateValidator = validationHandler({
  body: companyUpdateSchema,
});

module.exports = {
  companyValidator,
  companyUpdateValidator
};
