
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
    // stars
    for(const s of stars){const b=Math.sin(t*0.05+s.blink);if(b>0.3)px(s.x,s.y,b>0.8?C.glow:C.mid,s.sz);}
    // trees
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
        // smoke
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
  let t=0,raf=null,phase='fight',endT=0,fadeAlpha=0;
  const BYTES=['01','00','00','04'];
  const BIG=[[...BYTES]]; // big-endian order
  const LIT=[[...BYTES].reverse()]; // little-endian order
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function drawByte(x,y,val,col){
    ctx.fillStyle=col;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';
    ctx.fillText(val,Math.round(x)*SC,Math.round(y+5)*SC);
  }
  function drawArrow(x1,y,x2,col){
    ctx.fillStyle=col;
    const dir=x2>x1?1:-1;
    for(let i=0;i<Math.abs(x2-x1);i+=2)px(x1+i*dir,y,col);
    px(x2,y,col); px(x2-dir,y-1,col); px(x2-dir,y+1,col);
  }
  function reset(){t=0;phase='fight';endT=0;fadeAlpha=0;btn.classList.remove('visible');}
  btn.onclick=()=>{cancelAnimationFrame(raf);reset();tick();};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    const cy=GH/2;
    // labels
    ctx.fillStyle=C.dim||'#1a4d1a';ctx.font=`${SC*4}px monospace`;ctx.textAlign='left';
    ctx.fillStyle=C.bright;
    ctx.fillText('BIG-ENDIAN',4*SC,10*SC);
    ctx.fillStyle=C.mid;
    ctx.fillText('LITTLE-ENDIAN',4*SC,(cy+14)*SC);

    // value being "stored"
    const val32='0x00000401';
    ctx.fillStyle=C.glow;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';
    ctx.fillText(val32,GW/2*SC,8*SC);

    // animate bytes marching
    const bytesBig =['00','00','04','01'];
    const bytesLit =['01','04','00','00'];
    const spacing=14;
    const startX=GW/2-spacing*1.5;

    for(let i=0;i<4;i++){
      const offset=Math.sin(t*0.05+i)*1.5;
      // big endian row — bytes flow left to right in natural order
      const bx=startX+i*spacing;
      const pulse=Math.sin(t*0.08+i*0.8)>0.5;
      drawByte(bx,cy-18+offset,bytesBig[i],pulse?C.white:C.bright);
      // box
      ctx.strokeStyle=C.mid;ctx.lineWidth=1;
      ctx.strokeRect((bx-5)*SC,(cy-24)*SC,10*SC,10*SC);

      // little endian row — reversed
      const lx=startX+i*spacing;
      const pulse2=Math.sin(t*0.08+(3-i)*0.8)>0.5;
      drawByte(lx,cy+6+offset,bytesLit[i],pulse2?C.glow:C.mid);
      ctx.strokeStyle=C.dark||'#0a1f0a';ctx.lineWidth=1;
      ctx.strokeRect((lx-5)*SC,(cy)*SC,10*SC,10*SC);
    }

    // collision sparks in middle
    const sparkX=GW/2+Math.sin(t*0.3)*3;
    const sparkY=cy-6;
    if(t%3===0){
      for(let i=0;i<3;i++){
        const sx=sparkX+(Math.random()-.5)*8;
        const sy=sparkY+(Math.random()-.5)*4;
        px(sx,sy,Math.random()>0.5?C.glow:C.white);
      }
    }
    ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('← conflict →',GW/2*SC,(cy-8)*SC);

    // label at bottom
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
  const valBig=['00','00','00','01']; // big: most significant first
  const valLit=['01','00','00','00']; // little: least significant first
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;tick();};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    const cols=4,cellW=22,cellH=16;
    const startX=(GW-(cols*cellW+cols*4))/2;
    const rowBig=GH/2-18,rowLit=GH/2+8;
    const progress=Math.min(1,t/80); // 0→1 over 80 frames

    ctx.fillStyle=C.glow;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';
    ctx.fillText('0x00000001',GW/2*SC,9*SC);

    ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
    ctx.fillText('big-endian    (natural order):',startX*SC,rowBig*SC-6*SC);
    ctx.fillStyle=C.mid;
    ctx.fillText('little-endian (memory order): ',startX*SC,rowLit*SC-6*SC);

    for(let i=0;i<4;i++){
      const x=startX+i*(cellW+4);
      // address
      ctx.fillStyle=C.dim||'#2a4a2a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText(addresses[i],(x+cellW/2)*SC,(rowBig-8)*SC);

      // big endian cell
      ctx.strokeStyle=C.mid;ctx.lineWidth=1;
      ctx.strokeRect(x*SC,rowBig*SC,cellW*SC,cellH*SC);
      const bigAlpha=Math.max(0,progress*2-i*0.4);
      ctx.globalAlpha=Math.min(1,bigAlpha);
      ctx.fillStyle=C.bright;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
      ctx.fillText(valBig[i],(x+cellW/2)*SC,(rowBig+cellH*0.7)*SC);
      ctx.globalAlpha=1;

      // little endian cell — bytes appear in reverse
      ctx.strokeStyle=C.glow;ctx.lineWidth=1;
      ctx.strokeRect(x*SC,rowLit*SC,cellW*SC,cellH*SC);
      const litAlpha=Math.max(0,progress*2-(3-i)*0.4);
      ctx.globalAlpha=Math.min(1,litAlpha);
      ctx.fillStyle=i===0?C.glow:C.mid;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
      ctx.fillText(valLit[i],(x+cellW/2)*SC,(rowLit+cellH*0.7)*SC);
      ctx.globalAlpha=1;
    }

    // arrow showing reversal
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

    ctx.fillStyle=C.dim||'#1a4d1a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
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
  const targetHex='DEADBEEF';
  const rows=6,cols=8;
  const cellW=10,cellH=10;
  const startX=(GW-(cols*cellW+cols*2))/2;
  const startY=12;
  // random hex grid
  let grid=Array.from({length:rows},()=>Array.from({length:cols},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0').toUpperCase()));
  // place DEADBEEF in row 3, cols 0-3 (each byte = 2 hex chars, we show as single cells)
  const deadRow=3,deadCol=2;
  const deadBytes=['DE','AD','BE','EF'];
  let revealT=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;revealT=0;grid=Array.from({length:rows},()=>Array.from({length:cols},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0').toUpperCase()));tick();btn.classList.remove('visible');};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);

    // title
    ctx.fillStyle=C.glow;ctx.font=`${SC*5}px monospace`;ctx.textAlign='center';
    const glitch=t>60&&t%40<3;
    ctx.fillText(glitch?'0xDE??BEEF':'0xDEADBEEF',GW/2*SC,9*SC);

    // randomize non-dead cells slowly
    if(t%8===0){
      for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
        const isDead=r===deadRow&&c>=deadCol&&c<deadCol+4;
        if(!isDead)grid[r][c]=Math.floor(Math.random()*256).toString(16).padStart(2,'0').toUpperCase();
      }
    }

    // reveal DEADBEEF after t=60
    if(t>60){
      revealT++;
      const byteIdx=Math.floor(revealT/20);
      for(let i=0;i<=Math.min(byteIdx,3);i++){
        grid[deadRow][deadCol+i]=deadBytes[i];
      }
    }

    // draw grid
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const x=startX+c*(cellW+2);
        const y=startY+r*(cellH+2);
        const isDead=r===deadRow&&c>=deadCol&&c<deadCol+4&&t>60;
        const isRevealed=isDead&&grid[r][c]===deadBytes[c-deadCol];
        ctx.fillStyle=isRevealed?C.glow:isDead?C.bright:C.mid;
        ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
        if(isRevealed){
          // glow box
          ctx.fillStyle='rgba(0,255,65,0.1)';
          ctx.fillRect(x*SC,(y-1)*SC,cellW*SC,(cellH+1)*SC);
          ctx.fillStyle=C.glow;
        } else {
          ctx.fillStyle=C.mid;
        }
        ctx.fillText(grid[r][c],(x+cellW/2)*SC,(y+cellH*0.75)*SC);
      }
      // address
      ctx.fillStyle=C.dark||'#0a1f0a';ctx.font=`${SC*3}px monospace`;ctx.textAlign='right';
      ctx.fillText(`0x${(0x7fff0+r*8).toString(16).toUpperCase()}`,(startX-3)*SC,(startY+r*(cellH+2)+cellH*0.75)*SC);
    }

    // label after full reveal
    if(t>140){
      const alpha=Math.min(1,(t-140)/30);
      ctx.globalAlpha=alpha;
      ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText('not random. intentional. someone put it there.',(GW/2)*SC,(GH-5)*SC);
      ctx.globalAlpha=1;
    }

    if(t>220)btn.classList.add('visible');
    else raf=requestAnimationFrame(tick);
  }
  tick();
}


