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
      // ── deep link: ?post=id navega directo al detalle de anti_hype ──
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('post');
      const POSTS  = {
        'grooming-lo-que-el-miedo-no-explica': {
          id:'grooming-lo-que-el-miedo-no-explica',
          title:'GROOMING: LO QUE EL MIEDO NO EXPLICA',
          subtitle:'analisis tecnico, patrones de comportamiento y evidencia digital.',
          trigger:'contenido viral dice "sabes con quien habla tu hijo". miles de reacciones. ningun dato. ninguna metodologia. solo miedo.',
          verdict:'El grooming tiene etapas documentadas. La evidencia digital existe. Y si un padre toca el dispositivo sin protocolo, destruye las pruebas sin saberlo. El miedo no protege. El conocimiento si.',
          lines:[
            '4 de cada 10 menores en latinoamerica hablo con desconocidos en linea.',
            '3 de cada 4 no sabe que es el grooming.',
            'Bolivia esta en ese estudio.',
            '---',
            'Etapas: amistad / relacion / evaluacion de riesgo / exclusividad / componente sexual / mantenimiento.',
            'Vectores: Steam, Discord, TikTok, WhatsApp, grupos de Facebook.',
            'Evidencia: metadatos, IP, hashes. Fragil. Requiere protocolo.',
            '---',
            '// un p4dr3 1nf0rm4d0 4ctua. un p4dr3 c0n m13d0 s0l0 r34cc10n4.',
          ],
          url:'https://github.com/t474-r0b07/t474-r0b07/blob/main/anti_hype/grooming-lo-que-el-miedo-no-explica.md',
        },
        'controles-parentales-el-firewall-que-se-rompe': {
          id:'controles-parentales-el-firewall-que-se-rompe',
          title:'CONTROLES PARENTALES: EL FIREWALL QUE SE ROMPE',
          subtitle:'cuatro posturas, una realidad y por que la crianza sigue ganando.',
          trigger:'comentarios despues del post de grooming: "eso es de progres", "yo uso control parental", "no es para tanto", "lo importante es hablar".',
          verdict:'Qustodio, Bark, Google Family Link. Todos tienen bypass documentado. Modo Seguro de Android, desactivar la VPN interna, apps disfrazadas. Tu hijo no necesita ser hacker. Solo necesita YouTube y diez minutos.',
          lines:[
            'Modo Seguro Android: sin apps de terceros. sin control parental.',
            'VPN interna: Configuracion → VPN → desactivar. control neutralizado.',
            'Apps disfrazadas de calculadora: conversaciones ocultas.',
            '---',
            'El software es una capa. No es una solucion.',
            'El primer firewall no corre en ningun sistema operativo.',
            'Corre en la crianza.',
            '---',
            '// c0nf14r 3n un4 4pp p4r4 pr0t3g3r l0 qu3 m4s qu13r3s 35 un 3rr0r d3 c4lculo.',
          ],
          url:'https://github.com/t474-r0b07/t474-r0b07/blob/main/anti_hype/controles-parentales-el-firewall-que-se-rompe.md',
        },
      };
      const post = postId && POSTS[postId];
      if(post && typeof screenAntiHypeDetail === 'function'){
        screenAntiHypeDetail(post);
      } else if(typeof main === 'function'){
        main();
      }
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
