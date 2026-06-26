const businessService = require("../services/business.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const getBusinesses = asyncHandler(async (req, res) => {
  const businesses = await businessService.getAllBusinesses();

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.BUSINESSES_FETCHED,
        businesses
      )
    );
});

const getBusiness = asyncHandler(async (req, res) => {
  const business = await businessService.getBusinessById(
    req.params.id
  );

  if (!business) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.BUSINESS_NOT_FOUND
    );
  }

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.BUSINESS_FETCHED,
        business
      )
    );
});

const createBusiness = asyncHandler(async (req, res) => {
  const business = await businessService.createBusiness(
    req.body
  );

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      ApiResponse.success(
        MESSAGES.BUSINESS_CREATED,
        business
      )
    );
});

const updateBusiness = asyncHandler(async (req, res) => {
  const business = await businessService.updateBusiness(
    req.params.id,
    req.body
  );

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.BUSINESS_UPDATED,
        business
      )
    );
});

const deleteBusiness = asyncHandler(async (req, res) => {
  await businessService.deleteBusiness(req.params.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.BUSINESS_DELETED
      )
    );
});

module.exports = {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};