// ── Aleph One: stack smashing — buffer overflow visualization ─
function animAlephOne(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='fill',overflowT=0,fadeAlpha=0;
  const BUFFER_SIZE=8;
  const cells=Array(BUFFER_SIZE+4).fill('__');
  const labels=['buf[0]','buf[1]','buf[2]','buf[3]','buf[4]','buf[5]','buf[6]','buf[7]','saved_ebp','ret_addr','[above]','[above]'];
  const INPUT='AAAAAAAA\x41\x41\x41\x41';
  let fillIdx=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='fill';overflowT=0;fadeAlpha=0;fillIdx=0;for(let i=0;i<cells.length;i++)cells[i]='__';btn.classList.remove('visible');tick();};
  function px(x,y,col,w=1,h=1){ctx.fillStyle=col;ctx.fillRect(Math.round(x)*SC,Math.round(y)*SC,SC*w,SC*h);}
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);
    const cellW=18,cellH=14,cols=BUFFER_SIZE+4;
    const startX=(GW-(cols*(cellW+2)))/2;
    const rowY=GH/2-4;

    // title
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
    ctx.fillText('stack frame',GW/2*SC,9*SC);

    // fill buffer every 8 frames
    if(phase==='fill'&&t%8===0&&fillIdx<INPUT.length){
      cells[fillIdx]='41';
      fillIdx++;
      if(fillIdx>=BUFFER_SIZE)phase='overflow';
    }
    if(phase==='overflow'){
      overflowT++;
      if(overflowT%10===0&&fillIdx<cells.length){
        cells[fillIdx]='41';
        fillIdx++;
      }
      if(fillIdx>=cells.length)phase='done';
    }

    // draw cells
    for(let i=0;i<cells.length;i++){
      const x=startX+i*(cellW+2);
      const isBuffer=i<BUFFER_SIZE;
      const isOverflow=i>=BUFFER_SIZE&&cells[i]!='__';
      const col=isOverflow?C.glow:isBuffer&&cells[i]!='__'?C.bright:C.mid;
      ctx.strokeStyle=isOverflow?C.glow:C.mid;ctx.lineWidth=1;
      ctx.strokeRect(x*SC,rowY*SC,cellW*SC,cellH*SC);
      if(isOverflow){
        ctx.fillStyle='rgba(0,255,65,0.15)';
        ctx.fillRect(x*SC,rowY*SC,cellW*SC,cellH*SC);
      }
      ctx.fillStyle=col;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
      ctx.fillText(cells[i],(x+cellW/2)*SC,(rowY+cellH*0.75)*SC);
      // label below
      ctx.fillStyle=i>=BUFFER_SIZE?C.glow:C.mid;ctx.font=`${SC*2}px monospace`;
      ctx.fillText(labels[i],(x+cellW/2)*SC,(rowY+cellH+6)*SC);
    }

    // arrow input
    ctx.fillStyle=C.bright;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
    ctx.fillText('input →',(startX-22)*SC,(rowY+cellH*0.7)*SC);

    // overflow warning
    if(phase==='overflow'||phase==='done'){
      const alpha=Math.min(1,overflowT/20);
      ctx.globalAlpha=alpha;
      ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='center';
      ctx.fillText('OVERFLOW — ret_addr corrupted',GW/2*SC,16*SC);
      ctx.globalAlpha=1;
    }

    // bottom label
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('Aleph One — Phrack #49 — 1996',(GW/2)*SC,(GH-5)*SC);

    if(phase==='done'){
      fadeAlpha=Math.min(1,fadeAlpha+0.01);
      if(fadeAlpha>0.5)btn.classList.add('visible');
      if(fadeAlpha<1)raf=requestAnimationFrame(tick);
      return;
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Morris Worm: self-replication across nodes ────────────────
function animMorrisWorm(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null;
  // nodes: {x,y,infected,infectedT,connections:[idx]}
  const nodes=[
    {x:GW/2,   y:GH/2,   infected:true, infectedT:0, connections:[1,2,3]},
    {x:GW/2-40,y:GH/2-25,infected:false,infectedT:0, connections:[0,4,5]},
    {x:GW/2+40,y:GH/2-25,infected:false,infectedT:0, connections:[0,5,6]},
    {x:GW/2,   y:GH/2+30,infected:false,infectedT:0, connections:[0,4,6]},
    {x:GW/2-60,y:GH/2+10,infected:false,infectedT:0, connections:[1,3]},
    {x:GW/2+10,y:GH/2-40,infected:false,infectedT:0, connections:[1,2]},
    {x:GW/2+60,y:GH/2+10,infected:false,infectedT:0, connections:[2,3]},
  ];
  let packets=[];
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;nodes.forEach((n,i)=>{n.infected=i===0;n.infectedT=0;});packets=[];btn.classList.remove('visible');tick();};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);

    // spread every 60 frames
    if(t%60===0){
      nodes.forEach(n=>{
        if(n.infected){
          n.connections.forEach(ci=>{
            if(!nodes[ci].infected){
              packets.push({sx:n.x,sy:n.y,tx:nodes[ci].x,ty:nodes[ci].y,progress:0,target:ci});
            }
          });
        }
      });
    }

    // move packets
    packets.forEach(p=>{
      p.progress=Math.min(1,p.progress+0.02);
      if(p.progress>=1)nodes[p.target].infected=true;
    });
    packets=packets.filter(p=>p.progress<1);

    // draw connections
    nodes.forEach(n=>{
      n.connections.forEach(ci=>{
        const n2=nodes[ci];
        ctx.strokeStyle=C.dark||'#0a1f0a';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(n.x*SC,n.y*SC);ctx.lineTo(n2.x*SC,n2.y*SC);ctx.stroke();
      });
    });

    // draw packets
    packets.forEach(p=>{
      const x=p.sx+(p.tx-p.sx)*p.progress;
      const y=p.sy+(p.ty-p.sy)*p.progress;
      ctx.fillStyle=C.glow;
      ctx.beginPath();ctx.arc(x*SC,y*SC,SC*2,0,Math.PI*2);ctx.fill();
    });

    // draw nodes
    nodes.forEach((n,i)=>{
      if(n.infected)n.infectedT++;
      const pulse=n.infected?Math.sin(t*0.1+i)*1.5:0;
      const r=4+pulse;
      ctx.fillStyle=n.infected?C.glow:C.mid;
      ctx.beginPath();ctx.arc(n.x*SC,n.y*SC,r*SC,0,Math.PI*2);ctx.fill();
      if(n.infected){
        ctx.strokeStyle=`rgba(0,255,65,${0.2+Math.sin(t*0.1+i)*0.1})`;
        ctx.lineWidth=SC;
        ctx.beginPath();ctx.arc(n.x*SC,n.y*SC,(r+4)*SC,0,Math.PI*2);ctx.stroke();
      }
    });

    // infected count
    const infectedCount=nodes.filter(n=>n.infected).length;
    ctx.fillStyle=C.glow;ctx.font=`${SC*4}px monospace`;ctx.textAlign='left';
    ctx.fillText(`infected: ${infectedCount}/${nodes.length}`,4*SC,10*SC);

    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('Morris Worm — 02.11.1988 — 6000 machines in 24h',(GW/2)*SC,(GH-5)*SC);

    if(infectedCount===nodes.length&&t>120)btn.classList.add('visible');
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Shellshock: env variable injecting code ───────────────────
function animShellshock(cv, btn){
  const W=560,H=200,SC=2,GW=W/SC,GH=H/SC;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingEnabled=false;
  let t=0,raf=null,phase='type',charIdx=0,executeT=0,fadeAlpha=0;
  const PAYLOAD="env x='() { :;}; echo PWNED'";
  const RESULT='PWNED';
  let resultAlpha=0,shellAlpha=0;
  btn.onclick=()=>{cancelAnimationFrame(raf);t=0;phase='type';charIdx=0;executeT=0;fadeAlpha=0;resultAlpha=0;shellAlpha=0;btn.classList.remove('visible');tick();};
  function tick(){
    t++;
    ctx.fillStyle=C.black;ctx.fillRect(0,0,W,H);

    // prompt line
    ctx.fillStyle=C.mid;ctx.font=`${SC*4}px monospace`;ctx.textAlign='left';
    ctx.fillText('$',(4)*SC,(GH/2-14)*SC);

    // type payload
    if(phase==='type'&&t%3===0&&charIdx<PAYLOAD.length){
      charIdx++;
      if(charIdx>=PAYLOAD.length)phase='execute';
    }

    const displayed=PAYLOAD.slice(0,charIdx);
    // color code the payload
    const envPart='env x=';
    const funcPart="'() { :;}'";
    const injectPart='; echo PWNED';

    ctx.fillStyle=C.bright;ctx.font=`${SC*4}px monospace`;ctx.textAlign='left';
    let cx=12;
    // draw char by char with color coding
    const colorMap=[];
    for(let i=0;i<PAYLOAD.length;i++){
      if(i<6)colorMap.push(C.mid);           // env x=
      else if(i<16)colorMap.push(C.bright);  // () { :;}
      else colorMap.push(C.glow);            // ; echo PWNED
    }
    for(let i=0;i<displayed.length;i++){
      ctx.fillStyle=colorMap[i];
      ctx.fillText(PAYLOAD[i],(4+cx)*SC,(GH/2-14)*SC);
      cx+=5;
    }
    // cursor
    if(phase==='type'){
      ctx.fillStyle=Math.floor(t/15)%2===0?C.glow:'transparent';
      ctx.fillRect((4+cx)*SC,(GH/2-18)*SC,4*SC,8*SC);
    }

    // execute phase
    if(phase==='execute'||phase==='done'){
      executeT++;
      // bash processes it
      shellAlpha=Math.min(1,executeT/20);
      ctx.globalAlpha=shellAlpha;
      ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='left';
      ctx.fillText('bash -c "test"',(4)*SC,(GH/2+2)*SC);
      ctx.globalAlpha=1;

      // function definition smuggled in env var
      if(executeT>20){
        const a=Math.min(1,(executeT-20)/20);
        ctx.globalAlpha=a;
        ctx.fillStyle=C.glow;ctx.font=`${SC*3}px monospace`;
        ctx.fillText('→ bash parses env var',(4)*SC,(GH/2+12)*SC);
        ctx.fillText('→ executes trailing code',(4)*SC,(GH/2+20)*SC);
        ctx.globalAlpha=1;
      }

      // PWNED
      if(executeT>50){
        resultAlpha=Math.min(1,(executeT-50)/20);
        ctx.globalAlpha=resultAlpha;
        ctx.fillStyle=C.glow;ctx.font=`${SC*7}px monospace`;ctx.textAlign='center';
        const shake=executeT<70?(Math.random()-.5)*3:0;
        ctx.fillText(RESULT,(GW/2+shake)*SC,(GH/2+36)*SC);
        ctx.globalAlpha=1;
        if(executeT>70)phase='done';
      }
    }

    // CVE label
    ctx.fillStyle=C.mid;ctx.font=`${SC*3}px monospace`;ctx.textAlign='center';
    ctx.fillText('CVE-2014-6271 — 25 years in bash before discovery',(GW/2)*SC,(GH-5)*SC);

    if(phase==='done'){
      fadeAlpha=Math.min(1,fadeAlpha+0.008);
      if(fadeAlpha>0.5)btn.classList.add('visible');
    }
    raf=requestAnimationFrame(tick);
  }
  tick();
}

