const asyncRoute = require("../middleware/asyncRoute");
const authRoute = require("../middleware/authRoute");
const {formsPostSerializer, formsIndexSerializer} = require("../serializers/formsSerializers")
const { Form, Input } = require("../models");

function formsController(app) {
  app.get("/forms/:id", asyncRoute(show));
  app.get("/forms", authRoute, asyncRoute(index));
  app.post("/forms", authRoute, asyncRoute(post));
}

async function index(req, res) {
  const forms = await Form.findAll();
  const formsJson = formsIndexSerializer(forms)
  res.json(formsJson);
}

async function post(req, res) {
  const { guest, name, inputs } = req.body;
  const form = await Form.createWithInputs(guest, name, inputs)
  const formJson = await formsPostSerializer(form)
  res.json({ form: formJson });
}

async function show(req, res) {
  const { id } = req.params;
  const form = await Form.findByPk(id, { include: [{ model: Input }] });
  res.json({ form: form });
}

module.exports = formsController;
