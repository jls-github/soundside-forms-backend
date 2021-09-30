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
    labelText: "I want to know more about following Christ",
    name: "follow",
    type: "checkbox",
  });
  await Input.create({
    labelText: "Any prayer requests?",
    name: "prayer",
    type: "textarea",
  });
  await Input.create({
    labelText: "How many gospel conversations did you have this week?",
    name: "gospel_conversations",
    type: "number",
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
  const preferredContactInput = await Input.findOne({
    where: { name: "preferred_contact" },
  });
  const pastorInput = await Input.findOne({ where: { name: "pastor" } });
  const followInput = await Input.findOne({ where: { name: "follow" } });
  const prayerInput = await Input.findOne({ where: { name: "prayer" } });
  const gospelConversationsInput = await Input.findOne({
    where: { name: "gospel_conversations" },
  });

  await guestForm.addInputs([
    nameInput,
    emailInput,
    preferredContactInput,
    pastorInput,
    followInput,
    prayerInput,
  ]);
  await memberForm.addInput([nameInput, gospelConversationsInput, prayerInput]);
}

seed();
