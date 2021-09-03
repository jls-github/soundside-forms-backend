const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Submission, handleSequelizeError } = require("./db/db.js");

dotenv.config();

const corsConfig = {
  origin: 
    process.env.NODE_ENV === "production" ? "https://soundsideforms.netlify.app" : "*",
  optionsSuccessStatus: 200,
  methods: ['GET','POST']
};


const port = process.env.PORT || 3000;

const app = express();
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/submissions", async (req, res) => {
  try {
    const organizedSubmissions = Submission.findOrganizedSubmissions()
    res.json({ submissions: organizedSubmissions });
  } catch (err) {
    handleSequelizeError(err, res);
  }
});

app.post("/submissions", async (req, res) => {
  const csv_data = req.body["csv_data"];
  try {
    const submission = await Submission.create({
      csv_data: csv_data,
    });
    res.json({ csv_data: submission["csv_data"] });
  } catch (err) {
    handleSequelizeError(err, res);
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
