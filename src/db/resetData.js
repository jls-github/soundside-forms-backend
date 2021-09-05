// used only in `npm run initializeModels`

// Creates models in a new database
// Alters models columns in an existing database

const { sequelize } = require("./db.js");

const Question = require("../models/question.js");
const Form = require("../models/form.js");
const Submission = require("../models/submission.js");

async function resetData() {
    await sequelize.sync({ force: true})
    await sequelize.close()
    console.log("Database reset")
}

resetData()