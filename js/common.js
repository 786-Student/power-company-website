// Helper to load HTML into an element by id
function loadHTML(id, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(err => console.error(`Failed to load ${url}:`, err));
}

document.addEventListener('DOMContentLoaded', () => {
  // Load header and footer
  loadHTML('header-placeholder', 'header.html');
  loadHTML('footer-placeholder', 'footer.html');

  // After header loads, set active nav-link
  function setActiveNav() {
    const links = document.querySelectorAll('#header-placeholder .nav-link');
    const current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Wait for header content to load before setting active class
  const headerObserver = new MutationObserver(() => {
    setActiveNav();
    headerObserver.disconnect();
  });

  headerObserver.observe(document.getElementById('header-placeholder'), { childList: true });
});
