const { User, Role } = require("../models");

const ApiError = require("../utils/ApiError");
const { generateOTP } = require("../utils/otp");
const { generateToken } = require("../utils/jwt");
const {
    HTTP_STATUS,
    MESSAGES,
    ROLES,
    STATUS,
} = require("../constants");

const sendOTP = async ({ mobile }) => {
    // Check if user already exists
    let user = await User.findOne({
        where: {
            mobile,
        },
    });

    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (user) {
        await user.update({
            otp,
            otpExpiry,
        });
    } else {
        const customerRole = await Role.findOne({
            where: {
                name: ROLES.CUSTOMER,
            },
        });

        if (!customerRole) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                MESSAGES.ROLE_NOT_FOUND
            );
        }
        user = await User.create({
            roleId: customerRole.id,
            fullName: MESSAGES.DEFAULT_USER_NAME,
            mobile,
            otp,
            otpExpiry,
            isVerified: false,
            status: STATUS.ACTIVE,
        });
    }

    return {
        otp,
        expiry: otpExpiry,
    };
};

const verifyOTP = async ({ mobile, otp }) => {
    // Find user
    const user = await User.findOne({
        where: {
            mobile,
        },
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
            },
        ],
    });

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.USER_NOT_FOUND
        );
    }

    // Check OTP
    if (user.otp !== otp) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.INVALID_OTP
        );
    }

    // Check OTP Expiry
    if (new Date() > user.otpExpiry) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.OTP_EXPIRED
        );
    }

    // Mark verified
    await user.update({
        isVerified: true,
        otp: null,
        otpExpiry: null,
    });

    // Generate JWT
    const token = generateToken({
        id: user.id,
        roleId: user.roleId,
    });

    return {
        token,
        user: {
            id: user.id,
            roleId: user.roleId,
            fullName: user.fullName,
            mobile: user.mobile,
            email: user.email,
            profileImage: user.profileImage,
            status: user.status,
            isVerified: user.isVerified,
            role: user.role,
        },
    };
};

const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
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

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.USER_NOT_FOUND
    );
  }

  return user;
};

module.exports = {
    sendOTP,
    verifyOTP,
    getProfile,
};