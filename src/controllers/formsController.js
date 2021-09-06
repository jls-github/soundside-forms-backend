const asyncRoute = require("../utils/asyncRoute");
const Form = require("../models/form.js");

function formsController(app) {
  app.get("/forms", asyncRoute(index))
  app.post("/forms", asyncRoute(post));
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

module.exports = formsController;
