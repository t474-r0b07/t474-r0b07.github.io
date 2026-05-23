async function screenLore(){
  busy=true;clear();
  await cmd('cat /ctf-writeups/lore/README.md',20);
  gap(true);
  await out('archivos que nadie te va a pedir que leas.',true,60);
  await out('archivos que no podés dejar de leer.',true,60);
  gap(true);
  await cmd('echo $ADVERTENCIA',18);
  await out('el que ejecuta sin entender',false,40);
  await out('es el primero en caer.',true,40);
  gap();
  busy=false;
  await showOpts([
    {label:'danny cohen',  action:()=>screenLoreEntry('danny cohen')},
    {label:'little endian',action:()=>screenLoreEntry('little endian')},
    {label:'jerry saltzer',action:()=>screenLoreEntry('jerry saltzer')},
    {label:'ariane 5',     action:()=>screenLoreEntry('ariane 5')},
    {label:'aleph one',    action:()=>screenLoreEntry('aleph one')},
    {label:'gusano morris',action:()=>screenLoreEntry('gusano morris')},
    {label:'shellshock',   action:()=>screenLoreEntry('shellshock')},
  ]);
  gap();
  addBack(main);
}

async function screenLoreEntry(title){
  busy=true;clear();
  await cmd(`cat /lore/${title.replace(/ /g,'_')}.md`,20);
  gap(true);
  await out(`<span class="hi">${title}</span>`);
  gap(true);

  if(title==='ariane 5'){
    await out('500 millones de dólares. 4 bytes.',false,60);
    await out('El sistema funcionaba perfectamente. Para el cohete anterior.',true,80);
    gap(true);
    await cmd('echo $CONTEXT',18);
    await out('Un integer overflow de 64-bit a 16-bit. 37 segundos de vuelo.',false,40);
    gap(true);
    const {cv,btn}=makeCanvas(560,224);
    animAriane5(cv,btn);
  }
  else if(title==='danny cohen'){
    await out('El hombre que nombró la guerra de los bytes.',false,60);
    await out('Sin él, no habría nombre para el caos que ya existía.',true,80);
    gap(true);
    await cmd('echo $CONTEXT',18);
    await out('Big-endian vs little-endian. Una decisión que dividió arquitecturas.',false,40);
    gap(true);
    const {cv,btn}=makeCanvas(560,180);
    animDannyCohen(cv,btn);
  }
  else if(title==='little endian'){
    await out('Por qué todo está al revés.',false,60);
    await out('La arquitectura que ganó no era la más lógica. Era la más conveniente.',true,80);
    gap(true);
    await cmd('echo $CONTEXT',18);
    await out('0x00000001 se guarda como 01 00 00 00. Siempre.',false,40);
    gap(true);
    const {cv,btn}=makeCanvas(560,180);
    animLittleEndian(cv,btn);
  }
  else if(title==='jerry saltzer'){
    await out('0xDEADBEEF no es un número random.',false,60);
    await out('Alguien lo puso ahí. Alguien lo eligió. Hay una razón.',true,80);
    gap(true);
    await cmd('echo $CONTEXT',18);
    await out('Los magic numbers no son magia. Son memoria de alguien que estuvo antes.',false,40);
    gap(true);
    const {cv,btn}=makeCanvas(560,180);
    animJerrySaltzer(cv,btn);
  }

  else if(title==='aleph one'){
    await out('Smashing the Stack for Fun and Profit.',false,60);
    await out('Un artículo de 1996 que le enseñó a una generación entera cómo romper software.',true,80);
    gap(true);
    await cmd('echo $CONTEXT',18);
    await out('Aleph One explicó los buffer overflows en Phrack #49. El exploit más leído de la historia.',false,40);
    gap(true);
    const {cv,btn}=makeCanvas(560,200);
    animAlephOne(cv,btn);
  }
  else if(title==='gusano morris'){
    await out('2 de noviembre de 1988. El primer gusano de internet.',false,60);
    await out('Robert Morris tenía 23 años. Internet nunca volvió a ser lo mismo.',true,80);
    gap(true);
    await cmd('echo $CONTEXT',18);
    await out('Explotó fingerd, sendmail y rsh. Se replicó solo. Paralizó el 6% de internet.',false,40);
    gap(true);
    const {cv,btn}=makeCanvas(560,200);
    animMorrisWorm(cv,btn);
  }
  else if(title==='shellshock'){
    await out('CVE-2014-6271. Una línea de bash. 25 años sin que nadie la viera.',false,60);
    await out('Estaba ahí desde 1989. En producción. En millones de servidores.',true,80);
    gap(true);
    await cmd('echo $CONTEXT',18);
    await out('env x=&#39;() { :;}; echo vulnerable&#39; bash -c &quot;test&quot;. Así de simple. Así de devastador.',false,40);
    gap(true);
    const {cv,btn}=makeCanvas(560,200);
    animShellshock(cv,btn);
  }

  gap(true);
  await cmd('echo $SOURCE',18);
  await out('<a href="https://github.com/t474-r0b07/ctf-writeups/tree/main/lore" target="_blank" rel="noopener">github.com/t474-r0b07/ctf-writeups/tree/main/lore</a>',true,40);
  gap();
  busy=false;
  addBack(screenLore);
}
