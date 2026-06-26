const express = require("express");
const router = express.Router();

const businessController = require("../controllers/business.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const { ROLES } = require("../constants");

router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  businessController.getBusinesses
);

router.get(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  businessController.getBusiness
);

router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  businessController.createBusiness
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  businessController.updateBusiness
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  businessController.deleteBusiness
);

module.exports = router;