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
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, "public")));
//var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(expressLayouts);

// Routes
app.get('/', function(req, res)
{
      res.render('Auth/login',{
            title: 'Login',
            session: '',
            errors: '',
            error: ''
      });
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

app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});