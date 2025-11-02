export function validateForm(form) {
  const nome = form.nome.value.trim();
  const quantidade = form.quantidade.value.trim();
  const validade = form.validade.value.trim();

  const errors = {};

  if (!nome) errors.nome = 'O nome é obrigatório.';
  if (!quantidade || isNaN(quantidade) || Number(quantidade) <= 0)
    errors.quantidade = 'Informe uma quantidade válida.';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: { nome, quantidade, validade }
  };
}

export function showErrors(form, errors) {
  for (const [name, msg] of Object.entries(errors)) {
    const field = form[name];
    const small = field?.parentElement.querySelector('.error-msg');
    if (small) small.textContent = msg;
    field.classList.add('error');
  }
}

export function clearErrors(form) {
  form.querySelectorAll('.error-msg').forEach(el => (el.textContent = ''));
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}
