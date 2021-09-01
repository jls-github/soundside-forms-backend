const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, HOST, DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`);

async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabase()
