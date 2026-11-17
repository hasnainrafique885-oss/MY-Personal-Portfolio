// ─── Theme Toggle ───
const root = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const sunIcon = document.getElementById('theme-icon-sun');
const moonIcon = document.getElementById('theme-icon-moon');
let dark = root.classList.contains('dark');
function applyTheme() {
  root.classList.toggle('dark', dark);
  sunIcon.style.display = dark ? 'none' : '';
  moonIcon.style.display = dark ? '' : 'none';
}
applyTheme();
themeBtn.addEventListener('click', () => {
  dark = !dark;
  applyTheme();
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// ─── Navbar scroll ───
const navInner = document.getElementById('nav-inner');
const logoText = document.getElementById('logo-text');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 30;
  navInner.classList.toggle('scrolled', scrolled);
  logoText.style.display = scrolled ? 'inline' : 'none';
});

// ─── Hamburger ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const hamOpen = document.getElementById('ham-open');
const hamClose = document.getElementById('ham-close');
let menuOpen = false;
hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.setAttribute('aria-expanded', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
  hamOpen.style.display = menuOpen ? 'none' : '';
  hamClose.style.display = menuOpen ? '' : 'none';
});
function closeMob() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamOpen.style.display = '';
  hamClose.style.display = 'none';
}

// ─── Scroll Progress ───
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / total * 100) + '%';
});

// ─── Typewriter ───
const typeEl = document.getElementById('typewriter');
const words = ['backend systems.', 'Django web apps.', 'Flask + MySQL services.', 'scalable REST APIs.'];
let wIdx = 0, cIdx = 0, deleting = false;
function type() {
  const word = words[wIdx % words.length];
  if (!deleting && cIdx === word.length) {
    setTimeout(() => { deleting = true; type(); }, 1400);
    return;
  }
  if (deleting && cIdx === 0) {
    deleting = false;
    wIdx++;
    setTimeout(type, 80);
    return;
  }
  cIdx += deleting ? -1 : 1;
  typeEl.textContent = word.slice(0, cIdx);
  setTimeout(type, deleting ? 40 : 80);
}
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { typeEl.textContent = words[0]; } else { type(); }

// ─── Intersection Observer for reveal animations ───
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

// ─── Contact form ───
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending…';
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error();
    form.reset();
    statusEl.textContent = 'Message sent. Thank you!';
  } catch (err) {
    statusEl.textContent = 'Could not send. Please email me directly instead.';
  }
});
