const express = require("express");
const cors = require("cors");
require("dotenv").config();

const roleRoutes = require("./routes/role.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const businessRoutes = require("./routes/business.routes");
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/auth.middleware");
const optionalAuthenticate = require("./middleware/optionalAuth.middleware");
const { User } = require("./models");
const crypto = require("crypto");
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, "public")));
var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Routes
app.get("/", optionalAuthenticate, (req, res) => {

  if (req.user) {
    return res.redirect("/dashboard");
  }

  res.render("Auth/login", {
    title: "Login",
    session: {},
    success: "",
    errors: {},
    error: "",
    old: {},
  });

});

app.get("/logout", (req, res) => {

    res.clearCookie("token");

    return res.redirect("/");

});

app.get(
  "/dashboard",
  authenticate,
  (req, res) => {
    res.render("Dashboard/dashboard", {
      title: "Dashboard",
      user: req.user,
    });
  }
);

// app.get("/forgot", (req, res) => {
//   res.render("Auth/pages_recoverpw", {
//     title: "Forgot Password",
//     error: "",
//     success: "",
//   });
// });

app.get("/forgot-password", (req, res) => {
    res.render("Auth/forgot-password", {
        title: "Forgot Password",
        success: "",
        error: ""
    });
});

app.get("/reset-password/:token", async (req, res) => {
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

app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});