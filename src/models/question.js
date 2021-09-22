const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js");

class Question extends Model {}

Question.init(
  {
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    input_type: {
      type: DataTypes.TEXT,
      allowNull: false,
      validates: {
        isIn: [["text", "textarea", "checkbox", "select"]],
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Question",
  }
);

module.exports = Question;
