const { body, validationResult } = require("express-validator");

const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

const loginValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("Auth/login", {
    title: "Login",
    session: {},
    success: "",
    errors: errors.mapped(),
    error: "",
    old: req.body
});
  }

  next();
};

module.exports = {
  loginValidation,
  loginValidationResult,
};