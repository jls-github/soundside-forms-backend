const asyncRoute = require("../middleware/asyncRoute");
const {Form, Input} = require("../models");

function formsController(app) {
  app.get("/forms/:id", asyncRoute(show))
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

async function show(req, res) {
  const {id} = req.params
  const form = await Form.findByPk(id, {include: [{model: Input}]})
  res.json({form: form})
}

module.exports = formsController;
