const roleService = require("../services/role.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const getRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.getAllRoles();

  return res
    .status(HTTP_STATUS.OK)
    .json(ApiResponse.success(MESSAGES.ROLES_FETCHED, roles));
});

const getRole = asyncHandler(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);

  if (!role) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ROLE_NOT_FOUND
    );
  }

  return res
    .status(HTTP_STATUS.OK)
    .json(ApiResponse.success(MESSAGES.ROLE_FETCHED, role));
});

const createRole = asyncHandler(async (req, res) => {
  const role = await roleService.createRole(req.body);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(ApiResponse.success(MESSAGES.ROLE_CREATED, role));
});

const updateRole = asyncHandler(async (req, res) => {
  const role = await roleService.updateRole(
    req.params.id,
    req.body
  );

  return res
    .status(HTTP_STATUS.OK)
    .json(ApiResponse.success(MESSAGES.ROLE_UPDATED, role));
});

const deleteRole = asyncHandler(async (req, res) => {
  await roleService.deleteRole(req.params.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(ApiResponse.success(MESSAGES.ROLE_DELETED));
});

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};