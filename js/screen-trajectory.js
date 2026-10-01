async function screenTrajectory(){
  busy=true;clear();
  await cmd('cat /trajectory/selected',20);
  await out('<span class="hi">'+L('TRAYECTORIA','TRAJECTORY')+'</span>');
  await out('<span class="lo">'+L('Una selección de proyectos y etapas que dejaron huella.','A selection of projects and stages that left a mark.')+'</span>',true,25);
  gap(true);

  await out('<span class="lo">'+L('Antes de los repositorios, los modelos y los sistemas de IA, hubo otros proyectos.','Before repositories, models and AI systems, there were other projects.')+'</span>',true,20);
  await out('<span class="lo">'+L('Las herramientas cambiaron. La necesidad de construir cosas no.','The tools changed. The need to build things did not.')+'</span>',true,20);
  gap();

  const entries = [
    ['Dirección de Comunicación — Prefectura de Chuquisaca',
     'Comunicación institucional y gestión de proyectos de comunicación pública.'],
    ['Creando Cultura Tributaria — Impuestos Nacionales',
     'Proyecto comunicacional de gran escala orientado a generar cultura tributaria.'],
    ['Valientas — Universidad Andina',
     'Proyecto orientado al desarrollo de liderazgo femenino en Bolivia.'],
    ['TVCM — Plan International',
     'Proyecto de participación y valoración comunitaria en el ámbito municipal.'],
    ['Wellness Life',
     'Impulso y desarrollo de proyectos vinculados al bienestar.'],
    ['Macropublicidad — Impulso Creativo, Sucre',
     'Una de las primeras empresas en Sucre en incorporar impresión látex y UV, además de tecnologías como micropor.']
  ];

  const grid=document.createElement('div');
  grid.className='trajectory-grid';
  container.appendChild(grid);
  for(const [title,desc] of entries){
    await sleep(35);
    const card=document.createElement('article');
    card.className='trajectory-card';
    card.innerHTML='<div class="trajectory-title">'+title+'</div><div class="trajectory-desc">'+desc+'</div>';
    grid.appendChild(card);
    requestAnimationFrame(()=>card.classList.add('shown'));
  }

  await out('<span class="lo">'+L('Y después llegaron los sistemas.','And then the systems arrived.')+'</span>',true,20);
  await out('<span class="lo">Linux · software · security · AI · audiovisual production</span>',true,20);
  gap();

  busy=false;
  await showOpts([
    {label:'projects', action:screenProjects},
    {label:'contact', action:screenContact},
  ]);
  gap();
  addBack(main);
}
