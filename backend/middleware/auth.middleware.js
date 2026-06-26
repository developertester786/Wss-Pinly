const { User, Role } = require("../models");

const { verifyToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }

 
    const token = authHeader.split(" ")[1];


    const decoded = verifyToken(token);

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

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;