async function addSection(label){
  await sleep(120);
  const t=document.createElement('div');
  t.className='psection-title';
  t.textContent='// '+label;
  container.appendChild(t);
  await sleep(30);
  t.classList.add('shown');
  await sleep(80);
}

async function addBar(label0,label1,pct,note,cls){
  await sleep(70);
  const row=document.createElement('div');
  row.className='prow';
  row.innerHTML=`<span class="plabel"><strong>${label0}</strong> ${label1}</span><div class="pbar"><div class="pfill ${cls}"></div></div><span class="ppct">${note}</span>`;
  container.appendChild(row);
  await sleep(20);
  row.classList.add('shown');
  const fill=row.querySelector('.pfill');
  await sleep(80);
  fill.style.width=pct+'%';
}

async function screenProgress(){
  busy=true;clear();
  await cmd('tail -f progress.log',20);
  await out('<span class="lo">estado actual del trabajo...</span>',true,30);
  gap();

  busy=false;

  // — wargames —
  await addSection('wargames');
  await addBar('OTW','Bandit',100,'34/34','done');
  await addBar('OTW','Leviathan',100,'8/8','done');
  await addBar('OTW','Narnia',100,'12/12','done');
  await addBar('THM','writeups',100,'10/10','done');

  // — proyectos —
  await addSection('proyectos');
  const projects=[
    ['SCCP-DTEX','development'],
    ['SCCP-Mobile','development'],
    ['MPC','private'],
    ['T474verse / wIAdding','in production'],
    ['Piti / Confesiones de una IA','ongoing'],
    ['Hacks-Fi','ongoing'],
  ];

  for(const [name,status] of projects){
    const row=document.createElement('div');
    row.className='prow';
    row.innerHTML=`<span class="plabel"><strong>${name}</strong> ${status}</span><div class="pbar"><div class="pfill warn" style="width:0%"></div></div><span class="ppct">[${status}]</span>`;
    container.appendChild(row);
    await sleep(50);
    row.classList.add('shown');
    const fill=row.querySelector('.pfill');
    await sleep(80);
    fill.style.width='100%';
  }

  gap();

  // — repositorios activos —
  await addSection('repositorios activos');
  await out('<span class="lo">CTF Writeups —</span> Bandit, Leviathan y Narnia completos; 10 writeups de TryHackMe publicados.',true,18);
  await sleep(100);
  await out('<span class="lo">Git4dummies —</span> colección documental activa, con nuevos materiales todavía en desarrollo.',true,18);
  await sleep(100);
  await out('<span class="lo">Lore —</span> índice actualizado con la colección histórica de vulnerabilidades y cultura de explotación.',true,18);
  await sleep(100);
  await out('<span class="lo">Anti-Hype —</span> índice actualizado con los artículos publicados en el repositorio.',true,18);

  gap();

  const footer=document.createElement('div');
  footer.className='live-footer';
  footer.innerHTML=`
    <div class="scan">$ monitor --live</div>
    <div class="scan">estado del sistema<span class="blinkdot"></span></div>
  `;
  container.appendChild(footer);

  gap();
  addBack(main);
}
