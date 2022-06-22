'use strict';

// require("dotenv").config();

const { Sequelize, DataTypes } = require('sequelize');
const ClothesSchema = require('./clothes');
const FoodSchema = require('./food');

const DATABASE_URL = process.env.NODE_ENV === 'test'
    ? 'sqlite::memory'
    : process.env.DATABASE_URL || 'postgres://localhost:5432/401-api-app';

// const sequelize = new Sequelize(DATABASE_URL);

// For deploying
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
        rejectUnauthorized: false,
    }
  }
});

const ClothesModel = ClothesSchema(sequelize, DataTypes);
const FoodModel = FoodSchema(sequelize, DataTypes);

module.exports = {
    sequelize,
    ClothesModel,
    FoodModel,
};
