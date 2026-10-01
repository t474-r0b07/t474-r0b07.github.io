async function screenMedia(){
  busy=true;clear();
  await cmd('cat /media/index.txt',20);
  gap(true);
  await out('<span class="hi">AUDIOVISUAL</span>');
  await out('<span class="lo">// '+L('selección de sonido, imagen y movimiento.','selected sound, image and motion work.')+'</span>',true,40);
  gap(true);

  await cmd('ls -la /media/audio/',18);
  await out('<span class="hi">AUDIO</span>');
  await out(L('Música original y experimentos sonoros.','Original music and sound experiments.'),true,20);
  gap(true);

  const tracks = [
    {name:'FELO DE SE', url:'https://soundcloud.com/kader-d-garnica/felo-de-se'},
    {name:'cellophane', url:'https://soundcloud.com/kader-d-garnica/cellophane'},
    {name:'D3574cam3n70', url:'https://soundcloud.com/kader-d-garnica/d3574cam3n70'},
  ];

  await cmd('cat tracklist.txt',18);
  for(let i=0;i<tracks.length;i++){
    await sleep(70);
    await out(`<span class="lo">[${String(i+1).padStart(2,'0')}]</span> <a href="${tracks[i].url}" target="_blank" rel="noopener">${tracks[i].name}</a>`,false,0);
  }

  gap(true);
  await cmd('play --soundcloud',18);
  const audioWrap = document.createElement('div');
  audioWrap.style.cssText='width:100%;max-width:560px;margin:0.6rem 0;border:1px solid #2a4a2a;overflow:hidden;';
  const audio = document.createElement('iframe');
  audio.width='100%';
  audio.height='300';
  audio.scrolling='no';
  audio.frameBorder='no';
  audio.allow='autoplay';
  audio.title='t474-r0b07 on SoundCloud';
  audio.src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1694584550&color=%2300ff41&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true';
  audioWrap.appendChild(audio);
  container.appendChild(audioWrap);

  gap(true);
  await cmd('ls -la /media/audio/flow-music/',18);
  await out('<span class="hi">FLOW MUSIC</span>');
  await out(L('Reproductor musical / playlist.','Music player / playlist.'),true,20);
  await out('<span class="lo">STORM DOWN SILK</span>',true,20);
  await out('<a href="https://www.flowmusic.app/playlist/2b619b24-275b-42fa-ad92-ff91ee296826" target="_blank" rel="noopener">open playlist · STORM DOWN SILK</a>',false,0);

  gap(true);
  await cmd('ls -la /media/video/',18);
  await out('<span class="hi">VIDEO</span>');
  await out(L('Producciones y experimentos audiovisuales seleccionados.','Selected audiovisual productions and experiments.'),true,20);
  gap(true);

  const videos = [
    {name:'Piti · Confesiones de una IA', url:'https://www.youtube.com/shorts/PedMu2800lU'},
    {name:'Hacks-Fi · '+L('pieza seleccionada','selected short')+'', url:'https://www.tiktok.com/@t474_r0b07/video/7690703287104081173'},
    {name:'T474verse · wIAdding', url:'https://t474-r0b07.github.io/'},
  ];

  for(let i=0;i<videos.length;i++){
    await sleep(70);
    await out(`<span class="lo">[${String(i+1).padStart(2,'0')}]</span> <a href="${videos[i].url}" target="_blank" rel="noopener">${videos[i].name}</a>`,false,0);
  }

  gap(true);
  await out('// '+L('producciones reales. presentación cinematográfica.','real productions. cinematic presentation.')+'',true,50);
  await out('// '+L('sin ficción. sin hype.','no fiction. no hype.')+'',true,50);
  gap();
  busy=false;
  await showOpts([
    {label:'soundcloud', action:()=>open('https://soundcloud.com/t474-r0b07','_blank')},
    {label:'flow music', action:()=>open('https://www.flowmusic.app/playlist/2b619b24-275b-42fa-ad92-ff91ee296826','_blank')},
    {label:'youtube', action:()=>open('https://youtube.com/@kaderd.garnica','_blank')},
    {label:'back', action:main},
  ]);
}
