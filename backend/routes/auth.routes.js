const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const {
  loginValidation,
  loginValidationResult,
} = require("../middleware/loginValidation.middleware");

router.post(
  "/send-otp",
  authController.sendOTP
);

router.post(
  "/verify-otp",
  authController.verifyOTP
);

router.post(
  "/login",
  loginValidation,
  loginValidationResult,
  authController.login
);

router.get(
  "/me",
  authenticate,
  authController.getProfile
);

router.post(
  "/forgot-password",
  authController.forgotPassword
);
router.post(
  "/reset-password",
  authController.resetPassword
);
module.exports = router;