const { Category } = require("../models");

const ApiError = require("../utils/ApiError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

const slugify = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const getAllCategories = async () => {
  return Category.findAll({
    order: [["id", "ASC"]],
  });
};

const getCategoryById = async (id) => {
  return Category.findByPk(id);
};

const createCategory = async (data) => {
  const slug = slugify(data.name);

  const existingCategory = await Category.findOne({
    where: {
      name: data.name,
    },
  });

  if (existingCategory) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.CATEGORY_ALREADY_EXISTS
    );
  }

  return Category.create({
    name: data.name,
    slug,
    status: data.status ?? true,
  });
};

const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.CATEGORY_NOT_FOUND
    );
  }

  const slug = slugify(data.name);

  await category.update({
    name: data.name,
    slug,
    status: data.status,
  });

  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.CATEGORY_NOT_FOUND
    );
  }

  await category.destroy();

  return true;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};