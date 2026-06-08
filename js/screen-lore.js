// ══════════════════════════════════════════════════════════════
// SCREEN LORE — t474-r0b07
// ══════════════════════════════════════════════════════════════

const LORE_ENTRIES = [
  // ── TECHNICAL ──────────────────────────────────────────────
  {
    id: 'ariane5',
    title: 'ARIANE 5',
    subtitle: '4 bytes. 500 million dollars.',
    tags: ['buffer overflow', 'integer conversion', '1996'],
    repo: 'ctf-writeups',
    ref: 'narnia0',
    anim: animAriane5,
  },
  {
    id: 'danny_cohen',
    title: 'DANNY COHEN',
    subtitle: 'On Holy Wars and a Plea for Peace.',
    tags: ['endianness', 'byte order', '1980'],
    repo: 'ctf-writeups',
    ref: 'network protocols',
    anim: animDannyCohen,
  },
  {
    id: 'little_endian',
    title: 'LITTLE ENDIAN',
    subtitle: 'The byte order that won.',
    tags: ['endianness', 'x86', 'memory'],
    repo: 'ctf-writeups',
    ref: 'narnia0',
    anim: animLittleEndian,
  },
  {
    id: 'jerry_saltzer',
    title: 'JERRY SALTZER',
    subtitle: '0xDEADBEEF is not random.',
    tags: ['magic numbers', 'debugging', 'memory'],
    repo: 'ctf-writeups',
    ref: 'forensics',
    anim: animJerrySaltzer,
  },
  {
    id: 'aleph_one',
    title: 'ALEPH ONE',
    subtitle: 'Smashing the Stack for Fun and Profit.',
    tags: ['stack overflow', 'shellcode', '1996'],
    repo: 'ctf-writeups',
    ref: 'narnia1',
    anim: animAlephOne,
  },
  {
    id: 'solar_designer',
    title: 'SOLAR DESIGNER',
    subtitle: 'Mitigations define the next attack.',
    tags: ['ret-into-libc', 'NX', '1997'],
    repo: 'ctf-writeups',
    ref: 'narnia2',
    anim: animSolarDesigner,
  },
  {
    id: 'ken_thompson',
    title: 'KEN THOMPSON',
    subtitle: 'You cannot trust code you did not create.',
    tags: ['trusting trust', 'compiler', '1984'],
    repo: 'ctf-writeups',
    ref: 'narnia3',
    anim: animKenThompson,
  },
  {
    id: 'proftp_2000',
    title: 'PROFTPD 2000',
    subtitle: 'The format function is an interpreter.',
    tags: ['format string', '%n', '2000'],
    repo: 'ctf-writeups',
    ref: 'narnia5',
    anim: animProftpd,
  },
  {
    id: 'nergal_phrack58',
    title: 'NERGAL',
    subtitle: 'ROP before it was called ROP.',
    tags: ['ret-into-libc', 'esp lifting', 'Phrack 58'],
    repo: 'ctf-writeups',
    ref: 'narnia6',
    anim: animNergal,
  },
  {
    id: 'stealth_got',
    title: 'STEALTH',
    subtitle: 'Any writable pointer is an attack surface.',
    tags: ['GOT overwrite', 'format string', '2000'],
    repo: 'ctf-writeups',
    ref: 'narnia7',
    anim: animStealthGOT,
  },
  {
    id: 'y2k',
    title: 'Y2K',
    subtitle: 'The assumption was the vulnerability.',
    tags: ['integer', 'implicit type', '1999'],
    repo: 'ctf-writeups',
    ref: 'narnia8',
    anim: animY2K,
  },
  {
    id: 'klog_phrack55',
    title: 'KLOG',
    subtitle: 'One byte moves the foundation.',
    tags: ['off-by-one', 'EBP', 'Phrack 55'],
    repo: 'ctf-writeups',
    ref: 'narnia9',
    anim: animKlog,
  },
  {
    id: 'execve_envp',
    title: 'EXECVE — envp',
    subtitle: 'The third argument nobody reads.',
    tags: ['execve', 'environment', 'POSIX'],
    repo: 'ctf-writeups',
    ref: 'narnia10',
    anim: animExecveEnvp,
  },
  {
    id: 'once_upon_free',
    title: 'ONCE UPON A FREE()',
    subtitle: 'The stack is not the only road.',
    tags: ['heap overflow', 'function pointer', 'Phrack 57'],
    repo: 'ctf-writeups',
    ref: 'narnia11',
    anim: animOnceUponFree,
  },
  // ── SURVEILLANCE / SOCIAL ──────────────────────────────────
  {
    id: 'gusano_morris',
    title: 'MORRIS WORM',
    subtitle: '6000 machines in 24 hours.',
    tags: ['worm', 'replication', '1988'],
    repo: 'ctf-writeups',
    ref: 'history',
    anim: animMorrisWorm,
  },
  {
    id: 'shellshock',
    title: 'SHELLSHOCK',
    subtitle: '25 years. Nobody checked the window.',
    tags: ['bash', 'CVE-2014-6271', 'env'],
    repo: 'ctf-writeups',
    ref: 'web exploitation',
    anim: animShellshock,
  },
  {
    id: 'echelon',
    title: 'ECHELON',
    subtitle: 'Capture all. Filter after.',
    tags: ['mass surveillance', 'Five Eyes', '1960s'],
    repo: 'ctf-writeups',
    ref: 'PRISM',
    anim: animEchelon,
  },
  {
    id: 'prism',
    title: 'PRISM',
    subtitle: 'No hack needed. They had the key.',
    tags: ['NSA', 'Snowden', '2013'],
    repo: 'ctf-writeups',
    ref: 'ECHELON',
    anim: animPrism,
  },
  {
    id: 'cambridge_analytica',
    title: 'CAMBRIDGE ANALYTICA',
    subtitle: '87 million profiles. Without consent.',
    tags: ['OCEAN', 'psychographics', '2016'],
    repo: 'ctf-writeups',
    ref: 'PRISM',
    anim: animCambridgeAnalytica,
  },
  {
    id: 'lou_montulli',
    title: 'LOU MONTULLI',
    subtitle: 'He invented the cookie. Not the tracking.',
    tags: ['cookies', 'tracking', '1994'],
    repo: 'ctf-writeups',
    ref: 'cambridge_analytica',
    anim: animLouMontulli,
  },
];

