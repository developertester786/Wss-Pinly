"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Business, {
        foreignKey: "categoryId",
        as: "businesses",
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Category name is required.",
          },
        },
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categories",
      timestamps: true,
    }
  );

  return Category;
};