// ══════════════════════════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════════════════════════

async function main(){
  busy=true;clear();
  await sleep(400);
  await cmd('whoami',30);
  await out('<span class="hi">t474-r0b07</span>');
  gap(true);
  await cmd('cat /etc/identity',20);
  await out('red teamer in progress &nbsp;·&nbsp; systems builder');
  await out('<span class="lo">Bolivia 🇧🇴</span>',true,20);
  gap(true);
  await cmd('ls -la',20);
  await out('<span class="lo">projects &nbsp; progress &nbsp; lore &nbsp; contact</span>',true,30);
  gap();
  busy=false;
  await showOpts([
    {label:'projects',action:screenProjects},
    {label:'progress',action:screenProgress},
    {label:'lore',    action:screenLore},
    {label:'contact', action:screenContact},
  ]);
}

async function screenProjects(){
  busy=true;clear();
  await cmd('ls -la projects/',20);
  await out('<span class="lo">4 repositories found</span>',true);
  gap();
  busy=false;
  await showOpts([
    {label:'SCCP-DTEX',   action:()=>screenProjectDetail({
      name:'SCCP-DTEX',tag:'LIVE',
      desc:'Tactical law enforcement command center — WebApp',
      stack:'Flutter Web · Supabase · GetX · Clean Architecture',
      detail:'GPS spoofing detection · role-based access · full audit trail · real-time &lt;1s',
      highlights:[
        'Built with offensive thinking: every feature is a countermeasure.',
        'VPN detection · root detection · full GPS anomaly logging.',
        'Role-based access: operators, supervisors, commanders.',
      ],
      url:'https://github.com/t474-r0b07/SCCP-DTEX',
      extended:[
        'Sistema desplegado para unidades tácticas reales en Bolivia.',
        'Arquitectura: Clean Architecture + GetX state management.',
        'Supabase Realtime para actualizaciones GPS con latencia < 1 segundo.',
        'Cada acción del operador queda registrada en audit trail inmutable.',
        'Detecta VPN activa, GPS falso y dispositivos rooteados en tiempo real.',
        '// construido pensando en cómo lo atacaría alguien.',
      ]
    })},
    {label:'SCCP-Mobile', action:()=>screenProjectDetail({
      name:'SCCP-Mobile',tag:'LIVE',
      desc:'Android field app for tactical units',
      stack:'Flutter · BLoC · Hive · Play Integrity API',
      detail:'Offline-first · root detection · VPN fingerprinting · GPS anti-spoofing',
      highlights:[
        'The weakest point of a command platform is the device in the field.',
        'Hive for offline persistence. Syncs when signal returns.',
        'Play Integrity for device attestation at login.',
      ],
      url:'https://github.com/t474-r0b07/SCCP-Mobile',
      extended:[
        'App de campo: el oficial la usa mientras patrulla, sin depender del servidor.',
        'Hive DB local — persiste misiones, incidentes y coordenadas offline.',
        'Al recuperar señal, sincroniza automáticamente con el Command Center.',
        'Play Integrity API: verifica que el dispositivo no está comprometido.',
        'Background service: reporta GPS cada N segundos aunque la app esté minimizada.',
        '// si el dispositivo está rooteado, el sistema lo sabe antes que el oficial.',
      ]
    })},
    {label:'ctf-writeups',action:()=>screenProjectDetail({
      name:'ctf-writeups',tag:'ACTIVE',
      desc:'Not the flag — the thinking.',
      stack:'picoCTF · TryHackMe · OverTheWire · HackTheBox',
      detail:'Forensics · Steganography · Buffer Overflow · Cryptography',
      highlights:[
        'The [ATTEMPTS] section is the core. Not the solution.',
        'OverTheWire Bandit: 34/34. Leviathan: 8/8. Narnia: active.',
        'Lore folder: why the vulnerabilities exist in the first place.',
      ],
      url:'https://github.com/t474-r0b07/ctf-writeups',
      extended:[
        '// narnia0 — primer buffer overflow.',
        'El programa lee input sin validar longitud. La pila se desborda.',
        'Variable adyacente en memoria: val=0x41414141. Shell obtenida.',
        '---',
        'Cada writeup tiene una sección [ATTEMPTS] — los intentos fallidos.',
        'El flag es incidental. El razonamiento es el contenido.',
        'La carpeta /lore documenta por qué las vulnerabilidades existen.',
        '// el que quiere entender, que entienda.',
      ]
    })},
    {label:'t474',        action:()=>screenProjectDetail({
      name:'t474',tag:'IN DEV',
      desc:'Narrative hacking game — terminal-based, lore-driven',
      stack:'// classified',
      detail:'The interface IS the world. Not all puzzles look like puzzles.',
      highlights:[
        'A game where the terminal is not the UI. It is the world.',
        'Lore-driven: every command has history behind it.',
        '// more information is itself a vulnerability',
      ],
      url:'https://github.com/t474-r0b07/t474',
      extended:[
        '// access denied.',
        '// clearance level insufficient.',
        '// but you already knew that.',
        '---',
        'Lo que podemos decir: es un juego que se juega sin saber que estás jugando.',
        'La narrativa y los puzzles coexisten en la misma interfaz.',
        '// más información es en sí misma una vulnerabilidad.',
      ]
    })},
  ]);
  gap();
  addBack(main);
}