// ── render lore list ──────────────────────────────────────────
function screenLore() {
  const t = document.getElementById('terminal');
  t.innerHTML = '';

  const header = document.createElement('pre');
  header.className = 'terminal-text';
  header.textContent = [
    '> cat /lore/README.md',
    '',
    'archivos de referencia.',
    'cada entrada existe porque apareció en un writeup.',
    'no están aquí para enseñar. están aquí para recordar.',
    '',
    `${LORE_ENTRIES.length} entries found.`,
    '──────────────────────────────────────────',
    '',
  ].join('\n');
  t.appendChild(header);

  LORE_ENTRIES.forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'lore-row';
    row.style.cssText = 'cursor:pointer;padding:4px 0;border-bottom:1px solid #0d1a0d;';
    row.innerHTML = `<span style="color:#00ff41;font-family:monospace;font-size:12px;">[${String(i+1).padStart(2,'0')}]</span> <span style="color:#4dbb4d;font-family:monospace;font-size:12px;">${entry.title}</span> <span style="color:#2d6b2d;font-family:monospace;font-size:11px;">— ${entry.subtitle}</span>`;
    row.onclick = () => screenLoreDetail(entry);
    t.appendChild(row);
  });

  const footer = document.createElement('pre');
  footer.className = 'terminal-text';
  footer.style.marginTop = '12px';
  footer.textContent = '\n> _';
  t.appendChild(footer);
}

// ── render individual lore entry ──────────────────────────────
function screenLoreDetail(entry) {
  const t = document.getElementById('terminal');
  t.innerHTML = '';

  // back button
  const back = document.createElement('div');
  back.style.cssText = 'cursor:pointer;color:#2d6b2d;font-family:monospace;font-size:12px;margin-bottom:8px;';
  back.textContent = '← /lore/';
  back.onclick = screenLore;
  t.appendChild(back);

  // header info
  const info = document.createElement('pre');
  info.className = 'terminal-text';
  info.textContent = [
    `> cat /lore/${entry.id}.md`,
    '',
    `TÍTULO:    ${entry.title}`,
    `SUBTÍTULO: ${entry.subtitle}`,
    `TAGS:      ${entry.tags.join(' · ')}`,
    `REPO:      ${entry.repo}`,
    `REF:       ${entry.ref}`,
    '──────────────────────────────────────────',
  ].join('\n');
  t.appendChild(info);

  // canvas container
  if (entry.anim) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin:8px 0;position:relative;';

    const cv = document.createElement('canvas');
    cv.width = 560;
    cv.height = entry.id === 'ariane5' ? 224 : entry.id === 'prism' ? 220 : 200;
    cv.style.cssText = 'width:100%;max-width:560px;display:block;image-rendering:pixelated;border:1px solid #0d1a0d;';
    wrap.appendChild(cv);

    const btn = document.createElement('button');
    btn.className = 'replay-btn';
    btn.textContent = '↺ replay';
    btn.style.cssText = 'display:none;position:absolute;bottom:8px;right:8px;background:#000a00;color:#00ff41;border:1px solid #00ff41;font-family:monospace;font-size:11px;padding:3px 8px;cursor:pointer;';
    btn.classList.remove('visible');
    wrap.appendChild(btn);

    t.appendChild(wrap);

    // run animation after paint
    requestAnimationFrame(() => entry.anim(cv, btn));
  }

  // link to github
  const link = document.createElement('pre');
  link.className = 'terminal-text';
  link.style.marginTop = '8px';
  link.innerHTML = `\n<a href="https://github.com/t474-r0b07/${entry.repo}/tree/main/lore/${entry.id}.md" target="_blank" style="color:#2d6b2d;">→ github.com/t474-r0b07/${entry.repo}/lore/${entry.id}.md</a>\n\n> _`;
  t.appendChild(link);
}
