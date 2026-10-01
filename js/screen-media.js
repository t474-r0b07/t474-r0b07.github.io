async function screenMedia(){
  busy=true;clear();
  await cmd('cat /media/index.txt',20);
  gap(true);
  await out('<span class="hi">AUDIOVISUAL</span>');
  await out('<span class="lo">// '+L('selección de sonido, imagen y movimiento.','selected sound, image and motion work.')+'</span>',true,40);
  gap(true);

  await cmd('ls -la /media/audio/',18);
  await out('<span class="hi">SOUND CLOUD</span>');
  await out(L('Meconio · música experimental de 2009. Un registro de exploración sonora, texturas y composición electrónica de esa etapa.','Meconio · experimental music from 2009. A record of sound exploration, textures and electronic composition from that period.'),true,20);
  gap(true);

  const audioLayout = document.createElement('div');
  audioLayout.style.cssText='display:grid;grid-template-columns:minmax(0,1fr) minmax(420px,560px);gap:2rem;align-items:start;width:100%;';

  const audioText = document.createElement('div');
  audioText.innerHTML=`
    <div class="lo">[01] FELO DE SE</div>
    <div class="lo">[02] cellophane</div>
    <div class="lo">[03] D3574cam3n70</div>
  `;
  audioLayout.appendChild(audioText);

  const audioPanel = document.createElement('div');
  audioPanel.style.cssText='width:100%;border:1px solid #2a4a2a;overflow:hidden;';
  const audio = document.createElement('iframe');
  audio.width='100%';
  audio.height='300';
  audio.scrolling='no';
  audio.frameBorder='no';
  audio.allow='autoplay';
  audio.title='t474-r0b07 on SoundCloud';
  audio.src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1694584550&color=%2300ff41&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true';
  audioPanel.appendChild(audio);
  audioLayout.appendChild(audioPanel);
  container.appendChild(audioLayout);

  const flowSection = document.createElement('div');
  flowSection.style.cssText='margin-top:1rem;display:grid;grid-template-columns:minmax(0,1fr) minmax(420px,560px);gap:2rem;align-items:start;width:100%;';

  const flowText = document.createElement('div');
  flowText.innerHTML='<div class="lo">T474-R0B07 &amp; IA</div><div class="soft" style="margin-top:.8rem;">'+L('Música generada, dirigida y producida por mí.','Music generated, directed and produced by me.')+'</div>';
  flowSection.appendChild(flowText);

  const flowPanel = document.createElement('div');
  flowPanel.style.cssText='width:100%;border:1px solid #2a4a2a;overflow:hidden;';
  const flow = document.createElement('iframe');
  flow.width='100%';
  flow.height='300';
  flow.frameBorder='0';
  flow.allow='autoplay';
  flow.title='T474-R0B07 & IA · Flow Music';
  flow.src='https://www.flowmusic.app/playlist/2b619b24-275b-42fa-ad92-ff91ee296826';
  flowPanel.appendChild(flow);
  flowSection.appendChild(flowPanel);
  container.appendChild(flowSection);

  gap(true);
  await cmd('ls -la /media/video/',18);
  await out('<span class="hi">VIDEO</span>');
  await out(L('Producciones y experimentos audiovisuales seleccionados.','Selected audiovisual productions and experiments.'),true,20);
  gap(true);

  const videos = [
    {name:'Piti · Confesiones de una IA', url:'https://www.youtube.com/@kaderd.garnica/playlists'},
    {name:'Hacks-Fi', url:'https://www.youtube.com/@kaderd.garnica/playlists'},
    {name:'T474verse · wIAdding', url:'https://www.youtube.com/@kaderd.garnica/playlists'},
  ];

  for(let i=0;i<videos.length;i++){
    await sleep(70);
    await out(`<span class="lo">[${String(i+1).padStart(2,'0')}]</span> <a href="${videos[i].url}" target="_blank" rel="noopener">${videos[i].name}</a>`,false,0);
  }

  gap(true);
  await out('// '+L('listas de reproducción en YouTube.','YouTube playlists.')+'',true,50);
  await out('// '+L('sin ficción. sin hype.','no fiction. no hype.')+'',true,50);
  gap();
  busy=false;
  await showOpts([{label:'back', action:main}]);
}
