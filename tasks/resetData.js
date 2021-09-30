// used only in `npm run initializeModels`

// Creates models in a new database
// Alters models columns in an existing database

const { sequelize } = require("../src/db/db.js");

const Question = require("../src/models.js");
const Form = require("../src/models.js");
const Submission = require("../src/models.js");

async function resetData() {
    await sequelize.sync({ force: true})
    await sequelize.close()
    console.log("Database reset")
}

resetData()