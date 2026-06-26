const { User, Role } = require("../models");

const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const getAllUsers = async () => {
  return await User.findAll({
    attributes: {
      exclude: ["password", "otp", "otpExpiry"],
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
    order: [["id", "ASC"]],
  });
};

const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: {
      exclude: ["password", "otp", "otpExpiry"],
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
  });
};

const createUser = async (data) => {
  // Check Role Exists
  const role = await Role.findByPk(data.roleId);

  if (!role) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ROLE_NOT_FOUND
    );
  }

  // Check Mobile
  const mobileExists = await User.findOne({
    where: {
      mobile: data.mobile,
    },
  });

  if (mobileExists) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.MOBILE_ALREADY_EXISTS
    );
  }

  // Check Email
  if (data.email) {
    const emailExists = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.EMAIL_ALREADY_EXISTS
      );
    }
  }

  return await User.create(data);
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.USER_NOT_FOUND
    );
  }

  // Check Role
  if (data.roleId) {
    const role = await Role.findByPk(data.roleId);

    if (!role) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.ROLE_NOT_FOUND
      );
    }
  }

  // Check Mobile
  if (data.mobile) {
    const mobileExists = await User.findOne({
      where: {
        mobile: data.mobile,
      },
    });

    if (mobileExists && mobileExists.id !== user.id) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.MOBILE_ALREADY_EXISTS
      );
    }
  }

  // Check Email
  if (data.email) {
    const emailExists = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (emailExists && emailExists.id !== user.id) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.EMAIL_ALREADY_EXISTS
      );
    }
  }

  await user.update(data);

  return await getUserById(user.id);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.USER_NOT_FOUND
    );
  }

  await user.destroy();

  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};