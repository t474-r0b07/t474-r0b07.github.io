async function screenContact(){
  busy=true;clear();
  await cmd('cat contacts.txt',20);
  gap(true);
  await out('<span class="hi">t474-r0b07</span>');
  await out('creative technologist · systems builder · Bolivia',true,40);
  await out(L('Comunicación directa y otros espacios donde publico mi trabajo.','Direct contact and other places where I publish my work.'),true,35);
  gap(true);
  await cmd('echo $CHANNELS',18);

  const channels=[
    {name:'GitHub',desc:L('Código, sistemas y proyectos.','Code, systems and projects.'),url:'https://github.com/t474-r0b07',icon:'github'},
    {name:'YouTube',desc:L('Producción audiovisual y experimentos.','Audiovisual work and experiments.'),url:'https://youtube.com/@kaderd.garnica',icon:'youtube'},
    {name:'DEV Community',desc:L('Notas técnicas y desarrollo.','Technical notes and development.'),url:'https://dev.to/t474r0b07',icon:'devdotto'},
    {name:'Medium',desc:L('Artículos, análisis y escritura.','Articles, analysis and writing.'),url:'https://medium.com/@t474-r0b07',icon:'medium'},
    {name:'LinkedIn',desc:L('Trayectoria y perfil profesional.','Professional profile and experience.'),url:'https://www.linkedin.com/in/t474-r0b07',icon:'linkedin'},
    {name:'X',desc:L('Ideas, apuntes y conversación.','Ideas, notes and conversation.'),url:'https://x.com/t474r0b0t/',icon:'x'},
    {name:'Facebook',desc:L('Tata Robot · comunidad y publicaciones.','Tata Robot · community and updates.'),url:'https://www.facebook.com/tatarobot/',icon:'facebook'},
    {name:L('Correo electrónico','Email'),desc:L('Contacto directo.','Direct contact.'),url:'mailto:dogar.kad@gmail.com',icon:'gmail',primary:true},
    {name:'Calendly',desc:L('Coordinar una conversación.','Schedule a conversation.'),url:'https://calendly.com/t474_r0b07',icon:'calendly'},
  ];

  const grid=document.createElement('div');
  grid.className='contact-grid';
  for(const item of channels){
    const card=document.createElement('a');
    card.className='contact-card'+(item.primary?' primary':'');
    card.href=item.url;
    card.target=item.url.startsWith('mailto:')?'_self':'_blank';
    card.rel='noopener noreferrer';
    card.setAttribute('aria-label',item.name+' — '+item.desc);
    const logo=document.createElement('img');
    logo.className='contact-icon';
    logo.src='https://cdn.simpleicons.org/'+item.icon;
    logo.alt='';
    logo.loading='lazy';
    const copy=document.createElement('span');
    copy.className='contact-copy';
    const name=document.createElement('span');
    name.className='contact-name';
    name.textContent=item.name;
    const desc=document.createElement('span');
    desc.className='contact-desc';
    desc.textContent=item.desc;
    copy.append(name,desc);
    card.append(logo,copy);
    grid.appendChild(card);
    requestAnimationFrame(()=>card.classList.add('shown'));
  }
  container.appendChild(grid);
  gap(true);
  busy=false;
  await showOpts([
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
