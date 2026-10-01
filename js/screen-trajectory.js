async function screenTrajectory(){
  busy=true;clear();
  await cmd('cat /trajectory/selected',20);
  await out('<span class="hi">TRAYECTORIA</span>');
  await out('<span class="lo">Una selección de proyectos y etapas que dejaron huella.</span>',true,25);
  gap(true);

  await out('<span class="lo">Antes de los repositorios, los modelos y los sistemas de IA, hubo otros proyectos.</span>',true,20);
  await out('<span class="lo">Las herramientas cambiaron. La necesidad de construir cosas no.</span>',true,20);
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

  for(const [title,desc] of entries){
    await out('<span class="hi">'+title+'</span>',false,20);
    await out('<span class="soft">'+desc+'</span>',true,20);
    gap(true);
  }

  await out('<span class="lo">Y después llegaron los sistemas.</span>',true,20);
  await out('<span class="lo">Linux · software · seguridad · IA · producción audiovisual</span>',true,20);
  gap();

  busy=false;
  await showOpts([
    {label:'projects', action:screenProjects},
    {label:'contact', action:screenContact},
  ]);
  gap();
  addBack(main);
}
