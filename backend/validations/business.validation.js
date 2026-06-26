const Joi = require("joi");

const createBusiness = Joi.object({
  userId: Joi.number().integer().required(),

  businessName: Joi.string().required(),

  ownerName: Joi.string().required(),

  callingNumber: Joi.string().required(),

  whatsappNumber: Joi.string().allow("", null),

  email: Joi.string().email().allow("", null),

  address: Joi.string().required(),

  cityVillage: Joi.string().required(),

  district: Joi.string().required(),

  state: Joi.string().required(),

  pinCode: Joi.string().required(),

  googleMapLocation: Joi.string().allow("", null),

  categoryId: Joi.number().integer().required(),

  subCategoryId: Joi.number().integer().required(),

  description: Joi.string().allow("", null),
});

const updateBusiness = Joi.object({
  businessName: Joi.string(),

  ownerName: Joi.string(),

  callingNumber: Joi.string(),

  whatsappNumber: Joi.string().allow("", null),

  email: Joi.string().email().allow("", null),

  address: Joi.string(),

  cityVillage: Joi.string(),

  district: Joi.string(),

  state: Joi.string(),

  pinCode: Joi.string(),

  googleMapLocation: Joi.string().allow("", null),

  categoryId: Joi.number().integer(),

  subCategoryId: Joi.number().integer(),

  description: Joi.string().allow("", null),
});

module.exports = {
  createBusiness,
  updateBusiness,
};