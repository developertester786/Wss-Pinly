const { Role } = require("../models");

const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
  ROLES,
} = require("../constants");

const getAllRoles = async () => {
  return await Role.findAll({
    attributes: ["id", "name", "description", "status"],
    order: [["id", "ASC"]],
  });
};

const getRoleById = async (id) => {
  return await Role.findByPk(id, {
    attributes: ["id", "name", "description", "status"],
  });
};

const createRole = async (data) => {
  const existingRole = await Role.findOne({
    where: {
      name: data.name,
    },
  });

  if (existingRole) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.ROLE_ALREADY_EXISTS
    );
  }

  return await Role.create(data);
};

const updateRole = async (id, data) => {
  const role = await Role.findByPk(id);

  if (!role) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ROLE_NOT_FOUND
    );
  }

  const existingRole = await Role.findOne({
    where: {
      name: data.name,
    },
  });

  if (existingRole && existingRole.id !== role.id) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.ROLE_ALREADY_EXISTS
    );
  }

  await role.update(data);

  return role;
};

const deleteRole = async (id) => {
  const role = await Role.findByPk(id);

  if (!role) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ROLE_NOT_FOUND
    );
  }

  const defaultRoles = [
    ROLES.ADMIN,
    ROLES.BUSINESS,
    ROLES.CUSTOMER,
  ];

  if (defaultRoles.includes(role.name)) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      MESSAGES.DEFAULT_ROLE_DELETE
    );
  }

  await role.destroy();

  return true;
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};