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
    id: form.id,
  };
}

function formsIndexSerializer(forms) {
  // TODO: remove id from serialization once slugs are implemented
  return forms.map((form) => ({
    name: form.name,
    guest: form.guest,
    id: form.id,
  }));
}

function formsShowSerializer(form) {
  return {
    name: form.name,
    guest: form.guest,
    inputs: form.Inputs?.map((input) => ({
      name: input.name,
      labelText: input.labelText,
      type: input.type,
    })),
  };
}

module.exports = {
  formsPostSerializer,
  formsIndexSerializer,
  formsShowSerializer,
};
