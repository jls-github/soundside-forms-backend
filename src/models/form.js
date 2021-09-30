
   
const { Model, DataTypes } = require("sequelize");
const Submission = require("./submission.js");
const { sequelize } = require("../db/db.js");

class Form extends Model {}

Form.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    guest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Form",
  }
);

module.exports = Form;