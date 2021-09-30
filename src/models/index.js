// this file puts model associations together and exports all models as one module

const Form = require("./form.js");
const Submission = require("./submission.js");
const Question = require("./question.js");
const Input = require("./input");
const FormInput = require("./formInput");

// Associations

// Submission:Form - 1:M

Submission.belongsTo(Form, { foreignKey: "form_id" });
Form.hasMany(Submission, { foreignKey: "form_id" });

// Input:Form - M:N

FormInput.belongsTo(Input, { foreignKey: "input_id" });
FormInput.belongsTo(Form, { foreignKey: "form_id" });
Input.hasMany(FormInput, { foreignKey: "input_id" });
Form.hasMany(FormInput, { foreignKey: "form_id" });
Form.belongsToMany(Input, {through: FormInput})
Input.belongsToMany(Form, {through: FormInput})



const models = { Submission, Form, Question, Input, FormInput };

module.exports = models;
