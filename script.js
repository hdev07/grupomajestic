
// LOADER
let pct = 0;
const lnum = document.getElementById('lnum');
const lt = setInterval(() => {
  pct += Math.random() * 18;
  if (pct >= 100) { pct = 100; clearInterval(lt); }
  lnum.textContent = Math.floor(pct) + '%';
}, 120);
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('h');
    document.getElementById('hi').classList.add('l');
  }, 1700);
});

// CURSOR
const cur = document.getElementById('c'), ring = document.getElementById('cr');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function anim() {
  rx += (mx - rx) * .1; ry += (my - ry) * .1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(anim);
})();

// NAV
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('s', scrollY > 60);
});

// REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: .1 });
document.querySelectorAll('.r').forEach(el => obs.observe(el));

// COUNTERS
let done = false;
const sObs = new IntersectionObserver(e => {
  if (e[0].isIntersecting && !done) {
    done = true;
    cnt('s1', 200, 2000); cnt('s2', 10, 1600); cnt('s3', 8, 1400);
  }
}, { threshold: .5 });
sObs.observe(document.querySelector('.stats-row'));
function cnt(id, target, dur) {
  const el = document.getElementById(id), s = performance.now();
  (function u(now) {
    const p = Math.min((now - s) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target);
    if (p < 1) requestAnimationFrame(u);
  })(s);
}

// TESTIMONIALS
const tests = [
  { q: 'Grupo Majestic no solo organizó nuestra boda, creó la experiencia más mágica de nuestras vidas. Cada detalle superó lo que habíamos imaginado.', a: 'Sofía & Diego · Valle de Bravo, 2024' },
  { q: 'Desde la primera reunión supimos que estábamos en las manos perfectas. Nuestra boda en San Miguel fue exactamente como la soñamos, pero mejor.', a: 'Valentina & Andrés · San Miguel de Allende, 2024' },
  { q: 'Nuestros invitados siguen hablando de nuestra boda. La producción, las flores, la atmósfera — absolutamente todo fue impecable e inolvidable.', a: 'Isabella & Carlos · Los Cabos, 2023' }
];
let ti = 0;
function goTest(i) {
  ti = i;
  const tq = document.getElementById('tq'), ta = document.getElementById('ta');
  tq.style.opacity = '0'; tq.style.transform = 'translateY(12px)';
  setTimeout(() => {
    tq.textContent = tests[i].q; ta.textContent = tests[i].a;
    tq.style.transition = 'opacity .6s ease,transform .6s ease';
    tq.style.opacity = '1'; tq.style.transform = 'translateY(0)';
  }, 280);
  document.querySelectorAll('.test-btn').forEach((b, j) => b.classList.toggle('a', j === i));
}
setInterval(() => goTest((ti + 1) % 3), 5500);

// PARTICLES
const pc = document.getElementById('pc'), ctx = pc.getContext('2d');
function res() { pc.width = innerWidth; pc.height = innerHeight; }
res(); window.addEventListener('resize', res);
const pts = Array.from({ length: 40 }, () => ({
  x: Math.random() * innerWidth, y: Math.random() * innerHeight,
  vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
  r: Math.random() * 1.2 + .3, a: Math.random() * .3 + .05
}));
(function draw() {
  ctx.clearRect(0, 0, pc.width, pc.height);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = pc.width; if (p.x > pc.width) p.x = 0;
    if (p.y < 0) p.y = pc.height; if (p.y > pc.height) p.y = 0;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,169,126,${p.a})`; ctx.fill();
  });
  requestAnimationFrame(draw);
})();

// PARALLAX
window.addEventListener('scroll', () => {
  const y = scrollY;
  const hi = document.querySelector('.hero-img');
  if (hi) hi.style.transform = `scale(1.02) translateY(${y * .35}px)`;
});

// FORM
document.getElementById('fsub').addEventListener('click', function () {
  const orig = this.textContent;
  this.textContent = 'Enviado — Te contactamos pronto ✓';
  this.style.background = 'rgba(200,169,126,.18)';
  this.style.color = 'var(--gold)';
  setTimeout(() => { this.textContent = orig; this.style.background = 'var(--gold)'; this.style.color = 'var(--bg)'; }, 3500);
});