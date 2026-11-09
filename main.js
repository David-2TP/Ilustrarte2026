
/* ── Utilidad de sonido ── */
function playSound(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

/* ── Referencias de audio ── */
const hoverSnd     = document.getElementById('hoverSoundMain');
const clickSnd     = document.getElementById('clickSound');
const clickSnd1    = document.getElementById('clickSound1');
const clickYearSnd = document.getElementById('clickYear1');
const sidebarSnd   = document.getElementById('sidebarButtonSound');

if (hoverSnd)   hoverSnd.volume   = 0.5;
if (clickSnd)   clickSnd.volume   = 0.5;
if (sidebarSnd) sidebarSnd.volume = 0.5;

/* ── Sidebar ── */
const sidebar    = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

menuToggle.addEventListener('click', function (e) {
  sidebar.classList.toggle('active');
  playSound(clickSnd1);
  e.stopPropagation();
});

document.addEventListener('click', function (e) {
  if (!sidebar.contains(e.target) && sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
    playSound(clickSnd1);
  }
});

/* ── Links sidebar con delay ── */
document.querySelectorAll('.sidebar-menu a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    playSound(sidebarSnd);
    const url = this.getAttribute('href');
    setTimeout(function () { window.location.href = url; }, 1200);
  });
});

/* ── Tarjetas: hover + click con delay ── */
document.querySelectorAll('.hud-card[href]').forEach(function (card) {
  card.addEventListener('mouseenter', function () { playSound(hoverSnd); });
  card.addEventListener('click', function (e) {
    e.preventDefault();
    playSound(clickSnd);
    const url    = this.getAttribute('href');
    const target = this.getAttribute('target') || '_self';
    setTimeout(function () { window.open(url, target); }, 600);
  });
});

/* ── Botones de año ── */
function delayNav(id, sound) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', function (e) {
    e.preventDefault();
    playSound(sound);
    const url = this.getAttribute('href');
    setTimeout(function () { window.location.href = url; }, 1200);
  });
}
delayNav('btn20241', clickYearSnd);
delayNav('btn20251', clickYearSnd);
