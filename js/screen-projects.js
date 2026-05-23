async function screenProjects(){
  busy=true;clear();
  await cmd('ls -la projects/',20);
  await out('<span class="lo">4 repositories found</span>',true);
  gap();
  busy=false;
  await showOpts([
    {label:'SCCP-DTEX',   action:()=>screenProjectDetail({
      name:'SCCP-DTEX',tag:'LIVE',
      desc:'Tactical law enforcement command center — WebApp',
      stack:'Flutter Web · Supabase · GetX · Clean Architecture',
      detail:'GPS spoofing detection · role-based access · full audit trail · real-time &lt;1s',
      highlights:[
        'Built with offensive thinking: every feature is a countermeasure.',
        'VPN detection · root detection · full GPS anomaly logging.',
        'Role-based access: operators, supervisors, commanders.',
      ],
      url:'https://github.com/t474-r0b07/SCCP-DTEX',
      extended:[
        'Sistema desplegado para unidades tácticas reales en Bolivia.',
        'Arquitectura: Clean Architecture + GetX state management.',
        'Supabase Realtime para actualizaciones GPS con latencia < 1 segundo.',
        'Cada acción del operador queda registrada en audit trail inmutable.',
        'Detecta VPN activa, GPS falso y dispositivos rooteados en tiempo real.',
        '// construido pensando en cómo lo atacaría alguien.',
      ]
    })},
    {label:'SCCP-Mobile', action:()=>screenProjectDetail({
      name:'SCCP-Mobile',tag:'LIVE',
      desc:'Android field app for tactical units',
      stack:'Flutter · BLoC · Hive · Play Integrity API',
      detail:'Offline-first · root detection · VPN fingerprinting · GPS anti-spoofing',
      highlights:[
        'The weakest point of a command platform is the device in the field.',
        'Hive for offline persistence. Syncs when signal returns.',
        'Play Integrity for device attestation at login.',
      ],
      url:'https://github.com/t474-r0b07/SCCP-Mobile',
      extended:[
        'App de campo: el oficial la usa mientras patrulla, sin depender del servidor.',
        'Hive DB local — persiste misiones, incidentes y coordenadas offline.',
        'Al recuperar señal, sincroniza automáticamente con el Command Center.',
        'Play Integrity API: verifica que el dispositivo no está comprometido.',
        'Background service: reporta GPS cada N segundos aunque la app esté minimizada.',
        '// si el dispositivo está rooteado, el sistema lo sabe antes que el oficial.',
      ]
    })},
    {label:'ctf-writeups',action:()=>screenProjectDetail({
      name:'ctf-writeups',tag:'ACTIVE',
      desc:'Not the flag — the thinking.',
      stack:'picoCTF · TryHackMe · OverTheWire · HackTheBox',
      detail:'Forensics · Steganography · Buffer Overflow · Cryptography',
      highlights:[
        'The [ATTEMPTS] section is the core. Not the solution.',
        'OverTheWire Bandit: 34/34. Leviathan: 8/8. Narnia: active.',
        'Lore folder: why the vulnerabilities exist in the first place.',
      ],
      url:'https://github.com/t474-r0b07/ctf-writeups',
      extended:[
        '// narnia0 — primer buffer overflow.',
        'El programa lee input sin validar longitud. La pila se desborda.',
        'Variable adyacente en memoria: val=0x41414141. Shell obtenida.',
        '---',
        'Cada writeup tiene una sección [ATTEMPTS] — los intentos fallidos.',
        'El flag es incidental. El razonamiento es el contenido.',
        'La carpeta /lore documenta por qué las vulnerabilidades existen.',
        '// el que quiere entender, que entienda.',
      ]
    })},
    {label:'t474',        action:()=>screenProjectDetail({
      name:'t474',tag:'IN DEV',
      desc:'Narrative hacking game — terminal-based, lore-driven',
      stack:'// classified',
      detail:'The interface IS the world. Not all puzzles look like puzzles.',
      highlights:[
        'A game where the terminal is not the UI. It is the world.',
        'Lore-driven: every command has history behind it.',
        '// more information is itself a vulnerability',
      ],
      url:'https://github.com/t474-r0b07/t474',
      extended:[
        '// access denied.',
        '// clearance level insufficient.',
        '// but you already knew that.',
        '---',
        'Lo que podemos decir: es un juego que se juega sin saber que estás jugando.',
        'La narrativa y los puzzles coexisten en la misma interfaz.',
        '// más información es en sí misma una vulnerabilidad.',
      ]
    })},
  ]);
  gap();
  addBack(main);
}

async function screenProjectDetail(p){
  busy=true;clear();
  await cmd(`cat ${p.name}/README.md`,20);
  gap(true);
  await out(`<span class="hi">${p.name}</span> &nbsp;<span class="lo">[ ${p.tag} ]</span>`);
  await out(p.desc,false,60);
  gap(true);
  await cmd('cat stack.txt',18);
  await out(`<span class="lo">${p.stack}</span>`,true,40);
  gap(true);
  await cmd('cat features.txt',18);
  await out(p.detail,false,40);
  gap(true);
  await cmd('cat notes.txt',18);
  for(const h of p.highlights){
    await out(h,true,30);
  }
  gap();
  busy=false;

  await showOpts([
    {
      label:'ver más',
      action: async ()=>{
        busy=true;
        gap(true);
        await cmd('cat details.txt',18);
        for(const line of (p.extended||['// no additional data found.'])){
          await out(line,true,25);
        }
        gap();
        busy=false;
        await showOpts([
          {label:'github →',action:()=>open(p.url,'_blank')},
        ]);
        gap(true);
        addBack(screenProjects);
      }
    },
    {label:'github →', action:()=>open(p.url,'_blank')},
  ]);

  gap(true);
  addBack(screenProjects);
}

