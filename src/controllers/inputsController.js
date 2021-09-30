const asyncRoute = require("../middleware/asyncRoute");
const { Input } = require("../models");

function inputsController(app) {
  app.get("/inputs", asyncRoute(index));
}

async function index(req, res) {
  const inputs = await Input.findAll();
  res.json(inputs);
}

module.exports = inputsController;
