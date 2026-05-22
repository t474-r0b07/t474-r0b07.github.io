// ── Splash ─────────────────────────────────────────────────────────
(function() {
  const splash = document.getElementById('splash');
  const wrap   = document.getElementById('splash-wrap');
  let done = false;

  function enterSite() {
    if (done) return;
    done = true;
    wrap.classList.remove('glitch-active');
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.remove();
      if (typeof main === 'function') main();
    }, 800);
  }

  // glitch pulses: short bursts randomly
  function scheduleGlitch() {
    const delay = 1200 + Math.random() * 1800;
    setTimeout(() => {
      if (done) return;
      wrap.classList.add('glitch-active');
      setTimeout(() => {
        wrap.classList.remove('glitch-active');
        scheduleGlitch();
      }, 180 + Math.random() * 160);
    }, delay);
  }
  scheduleGlitch();

  // show for 3.5s then enter
  setTimeout(enterSite, 3500);
})();