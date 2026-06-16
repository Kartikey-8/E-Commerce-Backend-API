const Joi = require("joi");

const updateOrderStatusValidation = Joi.object({
  status: Joi.string()
    .valid("pending", "processing", "shipped", "delivered", "cancelled")
    .required(),
});

module.exports = {
  updateOrderStatusValidation,
};
 