const HTTP_STATUS = require("../constants/httpStatus");
const ApiResponse = require("../utils/ApiResponse");

const errorHandler = (err, req, res, next) => {
  console.log("\n========== ERROR ==========");
  console.log(err);
  console.log("Name:", err.name);
  console.log("Message:", err.message);

  if (err.errors) {
    console.log("Validation Errors:");
    err.errors.forEach((e) => {
      console.log("-", e.message);
    });
  }

  console.log("===========================\n");

  return res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
    ApiResponse.error(err.message)
  );
};

module.exports = errorHandler;