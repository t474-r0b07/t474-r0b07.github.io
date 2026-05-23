async function screenGit4Dummies(){
  busy=true;clear();
  await cmd('cat git4dummies/README.md',20);
  gap(true);
  await out('<span class="hi">git4dummies</span> &nbsp;<span class="lo">// notas de campo. en español.</span>');
  gap(true);
  await out('La mayoría usa GitHub como un USB en la nube.',false,40);
  await out('Sube archivos. Los baja. No entiende qué pasa en el medio.',true,30);
  gap(true);
  await cmd('echo $TRATO',18);
  await out('No soy tu profesor.',false,40);
  await out('Esto es lo que aprendí rompiéndolo. Masticado y directo.',true,30);
  gap(true);
  await cmd('ls -la contenido/',18);
  gap(true);
  busy=false;
  await showOpts([
    {label:'00_setup · SSH keys',         action:()=>open('https://github.com/t474-r0b07/git4dummies/blob/main/00_setup/ssh-keys.md','_blank')},
    {label:'01_local · estructura repo',  action:()=>open('https://github.com/t474-r0b07/git4dummies/blob/main/01_local/estructura-repo.md','_blank')},
    {label:'ver repo completo',           action:()=>open('https://github.com/t474-r0b07/git4dummies','_blank')},
    {label:'hall of luminous',            action:screenHallOfLuminous},
  ]);
  gap();
  addBack(main);
}

async function screenHallOfLuminous(){
  busy=true;clear();
  await cmd('cat HALL_OF_LUMINOUS.md',20);
  gap(true);
  await out('<span class="hi">HALL OF LUMINOUS</span>');
  await out('<span class="lo">// los que saben mirar en un mundo de ciegos digitales.</span>',true,40);
  gap(true);
  await cmd('echo $CRITERIO',18);
  await out('encontraron lo que no estaba anunciado.',false,40);
  await out('// los bits menos significativos son los que más dicen.',true,30);
  gap(true);
  await cmd('cat /etc/luminous.db',18);
  gap(true);
  await out('¿llegaste hasta acá?',false,60);
  await out('la imagen del README tiene algo adentro.',true,40);
  gap(true);
  busy=false;
  await showOpts([
    {label:'ver el repo',         action:()=>open('https://github.com/t474-r0b07/git4dummies','_blank')},
    {label:'ver hall of luminous',action:()=>open('https://github.com/t474-r0b07/git4dummies/blob/main/HALL_OF_LUMINOUS.md','_blank')},
  ]);
  gap();
  addBack(screenGit4Dummies);
}
