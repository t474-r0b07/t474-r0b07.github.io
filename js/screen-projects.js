async function screenProjects(){
  busy=true;clear();
  await cmd('ls -la projects/',20);
  await out('<span class="lo">6 repositories found</span>',true);
  gap();
  busy=false;
  await showOpts([
    {label:'SCCP-DTEX',   action:()=>screenProjectDetail({
      name:'SCCP-DTEX',tag:'LIVE',
      desc:'Tactical law enforcement command center — WebApp',
      stack:'Flutter Web · Supabase · GetX · Clean Architecture',
      detail:'GPS spoofing detection · role-based access · full audit trail · real-time <1s',
      highlights:[
        'Built with offensive thinking: every feature is a countermeasure.',
        'VPN detection · root detection · full GPS anomaly logging.',
        'Role-based access: operators, supervisors, commanders.',
      ],
      url:'https://github.com/t474-r0b07/SCCP-DTEX',
      extended:[
        'Sistema desplegado para unidades tácticas reales en Bolivia.',
        'Arquitectura: Clean Architecture + GetX state management.',
        'Supabase Realtime: latencia < 1 segundo.',
        'Cada acción del operador: audit trail inmutable.',
        'Detecta VPN, GPS falso y root en tiempo real.',
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
        'App de campo: patrulla sin depender del servidor.',
        'Hive DB local — persiste misiones y coordenadas offline.',
        'Sincroniza automáticamente al recuperar señal.',
        'Play Integrity API: verifica que el dispositivo no está comprometido.',
        'Background service: GPS cada N segundos aunque la app esté minimizada.',
        '// si el dispositivo está rooteado, el sistema lo sabe primero.',
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
        'Lee input sin validar. Pila desbordada. val=0x41414141. Shell.',
        '---',
        'Cada writeup tiene [ATTEMPTS] — los intentos fallidos.',
        'El flag es incidental. El razonamiento es el contenido.',
        '/lore documenta por qué las vulnerabilidades existen.',
        '// el que quiere entender, que entienda.',
      ]
    })},
    {label:'hackball',     action:()=>screenProjectDetail({
      name:'hackball',tag:'ACTIVE',
      desc:'Desmontando el futbol moderno para revelar los algoritmos.',
      stack:'Markdown · GitHub Pages · Python · CTF challenges',
      detail:'VAR · sensores · Spidercam · vigilancia · datos de comportamiento',
      highlights:[
        'El futbol moderno es infraestructura tecnica disfrazada de deporte.',
        'Cada articulo tiene un challenge CTF embebido. Cada mito es corto y brutal.',
        '10 curiosidades + 10 mitos. Easter egg EXIF → penalty game Naive Bayes.',
      ],
      url:'https://github.com/t474-r0b07/hackball',
      extended:[
        'Post 01: VAR/SAOT no miden offside. Generan un modelo 3D.',
        'Post 02: pelota conectada. KINEXON UWB + IMU. 500 datos/s.',
        'Post 03: Spidercam. 4 cables. tension vectorial. no es magia.',
        'Post 08: estadios como superficie de ataque.',
        '---',
        'Easter egg: EXIF en banner → URL base64 → penalty mini-game.',
        'El portero aprende tu patron de tiro. Naive Bayes en tiempo real.',
        '// el canal no ensena hacking. muestra como razona un hacker.',
      ]
    })},
    {label:'Git4dummies',  action:()=>screenProjectDetail({
      name:'Git4dummies',tag:'PUBLISHED',
      desc:'Notas de campo sobre Git y GitHub. En espanol.',
      stack:'Markdown · Git · SSH · GitHub',
      detail:'Sin tutoriales genericos. Los bits menos significativos son los que mas dicen.',
      highlights:[
        'Setup SSH, configuracion, flujo de trabajo real.',
        'Branches, remotes, conflictos — sin suavizar.',
        'HALL_OF_LUMINOUS.md: los que lo entendieron de verdad.',
      ],
      url:'https://github.com/t474-r0b07/Git4dummies',
      extended:[
        '00_setup: instalacion y configuracion inicial.',
        '01_local: el repositorio local. commits. historia.',
        '02_remote: GitHub. push. pull. origin.',
        '03_branches: ramificacion. merge. conflictos.',
        '04_github: pull requests. issues. workflow.',
        '---',
        'No es un tutorial. Es un campo minado bien documentado.',
        '// los bits menos significativos son los que mas dicen.',
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
        'Lo que podemos decir: es un juego que se juega sin saber que estas jugando.',
        'La narrativa y los puzzles coexisten en la misma interfaz.',
        '// mas informacion es en si misma una vulnerabilidad.',
      ]
    })},
  ]);
  gap();
  addBack(main);
}

async function screenProjectDetail(p){
  busy=true;clear();
  await cmd('cat '+p.name+'/README.md',20);
  gap(true);
  await out('<span class="hi">'+p.name+'</span> &nbsp;<span class="lo">[ '+p.tag+' ]</span>');
  await out(p.desc,false,60);
  gap(true);
  await cmd('cat stack.txt',18);
  await out('<span class="lo">'+p.stack+'</span>',true,40);
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
      label:'ver mas',
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
