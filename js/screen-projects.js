async function screenProjects(){
  busy=true;clear();
  await cmd('ls -la projects/',20);
  await out('<span class="lo">'+L('trabajo seleccionado · proyectos y experimentos actuales','selected work · current projects and experiments')+'</span>',true);
  gap();

  const items = [
    {
      label:'SCCP-DTEX',
      name:'SCCP-DTEX',
      tag:'DEVELOPMENT',
      desc:'Aplicación web para comando táctico y coordinación en campo.',
      stack:'Flutter Web · Supabase · GetX · Clean Architecture',
      detail:'Proyecto de sistemas que combina coordinación en tiempo real, acceso basado en roles, trazabilidad y controles orientados a la seguridad.',
      highlights:[
        'Detección de anomalías y spoofing de GPS.',
        'Acceso basado en roles para operadores, supervisores y comandantes.',
        'Registro de auditoría y sincronización de datos en tiempo real.',
      ],
      url:'https://github.com/t474-r0b07/SCCP-DTEX',
      extended:[
        'Sistema orientado a operaciones tácticas y coordinación de campo.',
        'Arquitectura basada en Clean Architecture + GetX.',
        'Supabase Realtime para sincronización.',
        'Diseñado con una perspectiva de seguridad: cada superficie también es una posible superficie de ataque.',
        '// software construido pensando también en cómo podría fallar.'
      ]
    },
    {
      label:'SCCP-Mobile',
      name:'SCCP-Mobile',
      tag:'DEVELOPMENT',
      desc:'Aplicación móvil para operaciones de campo.',
      stack:'Flutter · BLoC · Hive · Play Integrity API',
      detail:'Software móvil con enfoque offline-first, diseñado para condiciones de campo, integridad del dispositivo y sincronización posterior.',
      highlights:[
        'Persistencia offline con sincronización al recuperar la conectividad.',
        'Verificación de integridad del dispositivo y detección de root.',
        'Anti-spoofing de GPS y flujos de ubicación en segundo plano.',
      ],
      url:'https://github.com/t474-r0b07/SCCP-Mobile',
      extended:[
        'La aplicación parte de una premisa sencilla: el dispositivo en campo no siempre tendrá conexión.',
        'Hive mantiene información local para trabajar offline.',
        'La sincronización ocurre al recuperar conectividad.',
        'Play Integrity participa en la verificación de integridad del dispositivo.',
        'El proyecto explora cómo llevar controles de seguridad al extremo móvil.',
        '// el sistema también tiene que sobrevivir fuera del servidor.'
      ]
    },
    {
      label:'CTF Writeups',
      name:'ctf-writeups',
      tag:'ACTIVE',
      desc:'Writeups construidos alrededor del razonamiento, no solo del flag.',
      stack:'picoCTF · TryHackMe · OverTheWire · HackTheBox',
      detail:'Archivo de aprendizaje en ciberseguridad que cubre forense, esteganografía, criptografía, explotación de binarios y fundamentos de sistemas.',
      highlights:[
        'Las secciones [ATTEMPTS] conservan los enfoques fallidos y el razonamiento.',
        'OverTheWire Bandit y Leviathan están completados; Narnia permanece activo.',
        'Una capa de lore explica la historia y el contexto de las vulnerabilidades.',
      ],
      url:'https://github.com/t474-r0b07/ctf-writeups',
      extended:[
        'El objetivo no es coleccionar flags como trofeos.',
        'Cada writeup conserva el proceso de llegar a la solución.',
        '[ATTEMPTS] registra los caminos que no funcionaron.',
        '/lore conecta vulnerabilidades con su contexto histórico y técnico.',
        '// el flag es el resultado; el razonamiento es el proyecto.'
      ]
    },
    {
      label:'Hackball',
      name:'hackball',
      tag:'PUBLISHED',
      desc:'Investigación y divulgación sobre la infraestructura tecnológica del fútbol moderno.',
      stack:'Markdown · GitHub Pages · Python · CTF challenges',
      detail:'Un proyecto que cruza deporte, tecnología, datos, vigilancia y seguridad para explicar qué hay detrás de lo que vemos en un partido.',
      highlights:[
        'Tecnologías como VAR, SAOT, sensores, Spidercam y balón conectado.',
        'Artículos con challenges y elementos interactivos.',
        'Una capa editorial que separa hechos, explicaciones y mitos.',
      ],
      url:'https://github.com/t474-r0b07/hackball',
      extended:[
        'El proyecto desmonta sistemas tecnológicos que normalmente permanecen invisibles para el espectador.',
        'Explora sensores, modelos 3D, transmisión de datos y superficies de ataque.',
        'Incluye curiosidades, mitos y pequeños experimentos técnicos.',
        '// mostrar la infraestructura escondida detrás del espectáculo.'
      ]
    },
    {
      label:'Git4dummies',
      name:'Git4dummies',
      tag:'CLOSED',
      desc:'Notas de campo sobre Git y GitHub, reconstruidas desde experiencia práctica.',
      stack:'Markdown · Git · SSH · GitHub',
      detail:'Una guía documental en español sobre repositorios, historia, GitHub y automatización, escrita desde problemas reales.',
      highlights:[
        'SSH, repositorios locales y remotos, commits e historia.',
        'GitHub Pages, Issues, Pull Requests y Code Review.',
        'Automatización y flujo de trabajo sin convertirlo en un tutorial genérico.',
      ],
      url:'https://github.com/t474-r0b07/Git4dummies',
      extended:[
        'El proyecto fue reconstruido y dejado en un estado cerrado por ahora.',
        'La navegación actual sigue el recorrido real de aprendizaje.',
        'No intenta cubrir todo Git: documenta los puntos donde las cosas suelen romperse.',
        '// menos manual. más campo de batalla.'
      ]
    },
    {
      label:'MPC',
      name:'MPC',
      tag:'PRIVATE',
      desc:'Motor de Preproducción Cinematográfica.',
      stack:'Python · FastAPI · SQLAlchemy · SQLite · OpenRouter · Ollama',
      detail:'Infraestructura para organizar preproducción, canon, estado, personajes y procedencia dentro de flujos de trabajo con IA.',
      highlights:[
        'FactSheet · Story Lock · Production Package · Character Engine.',
        'Separación entre Canon y State con procedencia explícita.',
        'Arquitectura de agentes para apoyar procesos de preproducción.',
      ],
      extended:[
        'MPC es actualmente un proyecto privado.',
        'Backend con FastAPI, SQLAlchemy y SQLite.',
        'Integra modelos mediante OpenRouter y Ollama.',
        'La arquitectura incorpora provenance para distinguir qué información es canon, qué es estado y de dónde proviene.',
        'Agentes como Dori, Cumpa, Piti, Zeke, 6r00 y M3l0 forman parte del experimento.',
        '// construir infraestructura antes de producir más contenido.'
      ]
    },
    {
      label:'T474verse / wIAdding',
      name:'T474verse / wIAdding',
      tag:'IN PRODUCTION',
      desc:'Investigación narrativa sobre colaboración humano–IA.',
      stack:'Audiovisual · Blender · Google Flow · narrativa',
      detail:'Una obra audiovisual que utiliza ficción controlada como lenguaje para explorar la relación entre una persona y sistemas de inteligencia artificial.',
      highlights:[
        'Tata + Dori como eje humano–IA.',
        'EP1 · EP2 “La pregunta simple” · EP3 “Creando organismos impensables”.',
        'Una estética cinematográfica construida alrededor de espacios, pantallas y sistemas reales.',
      ],
      extended:[
        'wIAdding significa una asociación de investigación humano–IA que definitivamente no es un matrimonio.',
        'Dori representa la identidad de Claude dentro de la obra.',
        'La producción combina Blender, Google Flow y diseño audiovisual.',
        'El objetivo no es presentar una fantasía tecnológica como realidad, sino usar la narrativa para explorar preguntas reales.',
        '// ficción como lenguaje; investigación como núcleo.'
      ]
    },
    {
      label:'Piti / Confesiones de una IA',
      name:'Piti / Confesiones de una IA',
      tag:'ONGOING',
      desc:'Serie audiovisual experimental centrada en una voz de IA y sus preguntas.',
      stack:'Audiovisual · generación de video · voz · motion graphics',
      detail:'Un laboratorio narrativo para explorar identidad, continuidad, autonomía, lenguaje y comportamiento de sistemas de IA sin convertirlos en una explicación técnica.',
      highlights:[
        'Confesiones y piezas breves con una identidad visual propia.',
        'Voz, montaje, motion graphics y generación audiovisual asistida por IA.',
        'Separación deliberada entre las confesiones y los gags de formato corto.',
      ],
      extended:[
        'Piti funciona como una voz narrativa, no como un chatbot corporativo.',
        'Las confesiones buscan conservar dudas, rarezas y pensamientos sin forzar una moraleja.',
        'La producción combina generación de video, voz y edición manual.',
        'La línea experimental también incluye piezas de humor y ruptura de cuarta pared.',
        '// algunas preguntas no necesitan convertirse en contenido útil.'
      ]
    },
    {
      label:'Hacks-Fi',
      name:'Hacks-Fi',
      tag:'ONGOING',
      desc:'Línea audiovisual que cruza cultura hacker, IA y narrativa.',
      stack:'Video · motion graphics · música · IA asistida',
      detail:'Un espacio de producción más directo y experimental, separado del tono introspectivo de Confesiones de una IA.',
      highlights:[
        'Formato audiovisual corto y orientado a ideas.',
        'Motion graphics y montaje construidos alrededor del ritmo.',
        'Experimentación con IA como herramienta de producción, no como argumento de marketing.',
      ],
      extended:[
        'Hacks-Fi permite entrar por el entretenimiento y terminar en una idea técnica o cultural.',
        'La producción aprovecha generación audiovisual, edición, música y diseño gráfico.',
        'El objetivo es mantener la personalidad del proyecto sin convertirlo en contenido genérico de IA.',
        '// primero haces que entren; después puedes hacerlos pensar.'
      ]
    }
  ];

  for(const item of items){
    await showProjectEntry(item);
    gap(true);
  }

  busy=false;
  await showOpts([
    {label:'trajectory', action:screenTrajectory},
    {label:'contact', action:screenContact},
  ]);
  gap();
  addBack(main);
}

