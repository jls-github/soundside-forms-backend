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
      unique: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      validates: {
        isIn: [["text", "textarea", "checkbox", "select"]],
      },
    },
  },
  {
    sequelize,
    modelName: "Input",
  }
);

module.exports = Input;
