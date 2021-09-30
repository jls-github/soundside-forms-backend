// Creates the basic forms necessary for services.
// This will be deprecated once admins are able to build their own forms.

const {Form} = require("../src/models");
const {sequelize} = require('../src/db/db')

async function seed() {
  console.log("Seeding...")
  await seedForms()
  await sequelize.close()
  console.log("Seeding finished!");
}

async function seedForms() {
  await Form.create({ name: "Guest Form", guest: true });
  await Form.create({ name: "Regular Attender Form", guest: false });
  console.log("Forms seeded!")
}

seed()
