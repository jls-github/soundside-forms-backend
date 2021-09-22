const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js");

class Input extends Model {}

Input.init(
  {
    labelText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Input",
  }
);

module.exports = Input;
