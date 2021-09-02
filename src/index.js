const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const {
  Submission,
  synchronizeDatabase,
  handleSequelizeError,
} = require("./db/db.js");

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ submissions: submissions });
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
