"use strict";

const { Model } = require("sequelize");
const { BUSINESS_STATUS } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      Business.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Business.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Business name is required.",
          },
        },
      },

      ownerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      callingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: {
            msg: "Invalid email address.",
          },
        },
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      cityVillage: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pinCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      googleMapLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM(
          BUSINESS_STATUS.PENDING,
          BUSINESS_STATUS.APPROVED,
          BUSINESS_STATUS.REJECTED,
          BUSINESS_STATUS.SUSPENDED
        ),
        allowNull: false,
        defaultValue: BUSINESS_STATUS.PENDING,
      },

      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Business",
      tableName: "Businesses",
      timestamps: true,
    }
  );

  return Business;
};