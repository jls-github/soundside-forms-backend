const asyncRoute = require("../utils/asyncRoute");
const Form = require("../models/form.js");

function formsController(app) {
  app.post("/forms", asyncRoute(post));
}

async function post(req, res) {
  const { guest, name } = req.body;
  const form = await Form.create({ guest: guest, name: name });
  res.json({ form: form });
}

module.exports = formsController;
