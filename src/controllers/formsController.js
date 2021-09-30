const asyncRoute = require("../utils/asyncRoute");
const {Form} = require("../models");

function formsController(app) {
  app.get("/forms", asyncRoute(index))
  app.post("/forms", asyncRoute(post));
  app.get("/forms-submissions", asyncRoute(submissions))
}

async function index(req, res) {
  const forms = await Form.findAll()
  res.json(forms)
}

async function post(req, res) {
  const { guest, name } = req.body;
  const form = await Form.create({ guest: guest, name: name });
  res.json({ form: form });
}

async function submissions(req, res) {
  const forms = await Form.findAll()
  const form = forms[0]
  const submissions = form.submissions
  res.json({submissions: submissions})
}

module.exports = formsController;
