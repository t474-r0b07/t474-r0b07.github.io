async function screenHackball(){
  busy=true;clear();
  await cmd('cat hackball/README.md',20);
  gap(true);
  await out('<span class="hi">hackball</span> &nbsp;<span class="lo">[ ACTIVE ]</span>');
  gap(true);
  await out('El futbol moderno es infraestructura tecnica disfrazada de deporte.',false,40);
  await out('Cada partido es un sistema distribuido con sensores, redes y algoritmos.',true,30);
  await out('Nadie te lo muestra. Este repo s.',true,30);
  gap(true);
  await cmd('echo $FILOSOFIA',18);
  await out('El canal no ensena hacking.',false,40);
  await out('Muestra como razona un hacker.',true,30);
  gap(true);
  await cmd('ls -la posts/',18);
  gap(true);
  busy=false;
  await showOpts([
    {label:'curiosidades →', action:async()=>{
      busy=true;clear();
      await cmd('ls -la posts/curiosidades/',20);
      gap(true);
      busy=false;
      await showOpts([
        {label:'01 · VAR y SAOT — el offside que no mide',        action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/curiosidades/01_var_offside.md','_blank')},
        {label:'02 · La pelota conectada — KINEXON UWB/IMU',      action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/curiosidades/02_balon_sensores.md','_blank')},
        {label:'03 · Spidercam — 4 cables, tension vectorial',    action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/curiosidades/03_camara_cable.md','_blank')},
        {label:'04 · Camaras de arbitro — body cam tactica',      action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/curiosidades/04_camara_arbitro.md','_blank')},
        {label:'05 · Forense digital en el VAR',                  action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/curiosidades/05_var_forense.md','_blank')},
        {label:'ver todos →',                                      action:()=>open('https://github.com/t474-r0b07/hackball/tree/main/posts/curiosidades','_blank')},
      ]);
      gap(true);
      addBack(screenHackball);
    }},
    {label:'mitos →', action:async()=>{
      busy=true;clear();
      await cmd('ls -la posts/mitos/',20);
      gap(true);
      busy=false;
      await showOpts([
        {label:'01 · "el VAR es infalible"',           action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/mitos/01_ia_predice.md','_blank')},
        {label:'02 · "el VAR es automatico"',          action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/mitos/02_var_automatico.md','_blank')},
        {label:'03 · "los jugadores no son rastreados"',action:()=>open('https://github.com/t474-r0b07/hackball/blob/main/posts/mitos/03_jugadores.md','_blank')},
        {label:'ver todos →',                           action:()=>open('https://github.com/t474-r0b07/hackball/tree/main/posts/mitos','_blank')},
      ]);
      gap(true);
      addBack(screenHackball);
    }},
    {label:'easter egg →', action:async()=>{
      busy=true;clear();
      await cmd('exiftool assets/banner.png',20);
      gap(true);
      await out('<span class="lo">UserComment: </span><span class="hi">[data]</span>',true,30);
      gap(true);
      await out('Hay algo en los metadatos del banner.',false,40);
      await out('El que quiere encontrar, que encuentre.',true,30);
      gap(true);
      busy=false;
      await showOpts([
        {label:'ver banner →', action:()=>open('https://github.com/t474-r0b07/hackball','_blank')},
      ]);
      gap(true);
      addBack(screenHackball);
    }},
    {label:'repo completo →', action:()=>open('https://github.com/t474-r0b07/hackball','_blank')},
  ]);
  gap();
  addBack(main);
}
