// ─── Marquee (generated, not hardcoded twice) ───
const MARQUEE_SKILLS = ['Python','Django','FastAPI','Flask','MySQL','REST APIs','Werkzeug','Git'];
const sparkSvg = '<span class="marquee-spark"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg></span>';
function buildMarqueeGroup() {
  const group = document.createElement('div');
  group.className = 'marquee-item';
  group.innerHTML = MARQUEE_SKILLS.map(s => `${s} ${sparkSvg}`).join(' ');
  return group;
}
const marqueeTrack = document.getElementById('marquee-track');
// Two copies back-to-back so the shimmer animation loops seamlessly
marqueeTrack.appendChild(buildMarqueeGroup());
marqueeTrack.appendChild(buildMarqueeGroup());

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
const words = ['backend systems.', 'Django + FastAPI APIs.', 'Flask + MySQL services.', 'scalable REST APIs.'];
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
