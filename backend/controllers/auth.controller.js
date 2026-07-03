const authService = require("../services/auth.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  HTTP_STATUS,
  MESSAGES,
} = require("../constants");

const sendOTP = asyncHandler(async (req, res) => {
  const result = await authService.sendOTP(
    req.body
  );

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.OTP_SENT,
        result
      )
    );
});

const verifyOTP = asyncHandler(async (req, res) => {
  const result = await authService.verifyOTP(req.body);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      ApiResponse.success(
        MESSAGES.LOGIN_SUCCESS,
        result
      )
    );
});

const login = asyncHandler(async (req, res) => {
  try {
    const { rememberMe } = req.body;

    const result = await authService.login(req.body);

    // Remove any existing cookie first
    res.clearCookie("token");

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    // Persistent cookie (30 days)
    if (rememberMe) {
      cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
    }

    // Session cookie (removed when browser closes)
    res.cookie("token", result.token, cookieOptions);

    return res.redirect("/dashboard");
  } catch (error) {
    return res.render("Auth/login", {
      title: "Login",
      session: {},
      success: "",
      errors: {},
      error: error.message,
      old: req.body,
    });
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(
        ApiResponse.success(
            MESSAGES.PROFILE_FETCHED,
            user
        )
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    await authService.forgotPassword(req.body.email);

    return res.render("Auth/forgot-password", {
      title: "Forgot Password",
      success: "Password reset link has been sent to your email.",
      error: "",
    });

  } catch (error) {

    return res.render("Auth/forgot-password", {
      title: "Forgot Password",
      success: "",
      error: error.message,
    });

  }
});
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    await authService.resetPassword(
      token,
      password,
      confirmPassword
    );

    return res.render("Auth/login", {
      title: "Login",
      session: {},
      success: "Password reset successfully. Please login.",
      error: "",
      errors: {},
      old: {},
    });

  } catch (error) {

    return res.render("Auth/reset-password", {
      title: "Reset Password",
      token: req.body.token,
      error: error.message,
    });

  }
});
module.exports = {
  sendOTP,
  verifyOTP,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
};