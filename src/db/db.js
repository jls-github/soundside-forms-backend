const { Sequelize, DataTypes, Model } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, HOST, DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`
);

async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function synchronizeDatabase() {
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
}

class Form extends Model {}

Form.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Form",
  }
);

class Question extends Model {}

Question.init(
  {
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    input_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Question",
  }
);

class Submission extends Model {}

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

// testDatabase();
// synchronizeDatabase();

module.exports = {
  sequelize,
  testDatabase,
  synchronizeDatabase,
  Form,
  Question,
  Submission,
};
