// used only in `npm run initializeModels`

// Creates models in a new database
// Alters models columns in an existing database

const { sequelize } = require("../src/db/db.js");

const Question = require("../src/models/question.js");
const Form = require("../src/models/form.js");
const Submission = require("../src/models/submission.js");

async function resetData() {
    await sequelize.sync({ force: true})
    await sequelize.close()
    console.log("Database reset")
}

resetData()