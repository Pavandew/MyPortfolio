
// ── TYPING ANIMATION ──
const roles = [
  'Android Developer',
  'Kotlin Developer',
  'Jetpack Compose Dev',
  'Fintech App Builder',
  'MVVM Architect',
];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');
function type() {
  const word = roles[ri];
  
  // Update text content character by character
  el.textContent = word.slice(0, ci);

  if (!deleting) {
    // Typing forward
    if (ci < word.length) {
      ci++;
      setTimeout(type, 95);
    } else {
      // Pause at the end of the word
      deleting = true;
      setTimeout(type, 1400); 
    }
  } else {
    // Deleting backward
    if (ci > 0) {
      ci--;
      setTimeout(type, 55);
    } else {
      // Move to the next word
      deleting = false;
      ri = (ri + 1) % roles.length;
      setTimeout(type, 200); // Small pause before starting next word
    }
  }
}

// function type() {
//   const word = roles[ri];
//   el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
//   if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1400); return; }
//   if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; }
//   setTimeout(type, deleting ? 55 : 95);
// }
type();

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.remove('hidden'); e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => { el.classList.add('hidden'); obs.observe(el); });

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.getAttribute('id'); });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
  });
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── CONTACT FORM (opens mail client) ──
function sendMessage() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const msg = document.getElementById('fmessage').value.trim();
  if (!name || !email || !msg) { alert('Please fill in your name, email, and message.'); return; }
  const mailto = `mailto:pavandewangan4@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Enquiry — ' + name)}&body=${encodeURIComponent('Hi Pavan,\n\n' + msg + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
  window.location.href = mailto;
  document.getElementById('formSuccess').style.display = 'block';
}
