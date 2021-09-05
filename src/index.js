const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Submission = require("./models/submission.js");
const Form = require("./models/form.js");

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
    const { csv_data, form_id } = req.body;
    const submission = await Submission.create({
      csv_data: csv_data,
      form_id: form_id,
    });
    res.json({ csv_data: submission["csv_data"] });
  })
);

app.post(
  "/forms",
  asyncExpressRoute(async (req, res) => {
    const { guest, name } = req.body;
    const form = await Form.create({ guest: guest, name: name });
    res.json({ form: form });
  })
);

app.use(handleExpressError);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
