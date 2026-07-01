const userService = require("../services/user.service");
const roleService = require("../services/role.service");
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

const listUsers = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const search = req.query.search || "";
    const role = req.query.role || "";

    const result = await userService.getAllUsers(
        page,
        limit,
        search,
        role
    );

    const roles = await roleService.getAllRoles();
    return res.render("Users/users", {

        title: "Users",

        user: req.user,

        users: result.users,

        pages: result.pages,

        current: result.current,

        search,

        role,

        roles

    });

});

const showAddUser = asyncHandler(async (req, res) => {

    const roles = await roleService.getAllRoles();

    res.render("Users/user", {
        title: "Add User",
        user: req.user,
        roles,
        userData: null,
        success: "",
        error: ""
    });

});

const storeUser = asyncHandler(async (req, res) => {

    await userService.createUser(req.body);

    res.redirect("/users");

});

const showEditUser = asyncHandler(async (req, res) => {

    const roles = await roleService.getAllRoles();

    const userData = await userService.getUserById(req.params.id);

    res.render("Users/user", {
        title: "Edit User",
        user: req.user,
        roles,
        userData,
        success: "",
        error: ""
    });

});

const updateUserView = asyncHandler(async (req, res) => {

    await userService.updateUser(
        req.params.id,
        req.body
    );

    res.redirect("/users");

});
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  listUsers,
  showAddUser,
  storeUser,
  showEditUser,
  updateUserView
};