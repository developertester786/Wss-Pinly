const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const { ROLES } = require("../constants");
const userController = require("../controllers/user.controller");

router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  userController.getUsers
);
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  userController.getUser
);

router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  userController.createUser
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  userController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  userController.deleteUser
);

module.exports = router;