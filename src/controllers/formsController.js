const asyncRoute = require("../middleware/asyncRoute");
const authRoute = require("../middleware/authRoute");
const { Form, Input } = require("../models");

function formsController(app) {
  app.get("/forms/:id", asyncRoute(show));
  app.get("/forms", authRoute, asyncRoute(index));
  app.post("/forms", authRoute, asyncRoute(post));
}

async function index(req, res) {
  const forms = await Form.findAll();
  res.json(forms);
}

async function post(req, res) {
  const { guest, name, inputs } = req.body;
  const form = await Form.create({ guest: guest, name: name });
  if (inputs) {
    for (input of inputs) {
      const [newInput] = await Input.findOrCreate({
        where: { ...input },
      });
      await form.addInput(newInput);
    }
  }
  res.json({ form: form });
}

async function show(req, res) {
  const { id } = req.params;
  const form = await Form.findByPk(id, { include: [{ model: Input }] });
  res.json({ form: form });
}

module.exports = formsController;
