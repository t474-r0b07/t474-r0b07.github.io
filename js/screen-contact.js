async function screenContact(){
  busy=true;clear();
  await cmd('cat contacts.txt',20);
  gap(true);
  await out('<span class="hi">t474-r0b07</span>');
  await out('creative technologist · systems builder · Bolivia',true,40);
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
    {label:'audiovisual',action:screenMedia},
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
