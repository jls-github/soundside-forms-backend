function inputsIndexSerializer(inputs) {
  return inputs.map((input) => ({
    name: input.name,
    labelText: input.labelText,
    type: input.type,
  }));
}

module.exports = { inputsIndexSerializer };
