const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Submission } = require("./db/db.js");

dotenv.config();

const corsConfig = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://soundsideforms.netlify.app"
      : "*",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST"],
};

function asyncExpressRoute(fn) {
  return function (...args) {
    fn(...args).catch(args[2]);
  };
}

function handleExpressError(error, req, res, next) {
  res.status(500).json({ error: error });
}

const port = process.env.PORT || 3000;

const app = express();
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get(
  "/submissions",
  asyncExpressRoute(async (req, res) => {
    const organizedSubmissions = Submission.findOrganizedSubmissions();
    res.json({ submissions: organizedSubmissions });
  })
);

app.post(
  "/submissions",
  asyncExpressRoute(async (req, res) => {
    const csv_data = req.body["csv_data"];
    const submission = await Submission.create({
      csv_data: csv_data,
    });
    res.json({ csv_data: submission["csv_data"] });
    handleExpressError(err, res);
  })
);

app.use(handleExpressError);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
