// Helper to load HTML into an element by id
function loadHTML(id, url) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Element with id "${id}" not found.`);
    return Promise.reject(`Element with id "${id}" not found.`);
  }
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.text();
    })
    .then(html => {
      el.innerHTML = html;
    })
    .catch(err => console.error(`Failed to load ${url}:`, err));
}

document.addEventListener('DOMContentLoaded', () => {
  // Load header and footer (return Promises to handle async)
  Promise.all([
    loadHTML('header-placeholder', 'header.html'),
    loadHTML('footer-placeholder', 'footer.html')
  ]).then(() => {
    // After header loads, set active nav-link
    const header = document.getElementById('header-placeholder');
    if (!header) return;

    const links = header.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
      // Normalize href to filename only, ignoring possible query params
      const linkHref = link.getAttribute('href').split('?')[0];
      if (linkHref === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }).catch(err => {
    console.error('Error loading header or footer:', err);
  });
});
