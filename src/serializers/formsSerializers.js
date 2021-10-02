async function formsPostSerializer(form) {
  const inputs = await form.getInputs();

  return {
    name: form.name,
    guest: form.guest,
    inputs: inputs.map((input) => ({
      name: input.name,
      labelText: input.labelText,
      type: input.type,
    })),
  };
}

module.exports = { formsPostSerializer };
