const asyncRoute = require("../middleware/asyncRoute");
const authRoute = require("../middleware/authRoute");
const { Input } = require("../models");

function inputsController(app) {
  app.get("/inputs", authRoute, asyncRoute(index));
}

async function index(req, res) {
  const inputs = await Input.findAll();
  res.json(inputs);
}

module.exports = inputsController;
