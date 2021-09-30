const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js");

class FormInput extends Model {}

FormInput.init(
  {
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    input_id: {
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
