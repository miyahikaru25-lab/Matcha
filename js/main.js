'use strict';

/* ---- Header background on scroll ---- */
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---- Mobile navigation drawer ---- */
const toggle  = document.getElementById('navToggle');
const nav     = document.getElementById('primaryNav');
const overlay = document.getElementById('navOverlay');

const openNav = () => {
  nav.classList.add('open');
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('show'));
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'メニューを閉じる');
  document.body.style.overflow = 'hidden';
};
const closeNav = () => {
  nav.classList.remove('open');
  overlay.classList.remove('show');
  setTimeout(() => { overlay.hidden = true; }, 300);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'メニューを開く');
  document.body.style.overflow = '';
};

toggle.addEventListener('click', () => {
  nav.classList.contains('open') ? closeNav() : openNav();
});
overlay.addEventListener('click', closeNav);
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
});

/* ---- Scroll reveal ---- */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // small stagger for siblings revealed together
        el.style.transitionDelay = `${Math.min(i * 80, 240)}ms`;
        el.classList.add('in');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

/* ---- Contact form (demo, no backend) ---- */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name  = form.name.value.trim();
  const email = form.email.value.trim();
  const msg   = form.message.value.trim();
  const valid = name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && msg;

  if (!valid) {
    note.textContent = 'すべての項目を正しくご入力ください。';
    note.classList.add('error');
    return;
  }
  note.classList.remove('error');
  note.textContent = `${name} 様、お問い合わせありがとうございます。内容を確認のうえ折り返しご連絡いたします。`;
  form.reset();
});
