export function getTemplate(id) {
  const tpl = document.getElementById(id);
  if (!tpl) return `<p>Erro: template "${id}" não encontrado.</p>`;
  return tpl.innerHTML;
}

export function renderTo(root, html) {
  root.innerHTML = html;
}
