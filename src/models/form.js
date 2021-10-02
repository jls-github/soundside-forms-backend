const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js");
const Input = require("./input.js");

// TODO: create slug
// TODO: validate uniqueness of slug
// TODO: validate against empty strings

class Form extends Model {
  static async createWithInputs(guest, name, inputs) {
    const form = await Form.create({ guest: guest, name: name });
    // TODO: abstract input creation into helper function
    if (inputs) {
      for (const input of inputs) {
        const [newInput] = await Input.findOrCreate({
          where: { ...input },
        });
        await form.addInput(newInput);
      }
    }
    return form;
  }
}

Form.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    guest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Form",
  }
);

module.exports = Form;
