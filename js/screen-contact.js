async function screenContact(){
  busy=true;clear();
  await cmd('cat contacts.txt',20);
  gap(true);
  await out('<span class="hi">t474-r0b07</span>');
  await out('red teamer in progress · Bolivia 🇧🇴',true,40);
  gap(true);
  await cmd('echo $CHANNELS',18);
  gap(true);
  busy=false;
  await showOpts([
    {label:'github',   action:()=>open('https://github.com/t474-r0b07','_blank')},
    {label:'youtube',  action:()=>open('https://youtube.com/@kaderd.garnica','_blank')},
    {label:'email',    action:()=>open('mailto:dogar.kad@gmail.com')},
    {label:'calendly', action:()=>open('https://calendly.com/t474_r0b07','_blank')},
    {label:'quien soy',action:screenAbout},
    {label:'ost · t474',action:screenOST},
  ]);
  gap();
  addBack(main);
}

async function screenAbout(){
  busy=true;clear();
  await cmd('cat /etc/about.txt',20);
  gap(true);
  await out('<span class="hi">t474-r0b07</span> &nbsp;<span class="lo">// kader d. garnica</span>');
  gap(true);

  const lines = [
    'Lic. en Comunicación Social.',
    'Publicista. Diseñador gráfico. Filmmaker. Músico.',
    'Desarrollador de sistemas. Red teamer en formación.',
    '',
    'Todo eso no es una contradicción.',
    'Es el mismo instinto aplicado a distintos medios.',
    '// entender cómo funciona algo. luego romperlo. luego construir algo mejor.',
    '',
    'Bolivia — pensando sin fronteras.',
  ];

  for(const l of lines){
    await sleep(55);
    if(l===''){gap(true);continue;}
    const soft = l.startsWith('//') || l.startsWith('Lic') || l.startsWith('Pub') || l.startsWith('Bol');
    await out(l, soft, 0);
  }

  gap(true);
  await cmd('echo $PHILOSOPHY',18);
  await out('not a musician.',true,40);
  await out('not a filmmaker.',true,30);
  await out('not a developer.',true,30);
  gap(true);
  await out('all of the above. none of the above.',false,40);
  gap(true);
  await out('the audio is a side effect.',true,40);
  await out('of something larger.',true,30);
  gap();
  busy=false;
  addBack(screenContact);
}

async function screenOST(){
  busy=true;clear();
  await cmd('ls -la /t474/ost/',20);
  gap(true);
  await out('<span class="hi">t474 · original soundtrack</span>');
  await out('// the sound of something being constructed in the dark.',true,60);
  gap(true);

  const tracks = [
    {name:'FELO DE SE',      url:'https://soundcloud.com/kader-d-garnica/felo-de-se'},
    {name:'cellophane',      url:'https://soundcloud.com/kader-d-garnica/cellophane'},
    {name:'D3574cam3n70',    url:'https://soundcloud.com/kader-d-garnica/d3574cam3n70'},
  ];

  await cmd('cat tracklist.txt',18);
  for(let i=0;i<tracks.length;i++){
    await sleep(80);
    await out(`<span class="lo">[${String(i+1).padStart(2,'0')}]</span> ${tracks[i].name}`,false,0);
  }

  gap(true);
  await cmd('play --embed',18);
  await sleep(200);

  // SoundCloud embed — full profile widget
  const embedWrap = document.createElement('div');
  embedWrap.style.cssText='width:100%;max-width:560px;margin:0.6rem 0;border:1px solid #2a4a2a;overflow:hidden;';
  const iframe = document.createElement('iframe');
  iframe.width='100%';
  iframe.height='300';
  iframe.scrolling='no';
  iframe.frameBorder='no';
  iframe.allow='autoplay';
  iframe.src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1694584550&color=%2300ff41&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true';
  embedWrap.appendChild(iframe);
  container.appendChild(embedWrap);

  gap(true);
  await out('// or dead. hard to tell.',true,60);
  gap();
  busy=false;
  addBack(screenContact);
}

