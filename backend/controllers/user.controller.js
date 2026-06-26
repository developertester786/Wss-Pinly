const userService = require("../services/user.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");


const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.USERS_FETCHED,
        users
      )
    );
});


const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(
    req.params.id
  );

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.USER_NOT_FOUND
    );
  }

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.USER_FETCHED,
        user
      )
    );
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      ApiResponse.success(
        MESSAGES.USER_CREATED,
        user
      )
    );
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body
  );

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.USER_UPDATED,
        user
      )
    );
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.USER_DELETED
      )
    );
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};