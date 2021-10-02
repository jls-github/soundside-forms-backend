const asyncRoute = require("../middleware/asyncRoute");
const authRoute = require("../middleware/authRoute");
const { Input } = require("../models");
const { inputsIndexSerializer } = require("../serializers/inputsSerializers");

function inputsController(app) {
  app.get("/inputs", authRoute, asyncRoute(index));
}

async function index(req, res) {
  const inputs = await Input.findAll();
  const inputsJson = inputsIndexSerializer(inputs)
  res.json(inputsJson);
}

module.exports = inputsController;
