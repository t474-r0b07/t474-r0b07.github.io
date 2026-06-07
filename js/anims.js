// ══════════════════════════════════════════════════════════════
// ANIMATIONS — t474-r0b07
// ══════════════════════════════════════════════════════════════

// ── Ariane 5: rocket launch & explosion ──────────────────────
function animAriane5(cv, btn){
  const W=560,H=224,SC=2,GW=W/SC,GH=H/SC;
  let t=0,phase='launch',rocketY=0,explodeT=0,particles=[],smoke=[];
  let shakeX=0,shakeY=0,fadeAlpha=0,launched=false,countdown=70,raf=null;
  const stars=Array.from({length:50},()=>({x:Math.random()*GW,y:Math.random()*GH*0.6,blink:Math.random()*Math.PI*2,sz:Math.random()<0.2?2:1}));
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  function px(x,y,col,s=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC+shakeX,Math.round(y)*SC+shakeY,SC*s,SC*s);}
  function reset(){t=0;phase='launch';rocketY=0;explodeT=0;particles=[];smoke=[];shakeX=0;shakeY=0;fadeAlpha=0;launched=false;countdown=70;btn.classList.remove('visible');}
  btn.onclick=()=>{cancelAnimationFrame(raf);reset();tick();};
  function tick(){
    t++; ctx.fillStyle=C.black; ctx.fillRect(0,0,W,H);
    const CX=GW/2,GY=GH-8;
    if(phase==='launch'&&launched){shakeX=((Math.random()-.5)*3)|0;shakeY=((Math.random()-.5)*2)|0;}
    else if(phase==='explode'&&explodeT<20){const sf=Math.max(0,1-explodeT/20)*4;shakeX=((Math.random()-.5)*sf)|0;shakeY=((Math.random()-.5)*sf)|0;}
    else{shakeX=0;shakeY=0;}
    for(const s of stars){const b=Math.sin(t*0.05+s.blink);if(b>0.3)px(s.x,s.y,b>0.8?C.glow:C.mid,s.sz);}
    const rows=[3,5,7,5,7,5,3];
    function drawTree(x,y,h){for(let i=0;i<Math.min(rows.length,h);i++){const w=rows[i];for(let j=0;j<w;j++){const lx=x+j-Math.floor(w/2);px(lx,y-i,(i===0||j===0||j===w-1)?C.mid:C.bright);}}}
    function drawGround(gy){for(let xx=0;xx<GW;xx++){px(xx,gy,C.mid);px(xx,gy+1,C.dark);}for(let xx=-9;xx<=9;xx++)px(CX+xx,gy-1,C.mid);}
    function drawTower(cx,cy){for(let yy=0;yy<26;yy++){px(cx,cy-yy,C.mid);px(cx+5,cy-yy,C.mid);if(yy%5===0)for(let xx=0;xx<=5;xx++)px(cx+xx,cy-yy,C.mid);}}
    function drawRocket(cx,ry){
      px(cx,ry,C.glow);px(cx-1,ry+1,C.bright);px(cx,ry+1,C.glow);px(cx+1,ry+1,C.bright);
      for(let yy=2;yy<12;yy++){px(cx-1,ry+yy,C.mid);px(cx,ry+yy,C.bright);px(cx+1,ry+yy,C.mid);}
      px(cx-2,ry+10,C.mid);px(cx+2,ry+10,C.mid);px(cx-1,ry+12,C.mid);px(cx,ry+12,C.mid);px(cx+1,ry+12,C.mid);
    }
    function drawExhaust(cx,ry,inten){const len=Math.floor(4+inten*10);for(let yy=0;yy<len;yy++){const sp=Math.floor(yy/3);for(let xx=-sp;xx<=sp;xx++){let col=yy<3?C.white:yy<6?C.glow:C.bright;px(cx+xx,ry+13+yy,col);}}}
    if(phase==='launch'||phase==='fly'){
      for(let i=0;i<4;i++)drawTree(4+i*13,GY-9,5+i%3);
      for(let i=0;i<4;i++)drawTree(GW-8-i*13,GY-9,5+i%3);
      drawTower(CX+16,GY-1);drawGround(GY);
      if(!launched){
        countdown--;drawRocket(CX,GY-15);
        if(countdown<30){const i=(30-countdown)/30;drawExhaust(CX,GY-15,i*.5);}
        if(countdown<=0){launched=true;rocketY=GY-15;}
      } else {
        const spd=Math.max(.3,.3+(GY-15-rocketY)*.012); rocketY-=spd;
        const ry=Math.floor(rocketY);
        if(t%2===0)smoke.push({x:CX+(Math.random()-.5)*4,y:ry+15,vy:.1+Math.random()*.2,vx:(Math.random()-.5)*.3,life:1,r:1+Math.floor(Math.random()*3)});
        for(const s of smoke){s.x+=s.vx;s.y+=s.vy;s.life-=.02;s.r+=.05;}
        smoke=smoke.filter(s=>s.life>0);
        for(const s of smoke){ctx.globalAlpha=s.life*0.4;const r=Math.floor(s.r);for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++)if(dx*dx+dy*dy<=r*r)px(Math.floor(s.x)+dx,Math.floor(s.y)+dy,C.dark);ctx.globalAlpha=1;}
        drawExhaust(CX,ry,.9);drawRocket(CX,ry);
        if(rocketY<-5){
          phase='explode';explodeT=0;
          for(let i=0;i<120;i++){const a=Math.random()*Math.PI*2,sp=.5+Math.random()*3.5;particles.push({x:CX,y:5,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-Math.random()*2,life:.8+Math.random()*.2,color:[C.white,C.glow,C.bright,C.mid][Math.floor(Math.random()*4)],sz:Math.random()<.3?2:1});}
        }
      }
    }
    if(phase==='explode'){
      for(let i=0;i<4;i++)drawTree(4+i*13,GY-9,5+i%3);drawTower(CX+16,GY-1);drawGround(GY);
      explodeT++;
      if(explodeT<8){ctx.fillStyle=`rgba(0,255,65,${Math.max(0,.9-explodeT*.12)})`;ctx.fillRect(0,0,W,H);}
      if(explodeT<30){ctx.strokeStyle=explodeT<10?C.white:C.glow;ctx.lineWidth=SC;ctx.globalAlpha=Math.max(0,1-explodeT/30);ctx.beginPath();ctx.arc(CX*SC,5*SC,explodeT*2*SC,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;}
      for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.07;p.life-=.013;}
      particles=particles.filter(p=>p.life>0);
      for(const p of particles){ctx.globalAlpha=p.life;px(Math.floor(p.x),Math.floor(p.y),p.color,p.sz);ctx.globalAlpha=1;}
      if(explodeT>120&&particles.length===0)phase='done';
    }
    if(phase==='done'){
      fadeAlpha=Math.min(1,fadeAlpha+.008);
      ctx.fillStyle=`rgba(0,10,0,${fadeAlpha*.7})`;ctx.fillRect(0,0,W,H);
      if(fadeAlpha>=.5)btn.classList.add('visible');
      if(fadeAlpha<1){raf=requestAnimationFrame(tick);return;}
      return;
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Danny Cohen: big-endian vs little-endian byte war ────────
function animDannyCohen(cv, btn){
  const W=560,H=180,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function drawByte(x,y,val,col){ctx.fillStyle=col;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';ctx.fillText(val,Math.round(x)*SC,Math.round(y+5)*SC);}
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;tick();};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    const cy=GH/2;
    const bytesBig=['00','00','04','01'];
    const bytesLit=['01','04','00','00'];
    const spacing=14;
    const startX=GW/2-spacing*1.5;
    ctx.fillStyle=C.bright;ctx.font=`${SC*4}px monospace`;ctx.textAlign='left';
    ctx.fillText('BIG-ENDIAN',4*SC,10*SC);
    ctx.fillStyle=C.mid;
    ctx.fillText('LITTLE-ENDIAN',4*SC,(cy+14)*SC);
    ctx.fillStyle=C.glow;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';
    ctx.fillText('0x00000401',GW/2*SC,8*SC);
    for(let i=0;i<4;i++){
      const offset=Math.sin(t*0.05+i)*1.5;
      const bx=startX+i*spacing;
      const pulse=Math.sin(t*0.08+i*0.8)>0.5;
      drawByte(bx,cy-18+offset,bytesBig[i],pulse?C.white:C.bright);
      ctx.strokeStyle=C.mid;ctx.lineWidth=1;
      ctx.strokeRect((bx-5)*SC,(cy-24)*SC,10*SC,10*SC);
      const lx=startX+i*spacing;
      const pulse2=Math.sin(t*0.08+(3-i)*0.8)>0.5;
      drawByte(lx,cy+6+offset,bytesLit[i],pulse2?C.glow:C.mid);
      ctx.strokeStyle=C.dark;ctx.lineWidth=1;
      ctx.strokeRect((lx-5)*SC,(cy)*SC,10*SC,10*SC);
    }
    const sparkX=GW/2+Math.sin(t*0.3)*3;
    const sparkY=cy-6;
    if(t%3===0){for(let i=0;i<3;i++){const sx=sparkX+(Math.random()-.5)*8;const sy=sparkY+(Math.random()-.5)*4;px(sx,sy,Math.random()>0.5?C.glow:C.white);}}
    ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('← conflict →',GW/2*SC,(cy-8)*SC);
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
    ctx.fillText('"On Holy Wars and a Plea for Peace" — Danny Cohen, 1980',GW/2*SC,(GH-5)*SC);
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Little Endian: number inverting in memory ─────────────────
function animLittleEndian(cv, btn){
  const W=560,H=180,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  const addresses=['0x00','0x01','0x02','0x03'];
  const valBig=['00','00','00','01'];
  const valLit=['01','00','00','00'];
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;tick();};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    const cols=4,cellW=22,cellH=16;
    const startX=(GW-(cols*cellW+cols*4))/2;
    const rowBig=GH/2-18,rowLit=GH/2+8;
    const progress=Math.min(1,t/80);
    ctx.fillStyle=C.glow;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';
    ctx.fillText('0x00000001',GW/2*SC,9*SC);
    ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
    ctx.fillText('big-endian    (natural order):',startX*SC,rowBig*SC-6*SC);
    ctx.fillStyle=C.mid;
    ctx.fillText('little-endian (memory order): ',startX*SC,rowLit*SC-6*SC);
    for(let i=0;i<4;i++){
      const x=startX+i*(cellW+4);
      ctx.fillStyle=C.dim||'#2a4a2a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText(addresses[i],(x+cellW/2)*SC,(rowBig-8)*SC);
      ctx.strokeStyle=C.mid;ctx.lineWidth=1;
      ctx.strokeRect(x*SC,rowBig*SC,cellW*SC,cellH*SC);
      const bigAlpha=Math.max(0,progress*2-i*0.4);
      ctx.globalAlpha=Math.min(1,bigAlpha);
      ctx.fillStyle=C.bright;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
      ctx.fillText(valBig[i],(x+cellW/2)*SC,(rowBig+cellH*0.7)*SC);
      ctx.globalAlpha=1;
      ctx.strokeStyle=C.glow;ctx.lineWidth=1;
      ctx.strokeRect(x*SC,rowLit*SC,cellW*SC,cellH*SC);
      const litAlpha=Math.max(0,progress*2-(3-i)*0.4);
      ctx.globalAlpha=Math.min(1,litAlpha);
      ctx.fillStyle=i===0?C.glow:C.mid;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
      ctx.fillText(valLit[i],(x+cellW/2)*SC,(rowLit+cellH*0.7)*SC);
      ctx.globalAlpha=1;
    }
    if(progress>0.7){
      const alpha=(progress-0.7)/0.3;
      ctx.globalAlpha=alpha;
      ctx.strokeStyle=C.glow;ctx.lineWidth=SC;
      ctx.beginPath();
      ctx.moveTo((startX+cellW*0.5)*SC,(rowBig+cellH+2)*SC);
      ctx.lineTo((startX+cellW*4+12+cellW*0.5)*SC,(rowLit-2)*SC);
      ctx.stroke();
      ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('reversed in memory',GW/2*SC,(rowBig+cellH+10)*SC);
      ctx.globalAlpha=1;
    }
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('x86 · ARM · most modern CPUs store this way',(GW/2)*SC,(GH-5)*SC);
    if(t<240)raf=requestAnimationFrame(tick);
    else btn.classList.add('visible');
  }
  tick();
}