async function screenProjectDetail(p){
  busy=true;clear();
  await cmd(`cat ${p.name}/README.md`,20);
  gap(true);
  await out(`<span class="hi">${p.name}</span> &nbsp;<span class="lo">[ ${p.tag} ]</span>`);
  await out(p.desc,false,60);
  gap(true);
  await cmd('cat stack.txt',18);
  await out(`<span class="lo">${p.stack}</span>`,true,40);
  gap(true);
  await cmd('cat features.txt',18);
  await out(p.detail,false,40);
  gap(true);
  await cmd('cat notes.txt',18);
  for(const h of p.highlights){
    await out(h,true,30);
  }
  gap();
  busy=false;

  await showOpts([
    {
      label:'ver más',
      action: async ()=>{
        busy=true;
        gap(true);
        await cmd('cat details.txt',18);
        for(const line of (p.extended||['// no additional data found.'])){
          await out(line,true,25);
        }
        gap();
        busy=false;
        await showOpts([
          {label:'github →',action:()=>open(p.url,'_blank')},
        ]);
        gap(true);
        addBack(screenProjects);
      }
    },
    {label:'github →', action:()=>open(p.url,'_blank')},
  ]);

  gap(true);
  addBack(screenProjects);
}


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

async function screenContact(){
  busy=true;clear();
  await cmd('cat contacts.txt',20);
  gap(true);
  await out('<span class="hi">t474-r0b07</span>');
  await out('red teamer in progress · Bolivia 🇧🇴',true,40);
  gap(true);
  await cmd('echo $CHANNELS',18);
  gap(true);
  busy=false;
  await showOpts([
    {label:'github',   action:()=>open('https://github.com/t474-r0b07','_blank')},
    {label:'youtube',  action:()=>open('https://youtube.com/@kaderd.garnica','_blank')},
    {label:'email',    action:()=>open('mailto:dogar.kad@gmail.com')},
    {label:'calendly', action:()=>open('https://calendly.com/t474_r0b07','_blank')},
    {label:'quien soy',action:screenAbout},
    {label:'ost · t474',action:screenOST},
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
    'Lic. en Comunicación Social.',
    'Publicista. Diseñador gráfico. Filmmaker. Músico.',
    'Desarrollador de sistemas. Red teamer en formación.',
    '',
    'Todo eso no es una contradicción.',
    'Es el mismo instinto aplicado a distintos medios.',
    '// entender cómo funciona algo. luego romperlo. luego construir algo mejor.',
    '',
    'Bolivia — pensando sin fronteras.',
  ];

  for(const l of lines){
    await sleep(55);
    if(l===''){gap(true);continue;}
    const soft = l.startsWith('//') || l.startsWith('Lic') || l.startsWith('Pub') || l.startsWith('Bol');
    await out(l, soft, 0);
  }

  gap(true);
  await cmd('echo $PHILOSOPHY',18);
  await out('not a musician.',true,40);
  await out('not a filmmaker.',true,30);
  await out('not a developer.',true,30);
  gap(true);
  await out('all of the above. none of the above.',false,40);
  gap(true);
  await out('the audio is a side effect.',true,40);
  await out('of something larger.',true,30);
  gap();
  busy=false;
  addBack(screenContact);
}

async function screenOST(){
  busy=true;clear();
  await cmd('ls -la /t474/ost/',20);
  gap(true);
  await out('<span class="hi">t474 · original soundtrack</span>');
  await out('// the sound of something being constructed in the dark.',true,60);
  gap(true);

  const tracks = [
    {name:'FELO DE SE',      url:'https://soundcloud.com/kader-d-garnica/felo-de-se'},
    {name:'cellophane',      url:'https://soundcloud.com/kader-d-garnica/cellophane'},
    {name:'D3574cam3n70',    url:'https://soundcloud.com/kader-d-garnica/d3574cam3n70'},
  ];

  await cmd('cat tracklist.txt',18);
  for(let i=0;i<tracks.length;i++){
    await sleep(80);
    await out(`<span class="lo">[${String(i+1).padStart(2,'0')}]</span> ${tracks[i].name}`,false,0);
  }

  gap(true);
  await cmd('play --embed',18);
  await sleep(200);

  // SoundCloud embed — full profile widget
  const embedWrap = document.createElement('div');
  embedWrap.style.cssText='width:100%;max-width:560px;margin:0.6rem 0;border:1px solid #2a4a2a;overflow:hidden;';
  const iframe = document.createElement('iframe');
  iframe.width='100%';
  iframe.height='300';
  iframe.scrolling='no';
  iframe.frameBorder='no';
  iframe.allow='autoplay';
  iframe.src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1694584550&color=%2300ff41&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true';
  embedWrap.appendChild(iframe);
  container.appendChild(embedWrap);

  gap(true);
  await out('// or dead. hard to tell.',true,60);
  gap();
  busy=false;
  addBack(screenContact);
}

