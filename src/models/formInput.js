const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js");

class FormInput extends Model {}

FormInput.init(
  {
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inputId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "FormInput",
  }
);

module.exports = FormInput;
