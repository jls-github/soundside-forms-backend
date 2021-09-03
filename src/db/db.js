const { Sequelize, DataTypes, Model } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

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

let sequelize

if (NODE_ENV === "production") {
    sequelize = new Sequelize(DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    sequelize = new Sequelize(developmentConnectionString)
}

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
  sequelize.close()
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
    },
  },
  { sequelize, modelName: "Submission" }
);

module.exports = {
  sequelize,
  testDatabase,
  synchronizeDatabase,
  Form,
  Question,
  Submission,
};
