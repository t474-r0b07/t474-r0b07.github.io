// ══════════════════════════════════════════════════════════════
// SCREEN LORE — t474-r0b07
// ══════════════════════════════════════════════════════════════

const LORE_ENTRIES = [
  // ── TECHNICAL ──────────────────────────────────────────────
  { id:'ariane5',        title:'ARIANE 5',            subtitle:'4 bytes. 500 million dollars.',               tags:['buffer overflow','integer conversion','1996'], repo:'ctf-writeups', ref:'narnia0',              anim:animAriane5 },
  { id:'danny_cohen',    title:'DANNY COHEN',          subtitle:'On Holy Wars and a Plea for Peace.',          tags:['endianness','byte order','1980'],               repo:'ctf-writeups', ref:'network protocols',    anim:animDannyCohen },
  { id:'little_endian',  title:'LITTLE ENDIAN',        subtitle:'The byte order that won.',                    tags:['endianness','x86','memory'],                    repo:'ctf-writeups', ref:'narnia0',              anim:animLittleEndian },
  { id:'jerry_saltzer',  title:'JERRY SALTZER',        subtitle:'0xDEADBEEF is not random.',                   tags:['magic numbers','debugging','memory'],            repo:'ctf-writeups', ref:'forensics',            anim:animJerrySaltzer },
  { id:'aleph_one',      title:'ALEPH ONE',            subtitle:'Smashing the Stack for Fun and Profit.',      tags:['stack overflow','shellcode','1996'],             repo:'ctf-writeups', ref:'narnia1',              anim:animAlephOne },
  { id:'solar_designer', title:'SOLAR DESIGNER',       subtitle:'Mitigations define the next attack.',         tags:['ret-into-libc','NX','1997'],                    repo:'ctf-writeups', ref:'narnia2',              anim:animSolarDesigner },
  { id:'ken_thompson',   title:'KEN THOMPSON',         subtitle:'You cannot trust code you did not create.',   tags:['trusting trust','compiler','1984'],              repo:'ctf-writeups', ref:'narnia3',              anim:animKenThompson },
  { id:'proftp_2000',    title:'PROFTPD 2000',         subtitle:'The format function is an interpreter.',      tags:['format string','%n','2000'],                    repo:'ctf-writeups', ref:'narnia5',              anim:animProftpd },
  { id:'nergal_phrack58',title:'NERGAL',               subtitle:'ROP before it was called ROP.',               tags:['ret-into-libc','esp lifting','Phrack 58'],       repo:'ctf-writeups', ref:'narnia6',              anim:animNergal },
  { id:'stealth_got',    title:'STEALTH',              subtitle:'Any writable pointer is an attack surface.',  tags:['GOT overwrite','format string','2000'],          repo:'ctf-writeups', ref:'narnia7',              anim:animStealthGOT },
  { id:'y2k',            title:'Y2K',                  subtitle:'The assumption was the vulnerability.',       tags:['integer','implicit type','1999'],                repo:'ctf-writeups', ref:'narnia8',              anim:animY2K },
  { id:'klog_phrack55',  title:'KLOG',                 subtitle:'One byte moves the foundation.',              tags:['off-by-one','EBP','Phrack 55'],                  repo:'ctf-writeups', ref:'narnia9',              anim:animKlog },
  { id:'execve_envp',    title:'EXECVE — envp',        subtitle:'The third argument nobody reads.',            tags:['execve','environment','POSIX'],                  repo:'ctf-writeups', ref:'narnia10',             anim:animExecveEnvp },
  { id:'once_upon_free', title:'ONCE UPON A FREE()',   subtitle:'The stack is not the only road.',             tags:['heap overflow','function pointer','Phrack 57'],  repo:'ctf-writeups', ref:'narnia11',             anim:animOnceUponFree },
  // ── SURVEILLANCE / SOCIAL ──────────────────────────────────
  { id:'gusano_morris',  title:'MORRIS WORM',          subtitle:'6000 machines in 24 hours.',                  tags:['worm','replication','1988'],                     repo:'ctf-writeups', ref:'history',              anim:animMorrisWorm },
  { id:'shellshock',     title:'SHELLSHOCK',           subtitle:'25 years. Nobody checked the window.',        tags:['bash','CVE-2014-6271','env'],                    repo:'ctf-writeups', ref:'web exploitation',      anim:animShellshock },
  { id:'echelon',        title:'ECHELON',              subtitle:'Capture all. Filter after.',                  tags:['mass surveillance','Five Eyes','1960s'],         repo:'ctf-writeups', ref:'PRISM',                anim:animEchelon },
  { id:'prism',          title:'PRISM',                subtitle:'No hack needed. They had the key.',           tags:['NSA','Snowden','2013'],                          repo:'ctf-writeups', ref:'ECHELON',              anim:animPrism },
  { id:'cambridge_analytica', title:'CAMBRIDGE ANALYTICA', subtitle:'87 million profiles. Without consent.',   tags:['OCEAN','psychographics','2016'],                 repo:'ctf-writeups', ref:'PRISM',                anim:animCambridgeAnalytica },
  { id:'lou_montulli',   title:'LOU MONTULLI',         subtitle:'He invented the cookie. Not the tracking.',   tags:['cookies','tracking','1994'],                    repo:'ctf-writeups', ref:'cambridge_analytica',   anim:animLouMontulli },
];

// ── render lore list ──────────────────────────────────────────
async function screenLore(){
  busy=true; clear();
  await cmd('cat /lore/README.md', 20);
  await out('archivos de referencia.');
  await out('cada entrada existe porque aparecio en un writeup.', true, 20);
  await out('no estan aqui para ensenar. estan aqui para recordar.', true, 20);
  gap(true);
  await cmd('ls -la lore/', 18);
  gap(true);
  busy=false;
  await showOpts(
    LORE_ENTRIES.map(e => ({
      label: e.id,
      action: () => screenLoreDetail(e),
    }))
  );
  gap();
  addBack(main);
}

// ── render individual lore entry ──────────────────────────────
async function screenLoreDetail(entry){
  busy=true; clear();
  await cmd('cat lore/' + entry.id + '.md', 20);
  gap(true);
  await out('<span class="hi">' + entry.title + '</span>');
  await out('<span class="lo">' + entry.subtitle + '</span>', true, 20);
  gap(true);
  await out('tags:  ' + entry.tags.join(' · '), true, 20);
  await out('repo:  ' + entry.repo, true, 15);
  await out('ref:   ' + entry.ref, true, 15);
  gap(true);

  // canvas de animacion
  if(entry.anim){
    const h = entry.id==='ariane5' ? 224 : entry.id==='prism' ? 220 : 200;
    const {cv, btn} = makeCanvas(560, h);
    requestAnimationFrame(() => entry.anim(cv, btn));
  }

  gap(true);
  busy=false;
  await showOpts([
    { label:'→ ver en github', action:()=>open('https://github.com/t474-r0b07/'+entry.repo+'/tree/main/lore/'+entry.id+'.md','_blank') },
  ]);
  gap();
  addBack(screenLore);
}
