// this file puts model associations together and exports all models as one module

const Form = require("./form.js");
const Submission = require("./submission.js");
const Question = require("./question.js");
const Input = require("./input");
const FormInput = require("./formInput");

// Associations

// Submission:Form - 1:M

Submission.belongsTo(Form);
Form.hasMany(Submission, { onDelete: "cascade", hooks: true });

// Input:Form - M:N

FormInput.belongsTo(Input);
FormInput.belongsTo(Form);
Input.hasMany(FormInput, { onDelete: "cascade", hooks: true });
Form.hasMany(FormInput, { onDelete: "cascade", hooks: true });
Form.belongsToMany(Input, { through: FormInput, foreignKey: "formId" });
Input.belongsToMany(Form, { through: FormInput, foreignKey: "inputId" });

const models = { Submission, Form, Question, Input, FormInput };

module.exports = models;
