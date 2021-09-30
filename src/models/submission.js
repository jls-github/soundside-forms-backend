const { Model, DataTypes } = require("sequelize");
const Form = require("./form.js");
const { sequelize } = require("../db/db.js");

class Submission extends Model {
  static async findOrganizedSubmissions() {
    const submissions = await this.findAll({
      order: [["createdAt", "DESC"]],
    });
    const organizedSubmissions = {};
    for (const submission of submissions) {
      const submissionDate = submission.dataValues.createdAt
        .toString()
        .substring(0, 15);

      const form = await Form.findByPk(submission.dataValues.form_id);

      const guestStatus = form.guest;

      const csvTitle = `${submissionDate} - ${
        guestStatus ? "Guest" : "Regular Attender"
      }`;

      if (!organizedSubmissions[csvTitle]) {
        organizedSubmissions[csvTitle] = [submission["csv_data"]];
      } else {
        organizedSubmissions[csvTitle].push(submission["csv_data"]);
      }
    }
    return organizedSubmissions;
  }
}

Submission.init(
  {
    csv_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Submission" }
);

Submission.associate = function(models) {
  User.belongsTo(models.Form, {foreignKey: 'form_id', as: 'form'})
}

module.exports = Submission;
