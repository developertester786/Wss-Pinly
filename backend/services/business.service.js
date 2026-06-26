const { Business, User } = require("../models");

const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const getAllBusinesses = async () => {
  return await Business.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "fullName",
          "email",
          "mobile",
        ],
      },
    ],
    order: [["id", "ASC"]],
  });
};

const getBusinessById = async (id) => {
  return await Business.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "fullName",
          "email",
          "mobile",
        ],
      },
    ],
  });
};

const createBusiness = async (data) => {
  // Check User Exists
  const user = await User.findByPk(data.userId);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.USER_NOT_FOUND
    );
  }

  // Check if Business Already Exists for User
  const existingBusiness = await Business.findOne({
    where: {
      userId: data.userId,
    },
  });

  if (existingBusiness) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.BUSINESS_ALREADY_EXISTS
    );
  }

  return await Business.create(data);
};

const updateBusiness = async (id, data) => {
  const business = await Business.findByPk(id);

  if (!business) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.BUSINESS_NOT_FOUND
    );
  }

  await business.update(data);

  return business;
};

const deleteBusiness = async (id) => {
  const business = await Business.findByPk(id);

  if (!business) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.BUSINESS_NOT_FOUND
    );
  }

  await business.destroy();

  return true;
};

module.exports = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};