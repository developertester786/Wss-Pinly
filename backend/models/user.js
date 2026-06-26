"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User belongs to one Role
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }

  User.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full name is required",
          },
        },
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email address",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM(
          "ACTIVE",
          "INACTIVE",
          "BLOCKED"
        ),
        defaultValue: "ACTIVE",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,

hooks: {
  beforeCreate: async (user) => {
    console.log("Before hash:", user.password);

    user.password = await bcrypt.hash(user.password, 10);

    console.log("After hash:", user.password);
  },

  beforeUpdate: async (user) => {
    if (user.changed("password")) {
      console.log("Before update hash:", user.password);

      user.password = await bcrypt.hash(user.password, 10);

      console.log("After update hash:", user.password);
    }
  },
},
    }
  );

  return User;
};