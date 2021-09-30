const {Submission} = require("../models");
const asyncRoute = require("../utils/asyncRoute");
const authRoute = require("../utils/authRoute");

function submissionsController(app) {
  app.post("/submissions", asyncRoute(post));
  app.get("/submissions", authRoute, asyncRoute(index));
}

async function index(req, res) {
  const organizedSubmissions = await Submission.findOrganizedSubmissions();
  res.json({ submissions: organizedSubmissions });
}

async function post(req, res) {
  const { csv_data, form_id } = req.body;
  const submission = await Submission.create({
    csv_data: csv_data,
    form_id: form_id,
  });
  res.json({ csv_data: submission["csv_data"] });
}

module.exports = submissionsController;
