const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const submissionsController = require("./controllers/submissionsController.js");
const formsController = require("./controllers/formsController.js");

dotenv.config();

const corsConfig = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://soundsideforms.netlify.app"
      : "*",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST"],
};

function handleExpressError(error, req, res, next) {
  res.status(500).json({ error: error });
}

const port = process.env.PORT || 3000;

const app = express();

// app config

app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// controllers

submissionsController(app);
formsController(app);

app.use(handleExpressError);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
