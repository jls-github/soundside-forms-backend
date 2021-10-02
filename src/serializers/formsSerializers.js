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

function formsIndexSerializer(forms) {
  return forms.map((form) => ({
    name: form.name,
    guest: form.guest,
  }));
}

module.exports = { formsPostSerializer, formsIndexSerializer };
