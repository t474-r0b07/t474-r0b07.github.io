async function screenContact(){
  busy=true;clear();
  await cmd('cat contacts.txt',20);
  gap(true);
  await out('<span class="hi">t474-r0b07</span>');
  await out(L('creative technologist · systems builder · Bolivia','creative technologist · systems builder · Bolivia'),true,40);
  gap(true);
  await cmd('echo $CHANNELS',18);
  gap(true);
  busy=false;
  await showOpts([
    {label:'github',   action:()=>open('https://github.com/t474-r0b07','_blank')},
    {label:'youtube',  action:()=>open('https://youtube.com/@kaderd.garnica','_blank')},
    {label:'email',    action:()=>open('mailto:dogar.kad@gmail.com')},
    {label:'calendly', action:()=>open('https://calendly.com/t474_r0b07','_blank')},
    {label:'about',action:screenAbout},
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
    L('Lic. en Comunicación Social.','Degree in Social Communication.'),
    L('Publicista. Diseñador gráfico. Filmmaker. Músico.','Advertiser. Graphic designer. Filmmaker. Musician.'),
    L('Desarrollador de sistemas. Red teamer en formación.','Systems developer. Red teamer in training.'),
    '',
    L('Todo eso no es una contradicción.','None of that is a contradiction.'),
    L('Es el mismo instinto aplicado a distintos medios.','It is the same instinct applied to different media.'),
    '// '+L('entender cómo funciona algo. luego romperlo. luego construir algo mejor.','understand how something works. then break it. then build something better.'),
    '',
    L('Bolivia — pensando sin fronteras.','Bolivia — thinking without borders.'),
  ];

  for(const l of lines){
    await sleep(55);
    if(l===''){gap(true);continue;}
    const soft = l.startsWith('//') || l.startsWith('Lic') || l.startsWith('Pub') || l.startsWith('Bol');
    await out(l, soft, 0);
  }

  gap(true);
  await cmd('echo $PHILOSOPHY',18);
  await out(L('no soy músico.','not a musician.'),true,40);
  await out(L('no soy filmmaker.','not a filmmaker.'),true,30);
  await out(L('no soy desarrollador.','not a developer.'),true,30);
  gap(true);
  await out(L('todo lo anterior. nada de lo anterior.','all of the above. none of the above.'),false,40);
  gap(true);
  await out(L('el audio es un efecto secundario.','the audio is a side effect.'),true,40);
  await out(L('de algo más grande.','of something larger.'),true,30);
  gap();
  busy=false;
  addBack(screenContact);
}
