const categoryService = require("../services/category.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.CATEGORIES_FETCHED,
        categories
      )
    );
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(
    req.params.id
  );

  if (!category) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.CATEGORY_NOT_FOUND
    );
  }

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.CATEGORY_FETCHED,
        category
      )
    );
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(
    req.body
  );

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      ApiResponse.success(
        MESSAGES.CATEGORY_CREATED,
        category
      )
    );
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body
  );

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.CATEGORY_UPDATED,
        category
      )
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.CATEGORY_DELETED
      )
    );
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};