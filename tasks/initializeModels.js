// used only in `npm run initializeModels`

// Creates models in a new database
// Alters models columns in an existing database

const { sequelize } = require("../src/db/db.js");

const models = Object.values(require("../src/models"));

async function initializeModels(models) {
  for (model of models) {
    await model.sync({ alter: true });
  }
  sequelize.close();
  console.log("Models initialized");
}

initializeModels(models);
