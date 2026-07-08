const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const optionalAuthenticate = require("../middleware/optionalAuth.middleware");
const userController = require("../controllers/user.controller");
const categoryService = require("../services/category.service");
const Authrouter = express.Router();

Authrouter.get("/", optionalAuthenticate, (req, res) => {

  if (req.user) {
    return res.redirect("/dashboard");
  }

  res.render("Auth/login", {
    user: "",  
    title: "Login",
    session: {},
    success: "",
    errors: {},
    error: "",
    old: {},
  });

});

Authrouter.get("/logout", (req, res) => {

    res.clearCookie("token");

    return res.redirect("/");

});

Authrouter.get("/users", authenticate, userController.listUsers);

Authrouter.get(
  "/dashboard",
  authenticate,
  (req, res) => {
    res.render("Dashboard/dashboard", {
      title: "Dashboard",
      user: req.user,
    });
  }
);

Authrouter.get("/forgot-password", (req, res) => {
    res.render("Auth/forgot-password", {
        title: "Forgot Password",
        success: "",
        error: ""
    });
});

Authrouter.get("/reset-password/:token", async (req, res) => {
  try {

    // Hash the token received from the URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find user with this hashed token
    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
      },
    });

    if (!user) {
     return res.render("Auth/forgot-password", {
    title: "Forgot Password",
    success: "",
    error: "Invalid or expired reset link. Please request a new password reset link.",
});
    }

   if (
  !user.resetPasswordExpires ||
  user.resetPasswordExpires < new Date()
) {
      return res.render("Auth/forgot-password", {
    title: "Forgot Password",
    success: "",
    error: "Reset link has expired. Please request a new one."
});
    }

    res.render("Auth/reset-password", {
      title: "Reset Password",
      token: req.params.token, // Original token goes to hidden input
      error: "",
    });

  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

Authrouter.get("/users/add", authenticate, userController.showAddUser);
Authrouter.post("/users/add", authenticate, userController.storeUser);
Authrouter.get("/users/edit/:id", authenticate, userController.showEditUser);
Authrouter.post("/users/edit/:id", authenticate, userController.updateUserView);

Authrouter.get("/categories", authenticate, async (req, res) => {
    try {

        const categories = await categoryService.getAllCategories();

        res.render("Categories/categories", {
            title: "Categories",
            categories,
            pages: 1,
            current: 1,
            paginationUrl: "",
            user: req.user
        });

    } catch (error) {

        console.error(error);

        res.render("Categories/categories", {
            title: "Categories",
            categories: [],
            pages: 1,
            current: 1,
            paginationUrl: "",
            user: req.user
        });

    }
});

Authrouter.get("/add-category", authenticate, (req, res) => {
    res.render("Categories/category", {
        title: "Add Category",
        category: null,
        success: "",
        error: "",
        user: req.user
    });
});

module.exports = Authrouter;