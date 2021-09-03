const { sequelize } = require("./db.js");

const Question = require("../models/question.js");
const Form = require("../models/form.js");
const Submission = require("../models/submission.js");

async function initializeModels(models) {
  for (model of models) {
    await model.sync({ alter: true });
  }
  sequelize.close();
  console.log("Models initialized")
}

initializeModels([Question, Form, Submission]);
