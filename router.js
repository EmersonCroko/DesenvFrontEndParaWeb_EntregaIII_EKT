import { getTemplate, renderTo } from './templates.js';
import { loadItems, addItem, removeItem } from './storage.js';
import { validateForm, showErrors, clearErrors } from './formValidation.js';

const routes = {
  '/': () => getTemplate('tpl-home'),
  '/cadastro': () => getTemplate('tpl-cadastro'),
  '/lista': () => getTemplate('tpl-lista')
};

function parseHash(hash) {
  if (!hash || hash === '#/' || hash === '#') return '/';
  return hash.replace('#', '');
}

export function initRouter(rootSelector) {
  const root = document.querySelector(rootSelector);

  function render() {
    const path = parseHash(location.hash);
    const view = (routes[path] || routes['/'])();
    renderTo(root, view);
    attachBehaviors(path);
  }

  window.addEventListener('hashchange', render);
  render();
}

function attachBehaviors(path) {
  if (path === '/cadastro') {
    const form = document.getElementById('form-cadastro');
    const btnCancel = document.getElementById('btn-cancel');
    clearErrors(form);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const { valid, errors, data } = validateForm(form);
      if (!valid) {
        showErrors(form, errors);
        return;
      }

      addItem({
        nome: data.nome.trim(),
        quantidade: Number(data.quantidade),
        validade: data.validade || null,
        createdAt: new Date().toISOString()
      });

      alert('Item salvo com sucesso!');
      location.hash = '#/lista';
    });

    btnCancel.addEventListener('click', () => {
      location.hash = '#/';
    });
  }

  if (path === '/lista') {
    const container = document.getElementById('lista-container');
    const items = loadItems();

    if (items.length === 0) {
      container.innerHTML = '<p>Nenhum item cadastrado.</p>';
      return;
    }

    const list = document.createElement('div');
    items.forEach((it, idx) => {
      const node = document.createElement('div');
      node.className = 'item';
      node.innerHTML = `
        <div>
          <strong>${escapeHtml(it.nome)}</strong>
          <div class="meta">Qtd: ${it.quantidade} — Validade: ${it.validade || '—'}</div>
        </div>
        <div>
          <button data-del="${idx}" class="btn-secondary">Remover</button>
        </div>
      `;
      list.appendChild(node);
    });

    container.innerHTML = '';
    container.appendChild(list);

    container.querySelectorAll('button[data-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-del'));
        if (confirm('Remover este item?')) {
          removeItem(i);
          location.hash = '#/lista';
        }
      });
    });
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>\"']/g, s =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', '\'': '&#39;' }[s])
  );
}
