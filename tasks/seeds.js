// Creates the basic forms necessary for services.
// This will be deprecated once admins are able to build their own forms.

const models = require("../src/models");
const { sequelize } = require("../src/db/db");

const { Form, Input } = models;

async function seed() {
  await resetModelData();

  console.log("Seeding new data...");

  await seedForms();
  await seedInputs();
  await seedFormInputs();

  await sequelize.close();

  console.log("Seeding finished!");
}

async function resetModelData() {
  console.log("Destroying old data...");
  for (model in models) {
    await models[model].destroy({ where: {} });
  }
  console.log("Old data destroyed!");
}

async function seedForms() {
  console.log("Seeding forms...");
  await Form.create({ name: "Guest Form", guest: true });
  await Form.create({ name: "Regular Attender Form", guest: false });
  console.log("Forms seeded!");
}

async function seedInputs() {
  console.log("Seeding inputs...");
  await Input.create({
    labelText: "Name",
    name: "name",
    type: "text",
  });
  await Input.create({
    labelText: "Email",
    name: "email",
    type: "email",
  });
  await Input.create({
    labelText: "Preferred Contact",
    name: "preferred_contact",
    type: "text",
  });
  await Input.create({
    labelText: "I want to talk to a pastor",
    name: "pastor",
    type: "checkbox",
  });
  await Input.create({
    labelText: "I have a prayer request",
    name: "prayer",
    type: "checkbox",
  });
  await Input.create({
    labelText: "I want to know more about following Christ",
    name: "follow",
    type: "checkbox",
  });
  await Input.create({
    labelText: "Any prayer requests?",
    name: "explain",
    type: "textarea",
  });

  console.log("Inputs seeded!");
}

async function seedFormInputs() {
  const guestForm = await Form.findOne({ where: { name: "Guest Form" } });
  const memberForm = await Form.findOne({
    where: { name: "Regular Attender Form" },
  });

  const nameInput = await Input.findOne({ where: { name: "name" } });
  const emailInput = await Input.findOne({ where: { name: "email" } });

  await guestForm.addInputs([nameInput, emailInput]);

  await memberForm.addInput(nameInput);
}

seed();
