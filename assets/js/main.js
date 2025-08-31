// Simple mobile nav toggle and active link highlighting
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#menuToggle');
  const nav = document.querySelector('#siteNav');
  if (toggle) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
