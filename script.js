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

// ─── Loading Screen ───
const loadingEl = document.getElementById('loading');
const loadingBar = document.getElementById('loading-bar');
let prog = 0;
const interval = setInterval(() => {
  prog = Math.min(prog + Math.random() * 12, 95);
  loadingBar.style.width = prog + '%';
}, 80);
window.addEventListener('load', () => {
  clearInterval(interval);
  loadingBar.style.width = '100%';
  setTimeout(() => loadingEl.classList.add('done'), 300);
});

// ─── Theme Toggle ───
const root = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const sunIcon = document.getElementById('theme-icon-sun');
const moonIcon = document.getElementById('theme-icon-moon');
let dark = false;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  root.classList.toggle('dark', dark);
  sunIcon.style.display = dark ? 'none' : '';
  moonIcon.style.display = dark ? '' : 'none';
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

// ─── Custom Cursor ───
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorRing.style.width = '56px'; cursorRing.style.height = '56px'; });
    el.addEventListener('mouseleave', () => { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; });
  });
} else {
  cursor.style.display = 'none';
  cursorRing.style.display = 'none';
}

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
type();

// ─── Intersection Observer for reveal animations ───
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when skills section visible
      const bars = entry.target.querySelectorAll('.skill-bar');
      bars.forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

// Also observe skill cards for bar animation
document.querySelectorAll('.skill-card').forEach(card => {
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 200);
        });
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  barObs.observe(card);
});

// ─── Project Filter ───
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = f === 'All' || card.dataset.category === f;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ─── Feedback Form ───
const feedbackForm = document.getElementById('feedback-form');
const feedbackStatus = document.getElementById('feedback-status');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = feedbackForm.querySelector('.feedback-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      const res = await fetch(feedbackForm.action, {
        method: 'POST',
        body: new FormData(feedbackForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        feedbackStatus.textContent = "Thanks! Your feedback has been sent.";
        feedbackStatus.className = 'feedback-status success';
        feedbackForm.reset();
      } else {
        throw new Error('Submit failed');
      }
    } catch (err) {
      feedbackStatus.textContent = "Couldn't send right now — please email me directly instead.";
      feedbackStatus.className = 'feedback-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send feedback';
    }
  });
}
