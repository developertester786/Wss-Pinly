const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const { ROLES } = require("../constants");
const roleController = require("../controllers/role.controller");

router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  roleController.getRoles
);

router.get(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  roleController.getRole
);

router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  roleController.createRole
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  roleController.updateRole
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  roleController.deleteRole
);

module.exports = router;