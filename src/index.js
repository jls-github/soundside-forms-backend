const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Submission, handleSequelizeError } = require("./db/db.js");

const corsConfig = {
  origin:
    process.env.NODE_ENV === "production" ? "https://soundsideforms.netlify.app" : "*",
  optionsSuccessStatus: 200,
};

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors(corsConfig));

app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Submission.findAll({
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
    res.json({ submissions: organizedSubmissions });
  } catch (err) {
    handleSequelizeError(err, res);
  }
});

app.post("/submissions", async (req, res) => {
  const csvData = req.body["csv_data"];
  try {
    const submission = await Submission.create({
      csv_data: csvData,
    });
    res.json({ csv_data: submission["csv_data"] });
  } catch (err) {
    handleSequelizeError(err, res);
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
