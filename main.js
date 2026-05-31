// ===========================
//   MILKIBEE — main.js
// ===========================

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .flavor-tab, .benefit-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.opacity = '0.6';
    });
  });
}

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- Flavor Tabs ----
const tabs = document.querySelectorAll('.flavor-tab');
const panels = document.querySelectorAll('.flavor-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetFlavor = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const targetPanel = document.getElementById('panel-' + targetFlavor);
    if (targetPanel) targetPanel.classList.add('active');
  });
});

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll(
  '.benefit-card, .testi-card, .about-card-float, .feature-item, .contact-channel'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// ---- Smooth Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--honey-dark)';
    }
  });
});

// ---- Contact Form Submit ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = '⏳ Mengirim...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✅ Pesan Terkirim!';
    const success = document.getElementById('form-success');
    if (success) success.classList.add('show');

    // Reset after 3s
    setTimeout(() => {
      btn.textContent = 'Kirim Pesan 🐝';
      btn.disabled = false;
      success.classList.remove('show');
    }, 4000);
  }, 1200);
}

// ---- Animate numbers on scroll ----
function animateNumber(el, target, duration = 1500) {
  let start = 0;
  const isPercent = target.toString().includes('%');
  const num = parseInt(target);
  const step = (num / duration) * 16;
  const timer = setInterval(() => {
    start += step;
    if (start >= num) {
      el.textContent = isPercent ? num + '%' : num;
      clearInterval(timer);
    } else {
      el.textContent = isPercent ? Math.floor(start) + '%' : Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const val = el.textContent.trim();
        if (val === '4') animateNumber(el, 4, 800);
        if (val === '100%') {
          setTimeout(() => { el.textContent = '100%'; }, 600);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ---- Parallax Effect on Hero Blobs ----
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  if (blob1) blob1.style.transform = `translateY(${scrollY * 0.3}px)`;
  if (blob2) blob2.style.transform = `translateY(${-scrollY * 0.2}px)`;
});

console.log('%c🐝 Milkibee', 'font-size:24px;color:#F4A623;font-weight:bold');
console.log('%cWebsite by Milkibee — Rasa Alam dalam Setiap Tegukan', 'color:#7A5C3A');
