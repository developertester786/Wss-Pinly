const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");


router.post(
  "/send-otp",
  authController.sendOTP
);

router.post(
  "/verify-otp",
  authController.verifyOTP
);

router.get(
  "/me",
  authenticate,
  authController.getProfile
);



module.exports = router;