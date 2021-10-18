const asyncRoute = require("../middleware/asyncRoute");
const authRoute = require("../middleware/authRoute");
const {
  formsPostSerializer,
  formsIndexSerializer,
  formsShowSerializer,
} = require("../serializers/formsSerializers");
const { Form, Input, FormInput } = require("../models");

function formsController(app) {
  app.get("/forms/:id", asyncRoute(show));
  app.get("/forms", authRoute, asyncRoute(index));
  app.post("/forms", authRoute, asyncRoute(post));
  app.patch("/forms/:id", authRoute, asyncRoute(update))
}

async function index(req, res) {
  const forms = await Form.findAll();
  const formsJson = formsIndexSerializer(forms);
  res.json(formsJson);
}

async function post(req, res) {
  const { guest, name, inputs } = req.body;
  const form = await Form.createWithInputs(guest, name, inputs);
  const formJson = await formsPostSerializer(form);
  res.json(formJson);
}

async function show(req, res) {
  const { id } = req.params;
  const form = await Form.findByPk(id, { include: [{ model: Input }] });
  const formJson = formsShowSerializer(form);
  res.json(formJson);
}

async function update(req, res) {
  // Need to abstract this logic away to the model later
  const {id} = req.params
  const {name, guest, inputs} = req.body
  const form = await Form.findByPk(id)
  const updatedForm = await form.update({name, guest})
  for (input of inputs) {
    const currentInput = await Input.findOne({where: {name: input.name}})
    if (!currentInput) {
      const newInput = Input.create(input)
      await form.addInput(newInput);
    } else {
      currentInput.update(input)
    }
  }
  res.json(updatedForm)
}

module.exports = formsController;
