const { User, Role } = require("../models");
const { verifyToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization Header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. If no header, check HTTP-only Cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3. If token not found
    if (!token) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }

    // 4. Verify JWT
    const decoded = verifyToken(token);

    // 5. Find User
    const user = await User.findByPk(decoded.id, {
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
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.USER_NOT_FOUND
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;