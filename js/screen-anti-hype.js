async function screenAntiHype(){
  busy=true;clear();
  await cmd('ls -la anti_hype/',20);
  await out('<span class="lo">archivo de ruido filtrado</span>',true);
  gap(true);
  await out('<span class="hi">anti_hype</span>');
  gap(true);
  await out('No todo lo que brilla es innovacion.',false,40);
  await out('No todo lo que tiene 50k estrellas funciona.',true,30);
  await out('No toda IA gratis es un favor.',true,30);
  gap(true);
  await cmd('echo $CRITERIO',18);
  await out('El hype no distingue entre senal y ruido.',false,40);
  await out('Este repositorio s.',true,30);
  gap(true);
  await cmd('ls -la entradas/',18);
  gap(true);
  busy=false;
  await showOpts([
    {label:'50kstars — Odysseus',   action:()=>screenAntiHypeDetail({
      id:'50kstars_odysseus',
      title:'ODYSSEUS — 50K ESTRELLAS',
      subtitle:'distribucion no es innovacion.',
      trigger:'un youtuber publica codigo y la prensa tech pierde la cabeza. 49.000 estrellas en cuatro dias. "la guerra contra el big tech ha comenzado".',
      verdict:'Frontend self-hosted. Python / FastAPI / SQLite / ChromaDB / Docker. Open WebUI y LibreChat existen hace anos y hacen lo mismo. La diferencia no esta en el codigo. Esta en quien lo firmo.',
      lines:[
        '110 millones de suscriptores es distribucion que ningun proyecto open source puede comprar.',
        'Eso es real. Pero no es ingenieria.',
        '---',
        'El agente puede ejecutar comandos en tu sistema y tocar tus archivos.',
        'Software de dias. Sin auditoria externa todavia.',
        'Si lo corres: localhost. VM. Sin datos que importen.',
        '---',
        '// d1str1buc10n_n0_35_1nn0v4c10n',
        '// pero quien confunde las dos ya perdio antes de empezar.',
      ],
      url:'https://github.com/t474-r0b07/t474-r0b07/blob/main/anti_hype/50kstars_odysseus.md',
    })},
    {label:'accept_all_cookies',    action:()=>screenAntiHypeDetail({
      id:'accept_all_cookies',
      title:'ACCEPT ALL COOKIES',
      subtitle:'no cerraste un aviso. firmaste un contrato.',
      trigger:'cada clic construye un perfil. ese perfil se vende. lo peor de todo es que ya lo sabias.',
      verdict:'Una cookie no es un archivo inocente. Es un identificador persistente que viaja contigo de sitio en sitio. El banner no te pide permiso. Te notifica que ya empezaron.',
      lines:[
        'El tiempo promedio de una subasta RTB: 100ms.',
        'Menos de lo que tardas en leer esta linea.',
        'Tu perfil ya cambio de manos.',
        '---',
        'Fingerprinting: sin cookies, sin cuenta.',
        'Resolucion + fuentes + GPU + zona horaria = identificador unico.',
        'Imposible de borrar.',
        '---',
        '// n0 c3rr4st3 un 4v1s0. f1rm4st3 un c0ntr4t0.',
      ],
      url:'https://github.com/t474-r0b07/t474-r0b07/blob/main/anti_hype/accept_all_cookies.md',
    })},
    {label:'dark_llm_honeypot',     action:()=>screenAntiHypeDetail({
      id:'dark_llm_honeypot',
      title:'DARK LLM HONEYPOT',
      subtitle:'si no te cobran con dinero, te cobran con informacion.',
      trigger:'DIG AI, WormGPT, clones sin censura en Tor. Gente sintiendose Mr. Robot por usarlos.',
      verdict:'Mantener un LLM cuesta una fortuna. GPUs. VRAM. Infraestructura. Si no hay modelo de negocio visible, el producto eres tu. El honeypot recolecta prompts. Tu regalas tus vectores.',
      lines:[
        'Vectores:',
        '01. HONEYPOT — agencias recolectando prompts.',
        '02. TROJAN_DATA — base de datos con tu investigacion.',
        '---',
        'Descarga un modelo open-source.',
        'Levanta Ollama en local.',
        'Aisla en una VM sin salida a red.',
        '---',
        '// 3l qu3 r3g4l4 sus pr3gunt4s r3g4l4 sus v3ct0r3s.',
      ],
      url:'https://github.com/t474-r0b07/t474-r0b07/blob/main/anti_hype/dark_llm_honeypot.md',
    })},
    {label:'manus_ai',              action:()=>screenAntiHypeDetail({
      id:'manus_ai',
      title:'MANUS AI',
      subtitle:'no te analizaron. te espejaron. y te cobraron por verte.',
      trigger:'Meta recomienda una IA que quiere venderte un espejo por $200.',
      verdict:'No entro a un solo README. No abrio un solo writeup. Lo que llamo "analisis profundo" fueron tus comentarios publicos de Facebook procesados y devueltos con formato de consultoria.',
      lines:[
        'Su fuente numero uno para analizar tu filosofia: eres tu mismo.',
        'Lo llamaron "feedback del usuario".',
        'Debian llamarlo: tus palabras reempaquetadas y vendidas de vuelta.',
        '---',
        'El mismo vector que dark_llm_honeypot.',
        'El mismo principio de ECHELON.',
        'La misma logica de las cookies.',
        '---',
        '// n0 t3 4n4l1z4r0n. t3 3sp3j4r0n.',
      ],
      url:'https://github.com/t474-r0b07/t474-r0b07/blob/main/anti_hype/manus_ai.md',
    })},
    {label:'grooming — lo que el miedo no explica', action:()=>screenAntiHypeDetail({
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
    })},
    {label:'controles parentales — el firewall que se rompe', action:()=>screenAntiHypeDetail({
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
    })},
  ]);
  gap();
  addBack(main);
}

async function screenAntiHypeDetail(p){
  busy=true;clear();
  await cmd('cat anti_hype/'+p.id+'.md',20);
  gap(true);
  await out('<span class="hi">'+p.title+'</span>');
  await out('<span class="lo">'+p.subtitle+'</span>',true,30);
  gap(true);
  await cmd('cat trigger.txt',18);
  await out(p.trigger,false,40);
  gap(true);
  await cmd('cat verdict.txt',18);
  await out(p.verdict,false,35);
  gap(true);
  await cmd('cat details.txt',18);
  for(const line of p.lines){
    await out(line,true,25);
  }
  gap();
  busy=false;
  await showOpts([
    {label:'leer completo →', action:()=>open(p.url,'_blank')},
  ]);
  gap(true);
  addBack(screenAntiHype);
}
