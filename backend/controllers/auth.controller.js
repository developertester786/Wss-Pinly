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

module.exports = {
  sendOTP,
  verifyOTP,
  getProfile,
};