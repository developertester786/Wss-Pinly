const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const Authrouter = express.Router();

Authrouter.get('/', function(req, res)
{
      res.render('Auth/login',{
            title: 'Login',
            error:'',
            errors: '',
            user: ''
      });
});

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

Authrouter.get('/categories',authenticate, function(req, res)
{
      var totalrows = 200;
      var cur = typeof req.query.page != "undefined" ? parseInt(req.query.page) : 1;
      var limit = cur - 1;
      var per_page = parseInt(process.env.ADMIN_PER_PAGE_LIMIT);
      limit = limit * per_page;
      var totalpages = Math.ceil(totalrows/per_page) == 0 ? 1 : Math.ceil(totalrows/per_page);
      res.render('Categories/categories',{
            title: 'Categories',
            usersList: '',
            pages: totalpages,
            current: cur,
            paginationUrl: '',
            user: req.user
      });
});

Authrouter.get('/add-category',authenticate, function(req, res)
{
      res.render('Categories/category',{
            title: 'Add Category',
            userData: '',
            success: '',
            error: '',
            user: req.user
      });
});

module.exports = Authrouter;