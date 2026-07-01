const { User, Role } = require("../models");
const { verifyToken } = require("../utils/jwt");

const optionalAuthenticate = async (req, res, next) => {
  try {
    let token = null;

    // Check Cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next();
    }

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

    if (user) {
      req.user = user;
    }

    next();
  } catch (err) {
    next();
  }
};

module.exports = optionalAuthenticate;