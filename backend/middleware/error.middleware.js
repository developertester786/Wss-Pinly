const HTTP_STATUS = require("../constants/httpStatus");
const ApiResponse = require("../utils/ApiResponse");

const errorHandler = (err, req, res, next) => {
 

  if (err.errors) {
    
    err.errors.forEach((e) => {
    });
  }


  return res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
    ApiResponse.error(err.message)
  );
};

module.exports = errorHandler;