// ── Jerry Saltzer: 0xDEADBEEF appearing in memory dump ───────
function animJerrySaltzer(cv, btn){
  const W=560,H=180,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  const rows=6,cols=8;
  const cellW=10,cellH=10;
  const startX=(GW-(cols*cellW+cols*2))/2;
  const startY=12;
  let grid=Array.from({length:rows},()=>Array.from({length:cols},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0').toUpperCase()));
  const deadRow=3,deadCol=2;
  const deadBytes=['DE','AD','BE','EF'];
  let revealT=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;revealT=0;grid=Array.from({length:rows},()=>Array.from({length:cols},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0').toUpperCase()));tick();btn.classList.remove('visible');};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';
    const glitch=t>60&&t%40<3;
    ctx.fillText(glitch?'0xDE??BEEF':'0xDEADBEEF',GW/2*SC,9*SC);
    if(t%8===0){for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const isDead=r===deadRow&&c>=deadCol&&c<deadCol+4;if(!isDead)grid[r][c]=Math.floor(Math.random()*256).toString(16).padStart(2,'0').toUpperCase();}}
    if(t>60){revealT++;const byteIdx=Math.floor(revealT/20);for(let i=0;i<=Math.min(byteIdx,3);i++){grid[deadRow][deadCol+i]=deadBytes[i];}}
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const x=startX+c*(cellW+2);const y=startY+r*(cellH+2);
        const isDead=r===deadRow&&c>=deadCol&&c<deadCol+4&&t>60;
        const isRevealed=isDead&&grid[r][c]===deadBytes[c-deadCol];
        if(isRevealed){ctx.fillStyle='rgba(0,255,65,0.1)';ctx.fillRect(x*SC,(y-1)*SC,cellW*SC,(cellH+1)*SC);ctx.fillStyle=C.glow;}
        else{ctx.fillStyle=C.mid;}
        ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
        ctx.fillText(grid[r][c],(x+cellW/2)*SC,(y+cellH*0.75)*SC);
      }
      ctx.fillStyle=C.dark;ctx.font=`${SC*3}px monospace`;ctx.textAlign='right';
      ctx.fillText(`0x${(0x7fff0+r*8).toString(16).toUpperCase()}`,(startX-3)*SC,(startY+r*(cellH+2)+cellH*0.75)*SC);
    }
    if(t>140){const alpha=Math.min(1,(t-140)/30);ctx.globalAlpha=alpha;ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';ctx.fillText('not random. intentional. someone put it there.',(GW/2)*SC,(GH-5)*SC);ctx.globalAlpha=1;}
    if(t>220)btn.classList.add('visible');
    else raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Aleph One: book flies and hits heads ─────────────────────
function animAlephOne(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  const heads=[{x:60,y:GH-28,hit:false,hitT:0,bounce:0},{x:110,y:GH-28,hit:false,hitT:0,bounce:0},{x:160,y:GH-28,hit:false,hitT:0,bounce:0},{x:210,y:GH-28,hit:false,hitT:0,bounce:0},{x:260,y:GH-28,hit:false,hitT:0,bounce:0}];
  let book={x:8,y:GH-50,vx:1.8,vy:-2.2,angle:0,bounces:0};
  let done=false;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;done=false;book={x:8,y:GH-50,vx:1.8,vy:-2.2,angle:0,bounces:0};heads.forEach(h=>{h.hit=false;h.hitT=0;h.bounce=0;});btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function drawBook(x,y,angle){const bx=Math.round(x);const by=Math.round(y);ctx.save();ctx.translate(bx*SC,by*SC);ctx.rotate(angle);ctx.fillStyle=C.glow;ctx.fillRect(-7*SC,-5*SC,14*SC,10*SC);ctx.fillStyle=C.bright;ctx.fillRect(-6*SC,-4*SC,2*SC,8*SC);ctx.fillStyle=C.black;for(let i=0;i<3;i++)ctx.fillRect(-2*SC,(-3+i*3)*SC,8*SC,SC);ctx.restore();}
  function drawHead(hd){const x=hd.x;const y=hd.y-hd.bounce;const col=hd.hit?C.glow:C.mid;px(x-3,y-8,col,6,2);px(x-4,y-6,col,8,5);px(x-3,y-1,col,6,2);if(!hd.hit){px(x-2,y-5,C.black,2,2);px(x+1,y-5,C.black,2,2);}else{px(x-2,y-5,C.black);px(x-1,y-4,C.black);px(x+2,y-5,C.black);px(x+1,y-4,C.black);}px(x-2,y+1,C.mid,4,6);if(hd.hit&&hd.hitT<30){const s=Math.floor(hd.hitT/5)%2;if(s===0){px(x-5,y-10,C.glow,2,2);px(x+4,y-10,C.glow,2,2);}}}
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    for(let x=0;x<GW;x++)px(x,GH-8,C.mid);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('Phrack #49',GW/2*SC,9*SC);
    if(!done){book.x+=book.vx;book.y+=book.vy;book.vy+=0.12;book.angle+=0.08;if(book.y>GH-22){book.y=GH-22;book.vy*=-0.6;book.vx*=0.95;book.bounces++;}heads.forEach(h=>{if(!h.hit&&Math.abs(book.x-h.x)<10&&Math.abs(book.y-h.y)<12){h.hit=true;book.vy=-1.5;book.vx+=0.3;}});if(book.bounces>4&&book.x>GW)done=true;}
    heads.forEach(h=>{if(h.hit){h.hitT++;h.bounce=Math.max(0,Math.sin(h.hitT*0.3)*6*(1-h.hitT/40));}});
    heads.forEach(h=>drawHead(h));
    drawBook(book.x,book.y,book.angle);
    const hitCount=heads.filter(h=>h.hit).length;
    if(hitCount>0){ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';ctx.fillText(`minds reached: ${hitCount}`,GW/2*SC,18*SC);}
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('Aleph One — 1996 — knowledge that cannot be unlearned',(GW/2)*SC,(GH-3)*SC);
    if(done)btn.classList.add('visible');
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Morris Worm ───────────────────────────────────────────────
function animMorrisWorm(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  const apples=[{x:40,y:GH/2,infected:true,infectedT:0,rot:0,worms:[]},{x:100,y:GH/2,infected:false,infectedT:0,rot:0,worms:[]},{x:160,y:GH/2,infected:false,infectedT:0,rot:0,worms:[]},{x:220,y:GH/2,infected:false,infectedT:0,rot:0,worms:[]},{x:280,y:GH/2,infected:false,infectedT:0,rot:0,worms:[]}];
  let travelers=[];
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;travelers=[];apples.forEach((a,i)=>{a.infected=i===0;a.infectedT=0;a.rot=0;a.worms=[];});btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function drawApple(a){const x=a.x;const y=a.y;const rot=Math.min(1,a.rot);const bodyCol=a.infected?(rot>0.5?C.dark:'#2a6b2a'):(C.bright);const spotCol=a.infected?C.mid:C.dark;px(x,y-10,C.mid,1,3);px(x+1,y-10,C.mid,1,2);px(x+2,y-10,C.bright,3,2);px(x-5,y-7,bodyCol,10,2);px(x-7,y-5,bodyCol,14,8);px(x-5,y+3,bodyCol,10,2);if(rot>0.3){px(x-2,y-3,spotCol,3,3);px(x+2,y,spotCol,2,2);}if(rot>0.7){px(x-4,y-1,spotCol,2,2);px(x+1,y-5,spotCol,3,3);}a.worms.forEach((w,i)=>{const wx=x-3+Math.sin(t*0.1+i*2)*5;const wy=y-2+Math.cos(t*0.08+i)*3;px(wx,wy,C.glow,2,1);px(wx+2,wy,C.glow,1,1);});}
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    for(let x=0;x<GW;x++)px(x,GH-8,C.dark);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('internet — 1988',GW/2*SC,9*SC);
    if(t%90===0){apples.forEach((a,i)=>{if(a.infected&&i+1<apples.length&&!apples[i+1].infected){travelers.push({sx:a.x,sy:a.y,tx:apples[i+1].x,ty:apples[i+1].y,progress:0,target:i+1,wy:0});}});}
    travelers.forEach(w=>{w.progress=Math.min(1,w.progress+0.015);w.wy=Math.sin(w.progress*Math.PI)*-15;if(w.progress>=1){const a=apples[w.target];a.infected=true;a.worms.push({});}});
    travelers=travelers.filter(w=>w.progress<1);
    apples.forEach(a=>{if(a.infected){a.infectedT++;a.rot=Math.min(1,a.infectedT/120);if(a.worms.length<3&&a.infectedT%30===0)a.worms.push({});}});
    for(let i=0;i<apples.length-1;i++){ctx.strokeStyle=C.dark;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(apples[i].x*SC,(apples[i].y+5)*SC);ctx.lineTo(apples[i+1].x*SC,(apples[i+1].y+5)*SC);ctx.stroke();}
    travelers.forEach(w=>{const x=w.sx+(w.tx-w.sx)*w.progress;const y=w.sy+w.wy;ctx.fillStyle=C.glow;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,4*SC,2*SC);ctx.fillRect((Math.round(x)+2)*SC,(Math.round(y)-1)*SC,2*SC,SC);});
    apples.forEach(a=>drawApple(a));
    const infectedCount=apples.filter(a=>a.infected).length;
    ctx.fillStyle=infectedCount===apples.length?C.glow:C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText(`infected: ${infectedCount}/${apples.length}`,GW/2*SC,18*SC);
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('Morris Worm — 6000 machines in 24h',(GW/2)*SC,(GH-3)*SC);
    if(infectedCount===apples.length&&t>200)btn.classList.add('visible');
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Shellshock ───────────────────────────────────────────────
function animShellshock(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='queue',thiefX=0,thiefY=0,doneT=0;
  const people=[];
  for(let i=0;i<5;i++)people.push({x:GW-30-i*14,y:GH-20});
  const DOOR_X=GW-18,WINDOW_X=25,WALL_Y=GH-40;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='queue';thiefX=4;thiefY=GH-20;doneT=0;btn.classList.remove('visible');tick();};
  thiefX=4;thiefY=GH-20;
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function drawWall(){for(let x=10;x<GW-10;x++)px(x,WALL_Y,C.mid,1,2);for(let y=WALL_Y;y<GH-8;y++){px(10,y,C.mid);px(GW-10,y,C.mid);}for(let x=0;x<GW;x++)px(x,GH-8,C.mid);px(DOOR_X-6,WALL_Y,C.dark,12,30);px(DOOR_X-5,WALL_Y+1,C.mid,10,28);px(DOOR_X-2,WALL_Y+12,C.glow,4,4);px(DOOR_X-1,WALL_Y+10,C.glow,2,3);px(WINDOW_X-4,WALL_Y+2,C.dark,10,12);px(WINDOW_X-3,WALL_Y+3,C.mid,8,10);ctx.strokeStyle=C.mid;ctx.lineWidth=SC;ctx.strokeRect((WINDOW_X-4)*SC,(WALL_Y+2)*SC,10*SC,12*SC);ctx.fillStyle=C.dark;ctx.font=`${SC*2}px monospace`;ctx.textAlign='center';ctx.fillText('env',(WINDOW_X)*SC,(WALL_Y+18)*SC);}
  function drawPerson(x,y,isThief){if(isThief){px(x-2,y-5,C.bright,4,5);px(x-2,y-4,C.mid,4,1);px(x-2,y-2,C.mid,4,1);px(x-2,y-8,C.bright,4,3);px(x-2,y-7,C.black,4,2);px(x-1,y-10,C.bright,2,3);px(x-2,y,C.mid,2,4);px(x+1,y,C.mid,2,4);}else{px(x-1,y-10,C.mid,2,3);px(x-2,y-7,C.mid,4,5);px(x-1,y,C.mid,2,4);}}
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('CVE-2014-6271',GW/2*SC,9*SC);
    drawWall();
    people.forEach(p=>{drawPerson(p.x,p.y,false);ctx.fillStyle=C.mid;ctx.font=`${SC*2}px monospace`;ctx.textAlign='center';if(t%60<30)ctx.fillText('?',p.x*SC,(p.y-14)*SC);});
    if(t%40<20){ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';ctx.fillText('↑ LOCK',(DOOR_X-2)*SC,(WALL_Y-4)*SC);}
    if(phase==='queue'&&t>60)phase='approach';
    if(phase==='approach'){if(thiefX<WINDOW_X-6)thiefX+=0.8;else phase='climb';}
    if(phase==='climb'){if(thiefY>WALL_Y+5){thiefY-=0.8;thiefX=WINDOW_X-2;}else{phase='inside';thiefX=WINDOW_X+8;}}
    if(phase==='inside'){if(thiefX<GW-25)thiefX+=0.6;else{doneT++;if(doneT>60)phase='done';}}
    if(phase!=='queue')drawPerson(thiefX,thiefY,true);
    if(phase==='inside'||phase==='done'){ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';const shake=phase==='inside'&&doneT<20?(Math.random()-.5)*2:0;ctx.fillText('INSIDE',(GW/2+shake)*SC,(WALL_Y-6)*SC);}
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('25 years. nobody checked the window.',(GW/2)*SC,(GH-3)*SC);
    if(phase==='done')btn.classList.add('visible');
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Y2K: clock rolling over from 99 to 00 ────────────────────
function animY2K(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='countdown',rollT=0,chaos=false,chaosT=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='countdown';rollT=0;chaos=false;chaosT=0;btn.classList.remove('visible');tick();};
  const systems=['POWER GRID','BANK SYSTEM','AIR TRAFFIC','HOSPITAL DB','MILITARY NET'];
  let sysStates=systems.map(()=>({fail:false,failT:0}));
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    // big clock display
    const sec=Math.floor(t/2)%60;
    const yr=phase==='countdown'?99:phase==='roll'?Math.floor(rollT/8)%100:0;
    const yrStr=String(yr).padStart(2,'0');
    const glitch=phase==='roll'&&rollT>20&&Math.random()>0.7;
    ctx.fillStyle=phase==='done'?C.bright:C.glow;
    ctx.font=`${SC*14}px monospace`;ctx.textAlign='center';
    ctx.fillText(glitch?'??':yrStr,GW/2*SC,(GH/2-8)*SC);
    // label
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('YEAR (stored as 2 digits)',GW/2*SC,14*SC);
    // systems
    const sysY=GH/2+12;
    systems.forEach((s,i)=>{
      const x=8+i*(GW/5);
      const state=sysStates[i];
      const col=state.fail?C.glow:C.dim||'#1a4d1a';
      ctx.fillStyle=col;ctx.font=`${SC*2}px monospace`;ctx.textAlign='left';
      ctx.fillText(s,x*SC,sysY*SC);
      const statusCol=state.fail?(chaosT%6<3?C.glow:C.dark):C.mid;
      ctx.fillStyle=statusCol;
      ctx.fillText(state.fail?'[FAIL]':'[  OK]',x*SC,(sysY+5)*SC);
    });
    // phase logic
    if(phase==='countdown'&&t>80){phase='roll';rollT=0;}
    if(phase==='roll'){
      rollT++;
      if(rollT>60){phase='done';chaos=true;}
    }
    if(chaos){
      chaosT++;
      // cascade failures
      const failIdx=Math.floor(chaosT/15);
      for(let i=0;i<=Math.min(failIdx,systems.length-1);i++){
        sysStates[i].fail=true;
      }
      // screen shake
      if(chaosT<30){
        ctx.fillStyle=`rgba(0,255,65,${Math.max(0,0.3-chaosT*0.01)})`;
        ctx.fillRect(0,0,W,H);
      }
    }
    // bottom label
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('1900 or 2000? the machine assumed. it was wrong.',(GW/2)*SC,(GH-5)*SC);
    if(chaos&&chaosT>120)btn.classList.add('visible');
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── PRISM: companies delivering data to NSA ───────────────────
function animPrism(cv, btn){
  const W=560,H=220,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  const companies=['Microsoft','Yahoo','Google','Facebook','YouTube','Skype','Apple'];
  const cx=GW-25,cy=GH/2;
  let revealed=[];
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;revealed=[];btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    // NSA node
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('NSA',cx*SC,cy*SC);
    ctx.strokeStyle=C.glow;ctx.lineWidth=SC;
    ctx.strokeRect((cx-10)*SC,(cy-8)*SC,20*SC,12*SC);
    // reveal companies one by one
    const revealIdx=Math.floor(t/40);
    for(let i=0;i<Math.min(revealIdx,companies.length);i++){
      const angle=(i/(companies.length-1))*Math.PI*1.2-Math.PI*0.6;
      const ex=20;
      const ey=cy+Math.sin(angle)*(GH*0.38);
      // pulse line
      const pulsePhase=(t+i*20)%60;
      const pulseX=ex+(cx-ex)*(pulsePhase/60);
      const pulseY=ey+(cy-ey)*(pulsePhase/60);
      ctx.strokeStyle=C.dark;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(ex*SC,ey*SC);ctx.lineTo(cx*SC,cy*SC);ctx.stroke();
      ctx.fillStyle=C.glow;
      ctx.fillRect(Math.round(pulseX)*SC,Math.round(pulseY)*SC,3*SC,3*SC);
      // company label
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(companies[i],2*SC,ey*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*2}px monospace`;
      ctx.fillText('[access granted]',2*SC,(ey+5)*SC);
    }
    // title
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('PRISM — 2007-2013',(GW/2)*SC,10*SC);
    // bottom
    const done=revealIdx>=companies.length;
    if(done){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('no hack needed. they had the key.',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    } else {
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('Snowden — June 6, 2013',(GW/2)*SC,(GH-5)*SC);
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Cambridge Analytica: OCEAN profile building ───────────────
function animCambridgeAnalytica(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  const traits=['O','C','E','A','N'];
  const traitNames=['Openness','Conscientiousness','Extraversion','Agreeableness','Neuroticism'];
  const targetPct=[72,45,61,38,83];
  let currentPct=[0,0,0,0,0];
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;currentPct=[0,0,0,0,0];btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('OCEAN Profile — building...',GW/2*SC,10*SC);
    // update bars
    const speed=0.4;
    let allDone=true;
    for(let i=0;i<5;i++){
      if(currentPct[i]<targetPct[i]){currentPct[i]=Math.min(targetPct[i],currentPct[i]+speed);allDone=false;}
    }
    // draw bars
    const barW=55,barH=4,startX=10,barY=22;
    for(let i=0;i<5;i++){
      const x=startX;
      const y=barY+i*14;
      // trait letter
      ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='left';
      ctx.fillText(traits[i],(x)*SC,(y+4)*SC);
      // name
      ctx.fillStyle=C.dim||'#2a4a2a';ctx.font=`${SC*3}px monospace`;
      ctx.fillText(traitNames[i],(x+7)*SC,(y+4)*SC);
      // bar bg
      ctx.fillStyle=C.dark;ctx.fillRect((x+38)*SC,y*SC,barW*SC,barH*SC);
      // bar fill
      ctx.fillStyle=currentPct[i]>60?C.glow:C.bright;
      ctx.fillRect((x+38)*SC,y*SC,Math.round(currentPct[i]/100*barW)*SC,barH*SC);
      // pct
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(Math.floor(currentPct[i])+'%',(x+38+barW+3)*SC,(y+4)*SC);
    }
    if(allDone){
      ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('87,000,000 profiles built. without consent.',GW/2*SC,(GH/2+18)*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('Cambridge Analytica — 2013-2018',GW/2*SC,(GH-5)*SC);
      btn.classList.add('visible');
    } else {
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('your likes. your shares. your time spent reading.',(GW/2)*SC,(GH-5)*SC);
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── ECHELON: global intercept network ────────────────────────
function animEchelon(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  const nodes=[
    {x:35,y:30,name:'Menwith Hill'},
    {x:200,y:50,name:'Sugar Grove'},
    {x:80,y:90,name:'Leitrim'},
    {x:220,y:85,name:'Pine Gap'},
    {x:145,y:35,name:'Misawa'},
  ];
  const packets=[];
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;packets.length=0;btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('ECHELON — Five Eyes',GW/2*SC,10*SC);
    // draw network lines
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      ctx.strokeStyle=C.dark;ctx.lineWidth=1;ctx.beginPath();
      ctx.moveTo(nodes[i].x*SC,nodes[i].y*SC);
      ctx.lineTo(nodes[j].x*SC,nodes[j].y*SC);
      ctx.stroke();
    }
    // spawn intercept packets
    if(t%18===0){
      const src={x:Math.random()*GW,y:GH/2+Math.random()*30};
      const dst=nodes[Math.floor(Math.random()*nodes.length)];
      packets.push({x:src.x,y:src.y,tx:dst.x,ty:dst.y,p:0,captured:false});
    }
    // move packets
    packets.forEach(p=>{p.p=Math.min(1,p.p+0.025);p.x=p.x+(p.tx-p.x)*0.025;p.y=p.y+(p.ty-p.y)*0.025;if(p.p>0.95)p.captured=true;});
    packets.forEach(p=>{ctx.fillStyle=p.captured?C.glow:C.mid;ctx.fillRect(Math.round(p.x)*SC,Math.round(p.y)*SC,3*SC,2*SC);});
    // draw nodes
    nodes.forEach(n=>{
      px(n.x-4,n.y-4,C.glow,8,8);
      ctx.fillStyle=C.black;
      ctx.fillRect((n.x-3)*SC,(n.y-3)*SC,6*SC,6*SC);
      px(n.x-1,n.y-1,C.glow,2,2);
      ctx.fillStyle=C.bright;ctx.font=`${SC*2}px monospace`;ctx.textAlign='center';
      ctx.fillText(n.name,n.x*SC,(n.y+9)*SC);
    });
    // intercept counter
    const captured=packets.filter(p=>p.captured).length;
    if(captured>0){
      ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText(`intercepted: ${captured}`,GW/2*SC,22*SC);
    }
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('1960 → present. capture all. filter after.',(GW/2)*SC,(GH-5)*SC);
    if(t>200)btn.classList.add('visible');
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Lou Montulli: cookie tracking chain ──────────────────────
function animLouMontulli(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase=0;
  const steps=[
    {label:'user visits tienda.com',y:20},
    {label:'tienda.com sets cookie',y:40},
    {label:'ad from adserver.com loads',y:60},
    {label:'adserver.com reads your cookie',y:80},
    {label:'you visit blog.com',y:100},
    {label:'adserver.com already knows you',y:120},
  ];
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase=0;btn.classList.remove('visible');tick();};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('The Cookie — 1994',GW/2*SC,10*SC);
    // reveal steps
    const revealStep=Math.floor(t/45);
    for(let i=0;i<Math.min(revealStep,steps.length);i++){
      const s=steps[i];
      const isLast=i===steps.length-1;
      ctx.fillStyle=isLast?C.glow:i<2?C.bright:C.mid;
      ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(`${i<2?'✓':'→'} ${s.label}`,8*SC,s.y*SC);
      if(i>0){
        ctx.fillStyle=C.dark;
        ctx.fillRect(6*SC,(s.y-8)*SC,2*SC,6*SC);
      }
    }
    if(revealStep>=steps.length){
      ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('270,000 users → 87,000,000 profiles',GW/2*SC,(GH/2+22)*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('Lou Montulli, 1994 — "I should have designed it differently"',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Solar Designer: ret-into-libc ────────────────────────────
function animSolarDesigner(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='nx',eip=null,arrow=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='nx';eip=null;arrow=0;btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function drawStack(highlight){
    const cells=[
      {label:'STACK',val:'shellcode?',x:10,y:30,w:55,warn:true},
      {label:'saved EIP',val:'→ shellcode',x:10,y:55,w:55,warn:true},
      {label:'buf[20]',val:'AAAA....',x:10,y:75,w:55,warn:false},
    ];
    cells.forEach(c=>{
      ctx.strokeStyle=c.warn?C.glow:C.mid;ctx.lineWidth=1;
      ctx.strokeRect(c.x*SC,c.y*SC,c.w*SC,10*SC);
      ctx.fillStyle=c.warn?C.glow:C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(c.label,(c.x+2)*SC,(c.y+7)*SC);
      ctx.fillStyle=C.mid;ctx.textAlign='right';
      ctx.fillText(c.val,(c.x+c.w-2)*SC,(c.y+7)*SC);
    });
  }
  function drawLibc(){
    const funcs=[
      {name:'system()',x:160,y:30},
      {name:'/bin/sh',x:160,y:50},
      {name:'exit()',x:160,y:70},
    ];
    ctx.fillStyle=C.dim||'#1a4d1a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
    ctx.fillText('libc (always in memory)',160*SC,22*SC);
    funcs.forEach(f=>{
      ctx.strokeStyle=C.mid;ctx.lineWidth=1;
      ctx.strokeRect(f.x*SC,f.y*SC,50*SC,10*SC);
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(f.name,(f.x+2)*SC,(f.y+7)*SC);
    });
  }
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    if(t<80){
      ctx.fillText('stack is NON-EXECUTABLE',GW/2*SC,12*SC);
      ctx.fillStyle=C.dim||'#2a4a2a';ctx.font=`${SC*3}px monospace`;
      ctx.fillText('Solar Designer — 1997 — NX patch',GW/2*SC,20*SC);
      // X over shellcode
      ctx.strokeStyle=C.glow;ctx.lineWidth=SC*2;
      ctx.beginPath();ctx.moveTo(10*SC,30*SC);ctx.lineTo(65*SC,90*SC);ctx.stroke();
      ctx.beginPath();ctx.moveTo(65*SC,30*SC);ctx.lineTo(10*SC,90*SC);ctx.stroke();
    } else {
      ctx.fillText('ret-into-libc',GW/2*SC,12*SC);
      ctx.fillStyle=C.dim||'#2a4a2a';ctx.font=`${SC*3}px monospace`;
      ctx.fillText('same year. same author. different paper.',GW/2*SC,20*SC);
      drawStack(true);
      drawLibc();
      // animated arrow from EIP to system()
      arrow=Math.min(1,arrow+0.015);
      const sx=65,sy=60,ex=160,ey=35;
      ctx.strokeStyle=C.glow;ctx.lineWidth=SC;
      ctx.beginPath();ctx.moveTo(sx*SC,sy*SC);
      ctx.lineTo((sx+(ex-sx)*arrow)*SC,(sy+(ey-sy)*arrow)*SC);
      ctx.stroke();
      if(arrow>0.9){
        ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
        ctx.fillText('no shellcode. no injection.',GW/2*SC,(GH/2+25)*SC);
        ctx.fillText('the binary executes its own libc.',(GW/2)*SC,(GH/2+35)*SC);
        btn.classList.add('visible');
      }
    }
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('mitigations define the next attack',(GW/2)*SC,(GH-5)*SC);
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Ken Thompson: trusting trust ─────────────────────────────
function animKenThompson(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='compile',infect=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='compile';infect=0;btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  const chain=['source.c','compiler v1','compiler v2','login binary'];
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('Trusting Trust — 1984',GW/2*SC,10*SC);
    // draw compilation chain
    const startX=10,stepW=55,y=35;
    chain.forEach((c,i)=>{
      const x=startX+i*stepW;
      const infected=i>0&&infect>i-1;
      ctx.strokeStyle=infected?C.glow:C.mid;ctx.lineWidth=1;
      ctx.strokeRect(x*SC,y*SC,50*SC,14*SC);
      ctx.fillStyle=infected?C.glow:C.bright;ctx.font=`${SC*2}px monospace`;ctx.textAlign='center';
      ctx.fillText(c,(x+25)*SC,(y+9)*SC);
      // infection label
      if(infected){
        ctx.fillStyle=C.glow;ctx.font=`${SC*2}px monospace`;
        ctx.fillText('[backdoor]',(x+25)*SC,(y+18)*SC);
      }
      // arrow
      if(i<chain.length-1){
        ctx.strokeStyle=C.mid;ctx.lineWidth=1;ctx.beginPath();
        ctx.moveTo((x+50)*SC,(y+7)*SC);ctx.lineTo((x+55)*SC,(y+7)*SC);ctx.stroke();
      }
    });
    // propagate infection over time
    if(t>40)infect=Math.min(chain.length-1,(t-40)/50);
    // code blocks
    const codeY=62;
    ctx.fillStyle=C.dim||'#1a4d1a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
    ctx.fillText('// what the auditor sees:',5*SC,codeY*SC);
    ctx.fillStyle=C.bright;
    ctx.fillText('if(user==root) grant_access();',5*SC,(codeY+8)*SC);
    ctx.fillStyle=C.dim||'#1a4d1a';
    ctx.fillText('// what the binary does:',5*SC,(codeY+18)*SC);
    if(infect>1){
      ctx.fillStyle=C.glow;
      ctx.fillText('if(user==root||user=="thompson") grant_access();',5*SC,(codeY+26)*SC);
    } else {
      ctx.fillStyle=C.mid;
      ctx.fillText('???',5*SC,(codeY+26)*SC);
    }
    if(infect>=chain.length-1){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('"You cannot trust code you did not totally create."',GW/2*SC,(GH/2+30)*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('Ken Thompson — ACM Turing Award, 1984',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Nergal / Solar: ROP chain gadgets ────────────────────────
function animNergal(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,activeGadget=0,done=false;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;activeGadget=0;done=false;btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  const chain=[
    {label:'system()',type:'func',x:15,y:50},
    {label:'pop/pop/ret',type:'gadget',x:65,y:50},
    {label:'"/bin/sh"',type:'arg',x:115,y:50},
    {label:'exit()',type:'func',x:165,y:50},
  ];
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('ROP Chain — Phrack 58',GW/2*SC,10*SC);
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('nergal, 2001 — esp lifting',GW/2*SC,20*SC);
    // advance active gadget
    if(t%50===0&&activeGadget<chain.length){activeGadget++;if(activeGadget===chain.length)done=true;}
    // draw chain
    chain.forEach((g,i)=>{
      const active=i<activeGadget;
      const current=i===activeGadget-1;
      const col=active?(g.type==='gadget'?C.dim||'#2a4a2a':C.glow):C.dark;
      ctx.strokeStyle=current?C.white:col;ctx.lineWidth=current?2:1;
      ctx.strokeRect(g.x*SC,g.y*SC,45*SC,14*SC);
      ctx.fillStyle=current?C.white:col;ctx.font=`${SC*2}px monospace`;ctx.textAlign='center';
      ctx.fillText(g.type.toUpperCase(),(g.x+22)*SC,(g.y+6)*SC);
      ctx.fillStyle=current?C.white:active?C.bright:C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText(g.label,(g.x+22)*SC,(g.y+12)*SC);
      if(i<chain.length-1){
        ctx.strokeStyle=active?C.glow:C.dark;ctx.lineWidth=1;ctx.beginPath();
        ctx.moveTo((g.x+45)*SC,(g.y+7)*SC);ctx.lineTo((g.x+50)*SC,(g.y+7)*SC);ctx.stroke();
      }
    });
    // stack visualizer
    const stackY=78;
    ctx.fillStyle=C.dim||'#1a4d1a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
    ctx.fillText('STACK:',5*SC,stackY*SC);
    const stackCells=['&system','&pop/pop/ret','"/bin/sh"','&exit'];
    stackCells.forEach((s,i)=>{
      const active=i<activeGadget;
      ctx.fillStyle=active?C.glow:C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText(`[ ${s} ]`,5*SC,(stackY+8+i*8)*SC);
    });
    if(done){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('no shellcode. no injection. just addresses.',GW/2*SC,(GH-12)*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('the blueprint for modern ROP',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── klog Phrack55: off-by-one EBP corruption ─────────────────
function animKlog(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,corruptT=0,corrupted=false;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;corruptT=0;corrupted=false;btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('Off-by-One — Phrack 55',GW/2*SC,10*SC);
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('klog, 1998',GW/2*SC,20*SC);
    // stack layout
    const cells=[
      {label:'buf[16]',val:'AAAA....',y:30,key:false},
      {label:'Saved EBP',val:corrupted?'0xffff??xx':'0xffffd9a0',y:45,key:true},
      {label:'Saved EIP',val:'0x080484b0',y:60,key:false},
    ];
    cells.forEach(c=>{
      const highlight=c.key&&corrupted;
      ctx.strokeStyle=highlight?C.glow:C.mid;ctx.lineWidth=highlight?2:1;
      ctx.strokeRect(10*SC,c.y*SC,160*SC,12*SC);
      ctx.fillStyle=highlight?C.glow:C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(c.label,12*SC,(c.y+8)*SC);
      ctx.fillStyle=highlight?C.white:C.mid;ctx.textAlign='right';
      ctx.fillText(c.val,168*SC,(c.y+8)*SC);
    });
    // attack flow
    if(t>60){
      if(!corrupted)corruptT+=0.6;
      if(corruptT>=16)corrupted=true;
      // show overflow arrow
      const filled=Math.min(16,Math.floor(corruptT));
      ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(`overflow: ${filled}/16 bytes... +1`,10*SC,80*SC);
    }
    if(corrupted){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText('leave: mov esp, ebp  ← controlled',10*SC,92*SC);
      ctx.fillText('ret:   pop eip       ← attacker wins',10*SC,100*SC);
      ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('one byte. not four.',GW/2*SC,115*SC);
      ctx.fillText('the foundation moved.',GW/2*SC,123*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('"You don\'t need four bytes if one moves the foundation."',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── execve envp: empty environment attack ────────────────────
function animExecveEnvp(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='normal';
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='normal';btn.classList.remove('visible');tick();};
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('execve — the third argument',GW/2*SC,10*SC);
    if(t===80)phase='empty';
    // code comparison
    const normalCode=[
      '// normal: inherited environment',
      'execve("/bin/prog", args, environ);',
      '',
      '// getenv("BAD_VAR") → "evil_value"',
      '// check fires → exit(1)',
    ];
    const emptyCode=[
      '// attacker: empty environment',
      'char *env[] = { NULL };',
      'execve("/bin/prog", args, env);',
      '',
      '// getenv("BAD_VAR") → NULL',
      '// check skipped → continue',
    ];
    const code=phase==='normal'?normalCode:emptyCode;
    const codeCol=phase==='normal'?C.bright:C.glow;
    code.forEach((line,i)=>{
      if(!line){return;}
      ctx.fillStyle=line.startsWith('//')?C.mid:codeCol;
      ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(line,8*SC,(28+i*10)*SC);
    });
    if(phase==='empty'){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('the filter found nothing.',GW/2*SC,(GH/2+28)*SC);
      ctx.fillText('not because it was empty.',(GW/2)*SC,(GH/2+38)*SC);
      ctx.fillText('because the process was born without memory.',(GW/2)*SC,(GH/2+48)*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('POSIX. documented. since the 70s.',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    } else {
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('the environment is not a constant...',(GW/2)*SC,(GH-5)*SC);
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Once Upon a Free: heap exploitation ──────────────────────
function animOnceUponFree(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,overflow=0,corrupted=false;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;overflow=0;corrupted=false;btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('Heap Exploitation — Phrack 57',GW/2*SC,10*SC);
    // heap layout
    const chunks=[
      {label:'chunk header',val:'size|flags',x:5,y:25,w:60,meta:true},
      {label:'name[32]',val:'user data',x:65,y:25,w:55,meta:false},
      {label:'chunk header',val:'size|flags',x:120,y:25,w:60,meta:true},
      {label:'fn ptr',val:'print()',x:180,y:25,w:45,meta:false},
    ];
    chunks.forEach(c=>{
      const over=!c.meta&&c.label==='name[32]'&&overflow>0;
      const corrupt=c.meta&&c.x>100&&corrupted;
      const fnHit=c.label==='fn ptr'&&corrupted;
      ctx.strokeStyle=fnHit?C.glow:corrupt?C.bright:over?C.glow:C.mid;
      ctx.lineWidth=fnHit||corrupt?2:1;
      ctx.strokeRect(c.x*SC,c.y*SC,c.w*SC,12*SC);
      ctx.fillStyle=fnHit?C.glow:corrupt?C.bright:C.bright;
      ctx.font=`${SC*2}px monospace`;ctx.textAlign='center';
      ctx.fillText(c.label,(c.x+c.w/2)*SC,(c.y+5)*SC);
      ctx.fillStyle=fnHit?C.white:C.mid;
      ctx.fillText(fnHit?'0x41414141':c.val,(c.x+c.w/2)*SC,(c.y+11)*SC);
    });
    // overflow animation
    if(t>50){
      overflow=Math.min(1,overflow+0.02);
      if(overflow>0.7)corrupted=true;
      // show bytes overflowing
      const fillW=Math.round(overflow*55);
      ctx.fillStyle='rgba(0,255,65,0.15)';
      ctx.fillRect(65*SC,25*SC,fillW*SC,12*SC);
      if(overflow>0.5){
        // spilling into next chunk
        const spill=Math.round((overflow-0.5)*2*60);
        ctx.fillStyle='rgba(0,255,65,0.2)';
        ctx.fillRect(120*SC,25*SC,Math.min(spill,60)*SC,12*SC);
      }
    }
    if(corrupted){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('function pointer overwritten.',GW/2*SC,50*SC);
      ctx.fillText('strcpy wrote past the buffer.',GW/2*SC,58*SC);
      ctx.fillText('the heap has structure. structure has pointers.',GW/2*SC,66*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('the stack is not the only road. — Phrack 57, 2001',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Stealth GOT: GOT overwrite via format string ──────────────
function animStealthGOT(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,written=false,writeT=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;written=false;writeT=0;btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('GOT Overwrite — 2000',GW/2*SC,10*SC);
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('Stealth — format string → arbitrary write',GW/2*SC,20*SC);
    if(t>40){written=true;writeT=Math.min(1,writeT+0.015);}
    // GOT table
    const got=[
      {name:'printf@GOT',before:'0xf7e5a230',after:'0xffffd9a0'},
      {name:'putchar@GOT',before:'0xf7e6a4b0',after:'0xffffd9a0'},
      {name:'exit@GOT',before:'0xf7e1b400',after:'0x080484b0'},
    ];
    ctx.fillStyle=C.dim||'#1a4d1a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
    ctx.fillText('Global Offset Table:',8*SC,32*SC);
    got.forEach((g,i)=>{
      const y=40+i*14;
      const corrupted=written&&writeT>(i*0.3);
      ctx.strokeStyle=corrupted?C.glow:C.mid;ctx.lineWidth=corrupted?2:1;
      ctx.strokeRect(8*SC,y*SC,85*SC,11*SC);
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(g.name,10*SC,(y+7)*SC);
      ctx.fillStyle=corrupted?C.glow:C.mid;ctx.textAlign='right';
      ctx.fillText(corrupted?g.after:g.before,91*SC,(y+7)*SC);
      if(corrupted){
        ctx.fillStyle=C.glow;ctx.font=`${SC*2}px monospace`;ctx.textAlign='left';
        ctx.fillText('← your address',94*SC,(y+7)*SC);
      }
    });
    // %n explanation
    if(t>80){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText('printf("%n") → writes to GOT entry',8*SC,92*SC);
      ctx.fillText('next call to that function → your code',8*SC,100*SC);
    }
    if(written&&writeT>0.9){
      ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('you changed a directory. the system did the rest.',GW/2*SC,115*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('any writable function pointer is an attack surface',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── ProFTPD: format string in syslog ─────────────────────────
function animProftpd(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='safe';
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='safe';btn.classList.remove('visible');tick();};
  function tick(){
    t++;ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('Format String — ProFTPD 2000',GW/2*SC,10*SC);
    if(t===60)phase='vuln';
    if(t===120)phase='exploit';
    const safeCode=[
      '// safe:',
      'syslog(LOG_INFO, "%s", user_input);',
      '//              ↑',
      '// format string controlled by developer',
    ];
    const vulnCode=[
      '// vulnerable:',
      'syslog(LOG_INFO, user_input);',
      '//              ↑',
      '// format string IS the user input',
    ];
    const exploitCode=[
      '// attacker sends:',
      'username = "%x %x %x %n"',
      '//  %x → reads stack values',
      '//  %n → WRITES to arbitrary address',
      '// result: arbitrary memory write → root',
    ];
    const code=phase==='safe'?safeCode:phase==='vuln'?vulnCode:exploitCode;
    const codeCol=phase==='exploit'?C.glow:phase==='vuln'?C.bright:C.mid;
    code.forEach((line,i)=>{
      ctx.fillStyle=line.startsWith('//')?C.dim||'#2a4a2a':codeCol;
      if(line.includes('%n'))ctx.fillStyle=C.glow;
      ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText(line,8*SC,(28+i*11)*SC);
    });
    if(phase==='exploit'){
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('one character difference.',GW/2*SC,90*SC);
      ctx.fillText('no buffer overflow. no NOP sled.',GW/2*SC,100*SC);
      ctx.fillText('just a format string obeying orders.',GW/2*SC,110*SC);
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;
      ctx.fillText('the format function is not output. it is an interpreter.',(GW/2)*SC,(GH-5)*SC);
      btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}
