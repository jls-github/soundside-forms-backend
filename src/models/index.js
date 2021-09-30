// this file puts model associations together and exports all models as one module

const Form = require("./form.js");
const Submission = require("./submission.js");

// Associations

Submission.belongsTo(Form, {foreignKey: "form_id"});
Form.hasMany(Submission, {foreignKey: "form_id"});

const models = { Submission, Form };

module.exports = models;
