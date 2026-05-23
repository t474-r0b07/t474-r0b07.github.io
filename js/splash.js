// ── Splash ─────────────────────────────────────────────────────────
(function() {
  const splash = document.getElementById('splash');
  const img    = document.getElementById('splash-img');
  let done = false;

  function enterSite() {
    if (done) return;
    done = true;
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.remove();
      if (typeof main === 'function') main();
    }, 800);
  }

  // light flicker — pulsos aleatorios de brillo
  function scheduleFlicker() {
    const delay = 800 + Math.random() * 1600;
    setTimeout(() => {
      if (done) return;
      img.classList.add('flicker');
      setTimeout(() => {
        img.classList.remove('flicker');
        scheduleFlicker();
      }, 160);
    }, delay);
  }

  scheduleFlicker();

  // 3.5s luego entra al sitio
  setTimeout(enterSite, 3500);
})();
