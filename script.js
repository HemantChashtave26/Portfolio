// ── Custom Cursor (desktop only) ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .project-row, .bento-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.width = '50px';
      follower.style.height = '50px';
      follower.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.width = '32px';
      follower.style.height = '32px';
      follower.style.opacity = '1';
    });
  });
}

// ── Mobile Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu() {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  navOverlay.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  nav.classList.remove('open');
  hamburger.classList.remove('open');
  navOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});

// ── Header scroll shadow ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => { a.style.color = ''; a.style.background = ''; });
      const active = document.querySelector(`nav a[href="#${e.target.id}"]`);
      if (active) {
        active.style.color = 'var(--accent)';
        active.style.background = 'var(--accent-soft)';
      }
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── Pill entrance animation ──
document.querySelectorAll('.pill').forEach((pill, i) => {
  pill.style.opacity = '0';
  pill.style.transform = 'translateY(10px)';
  pill.style.transition = `opacity 0.4s ${0.5 + i * 0.08}s, transform 0.4s ${0.5 + i * 0.08}s`;
  setTimeout(() => {
    pill.style.opacity = '1';
    pill.style.transform = 'translateY(0)';
  }, 100);
});