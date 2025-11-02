const STORAGE_KEY = 'spa_itens';

export function loadItems() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addItem(item) {
  const items = loadItems();
  items.push(item);
  saveItems(items);
}

export function removeItem(index) {
  const items = loadItems();
  items.splice(index, 1);
  saveItems(items);
}
