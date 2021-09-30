// used only in `npm run resetDBß`

// Creates models in a new database
// Alters models columns in an existing database

const { sequelize } = require("../src/db/db.js");

const models = require("../src/models");

async function resetData() {
  await sequelize.sync({ force: true });
  await sequelize.close();
  console.log("Database reset");
}

resetData();
