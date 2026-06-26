"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert("Users", [
      {
        roleId: 1, // Admin Role
        fullName: "Admin",
        mobile: "9999999999",
        email: "admin@gmail.com",
        password: hashedPassword,
        googleId: null,
        otp: null,
        otpExpiry: null,
        isVerified: true,
        profileImage: null,
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Users",
      {
        email: "admin@gmail.com",
      },
      {}
    );
  },
};