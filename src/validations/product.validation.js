const Joi = require("joi");

const createProductValidation = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  price: Joi.number().min(0).required(),

  stock: Joi.number().min(0).required(),

  category: Joi.string().required(),
});
 
module.exports = {createProductValidation };
