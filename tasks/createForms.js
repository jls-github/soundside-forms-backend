// Creates the basic forms necessary for services.
// This will be deprecated once admins are able to build their own forms.

const Form = require("../src/models/form.js");
const {sequelize} = require('../src/db/db')

async function createForms() {
  await Form.create({ name: "Guest Form", guest: true });
  await Form.create({ name: "Regular Attender Form", guest: false });

  await sequelize.close()

  console.log("Forms created!");
}

createForms()
