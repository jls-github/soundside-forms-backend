const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const submissionsController = require("./controllers/submissionsController");
const formsController = require("./controllers/formsController");
const inputsController = require("./controllers/inputsController");
const sessionsController = require("./controllers/sessionsController");

dotenv.config();

const corsConfig = {
  origin: "*",
  // TODO: implement multiple cors instead of all access
  // function(origin, callback) {
  //   if (process.env.NODE_ENV !== "production") {
  //     callback(null, true)
  //   } else if (["https://soundsideforms.netlify.app", "https://soundsidenativity.netlify.app/"].includes(origin)) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH"],
};

const jsonErrorHandler = async (err, req, res, next) => {
  res.status(500).send({ error: err });
}

const port = process.env.PORT || 3000;

const app = express();

// app config

app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// controllers

sessionsController(app);
submissionsController(app);
formsController(app);
inputsController(app);

app.use(jsonErrorHandler);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