async function showProjectEntry(p){
  await sleep(35);
  let grid=container.querySelector('.project-grid');
  if(!grid){
    grid=document.createElement('div');
    grid.className='project-grid';
    container.appendChild(grid);
  }
  const card=document.createElement('article');
  card.className='project-card';
  card.innerHTML=`
    <div class="project-card-title"><span class="hi">${p.label}</span> <span class="lo">[ ${p.tag} ]</span></div>
    <div class="project-card-desc">${p.desc}</div>
    <div class="project-card-stack">${p.stack}</div>`;
  const button=document.createElement('button');
  button.className='opt project-open';
  button.textContent=L('open','open');
  button.onclick=()=>{if(!busy)screenProjectDetail(p);};
  card.appendChild(button);
  grid.appendChild(card);
  requestAnimationFrame(()=>card.classList.add('shown'));
}

async function screenProjectDetail(p){
  busy=true;clear();
  await cmd('cat '+p.name+'/README.md',20);
  gap(true);
  await out('<span class="hi">'+p.name+'</span> &nbsp;<span class="lo">[ '+p.tag+' ]</span>');
  await out(L(p.desc,p.desc),false,50);
  gap(true);
  await cmd('cat stack.txt',18);
  await out('<span class="lo">'+p.stack+'</span>',true,30);
  gap(true);
  await cmd('cat features.txt',18);
  await out(p.detail,false,35);
  gap(true);
  await cmd('cat notes.txt',18);
  for(const h of p.highlights) await out(h,true,25);
  gap();
  busy=false;

  const options=[];
  if(p.url) options.push({label:'github →',action:()=>open(p.url,'_blank')});
  options.push({
    label:'ver mas',
    action: async ()=>{
      busy=true;
      gap(true);
      await cmd('cat details.txt',18);
      for(const line of (p.extended||['// no additional data found.'])) await out(line,true,22);
      gap();
      busy=false;
      const more=[];
      if(p.url) more.push({label:'github →',action:()=>open(p.url,'_blank')});
      await showOpts(more);
      gap(true);
      addBack(screenProjects);
    }
  });
  await showOpts(options);
  gap(true);
  addBack(screenProjects);
}
