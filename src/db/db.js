const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// environment variables

const {
  NODE_ENV,
  DB_USER,
  HOST,
  DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DATABASE_URL,
} = process.env;

const developmentConnectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`;

// initialize sequelize instance

let sequelize;

if (NODE_ENV === "production") {
  sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(developmentConnectionString);
}

// db helpers

async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  sequelize,
  testDatabase,
};
