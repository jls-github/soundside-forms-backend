const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js");

class Submission extends Model {
  static async findOrganizedSubmissions() {
    const submissions = await this.findAll({
      order: [["createdAt", "DESC"]],
    });
    const organizedSubmissions = {};
    submissions.forEach((submission) => {
      const submissionDate = submission.dataValues.createdAt
        .toString()
        .substring(0, 15);
      if (!organizedSubmissions[submissionDate]) {
        organizedSubmissions[submissionDate] = [submission["csv_data"]];
      } else {
        organizedSubmissions[submissionDate].push(submission["csv_data"]);
      }
    });
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
      allowNull: false
    },
  },
  { sequelize, modelName: "Submission" }
);

module.exports = Submission;
