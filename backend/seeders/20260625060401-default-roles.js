'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "Admin",
        description: "Full system access",
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Business",
        description: "Manage business profile and listings",
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Customer",
        description: "Browse businesses and interact with listings",
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Staff",
        description: "Manage backend operations",
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};