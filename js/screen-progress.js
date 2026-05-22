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
  await out('<span class="lo">reading live state...</span>',true,30);
  gap();

  busy=false;

  // — wargames —
  await addSection('wargames');
  await addBar('OTW','Bandit',100,'34/34','done');
  await addBar('OTW','Leviathan',100,'8/8','done');
  await addBar('OTW','Narnia',35,'active','warn');
  await addBar('HTB','active player',35,'35%','warn');

  // — certifications —
  await addSection('path');
  await addBar('red team','certification',8,'queued','crit');
  await addBar('first','CVE',2,'endgame ←','crit');

  gap();

  // — incident archive —
  await cmd('cat incident_archive.log',18);
  await sleep(200);

  await addSection('real incidents');

  const incidents=[
    {label0:'2026.01',label1:'prison admin workstation',note:'[terminated]',pct:100,cls:'done'},
    {label0:'2026.03',label1:'rogue gateway / OEP-SERECI',note:'[isolated]',pct:100,cls:'done'},
    {label0:'2026.04',label1:'VCR surveillance intrusion',note:'[contained]',pct:92,cls:'warn'},
  ];

  for(const i of incidents){
    await addBar(i.label0,i.label1,i.pct,i.note,i.cls);
  }

  gap(true);

  await out('<span class="lo">2026.01 —</span> unauthorized remote access on prison administration system. detected via anomaly in active sessions.',true,18);
  await sleep(100);
  await out('<span class="lo">2026.03 —</span> rogue gateway (Xiaomi / MOBILETECBO.LOCAL) performing ARP sweep + DNS hijack against OEP/SERECI assets at institutional fair. isolated. MAC blacklisted.',true,18);
  await sleep(100);
  await out('<span class="lo">2026.04 —</span> intrusion attempt against surveillance recorder. traffic pattern identified. access vector blocked.',true,18);

  gap();

  const footer=document.createElement('div');
  footer.className='live-footer';
  footer.innerHTML=`
    <div class="scan">$ monitor --live</div>
    <div class="scan">listening for anomalies<span class="blinkdot"></span></div>
  `;
  container.appendChild(footer);

  gap();
  addBack(main);
}
