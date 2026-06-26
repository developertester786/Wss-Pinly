const ApiError = require("../utils/ApiError");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          MESSAGES.UNAUTHORIZED
        )
      );
    }

    if (!allowedRoles.includes(req.user.role.name)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          MESSAGES.FORBIDDEN
        )
      );
    }

    next();
  };
};

module.exports = authorize;