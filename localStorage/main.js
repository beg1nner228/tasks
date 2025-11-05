// Improved bookmarks manager
// - stores objects {id, url, title}
// - validates URLs, prevents duplicates
// - supports form submit or Enter key, and 'change' fallback
// - syncs changes across tabs (storage event)

const list = document.querySelector("#bookmarkList");
const input = document.querySelector("#bookmarkInput");
const form = document.querySelector("#bookmarkForm"); // optional — if present we'll use submit

let bookmarksList = JSON.parse(localStorage.getItem("bookmarksArray")) || [];

markup(bookmarksList);

function save() {
  localStorage.setItem("bookmarksArray", JSON.stringify(bookmarksList));
}

function normalizeUrl(raw) {
  if (!raw) return null;
  try {
    // allow user to enter without protocol
    const hasProtocol = raw.includes("://");
    const url = new URL(hasProtocol ? raw : `https://${raw}`);
    return url.href;
  } catch (err) {
    return null;
  }
}

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function addBookmark(raw) {
  const url = normalizeUrl(raw && raw.trim());
  if (!url) return false; // invalid
  // prevent exact duplicate urls
  if (bookmarksList.some(b => b.url === url)) return false;
  const id = generateId();
  const title = new URL(url).hostname;
  bookmarksList.push({ id, url, title });
  save();
  markup(bookmarksList);
  return true;
}

// prefer submit if there's a form; otherwise support change and Enter key
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (addBookmark(input.value)) input.value = '';
  });
} else {
  input.addEventListener('change', (e) => {
    if (addBookmark(input.value)) input.value = '';
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (addBookmark(input.value)) input.value = '';
    }
  });
}

function markup(arr) {
  if (!arr || arr.length === 0) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML = arr.map(item => `
    <li data-id="${item.id}">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
      <span class="url">${item.url}</span>
      <button class="delete" data-id="${item.id}" aria-label="Delete bookmark">X</button>
    </li>
  `).join('');
}

// event delegation for deletes
list.addEventListener('click', (e) => {
  const btn = e.target.closest('button.delete');
  if (!btn) return;
  const id = btn.dataset.id;
  bookmarksList = bookmarksList.filter(item => item.id !== id);
  save();
  markup(bookmarksList);
});

// sync between tabs/windows
window.addEventListener('storage', (e) => {
  if (e.key === 'bookmarksArray') {
    bookmarksList = JSON.parse(e.newValue) || [];
    markup(bookmarksList);
  }
});
