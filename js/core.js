const container = document.getElementById('out');
let busy = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function gap(sm){ const e=document.createElement('div');e.className=sm?'gap-sm':'gap';container.appendChild(e); }

async function cmd(text, speed=22){
  const row=document.createElement('div'); row.className='cmd-line';
  const p=document.createElement('span'); p.className='prompt'; p.textContent='$';
  const t=document.createElement('span'); t.className='cmd-text';
  row.appendChild(p); row.appendChild(t); container.appendChild(row);
  await sleep(30); row.classList.add('shown');
  const cur=document.createElement('span'); cur.className='cur'; t.appendChild(cur);
  for(let i=0;i<=text.length;i++){t.innerHTML=text.slice(0,i);t.appendChild(cur);await sleep(speed+Math.random()*10);}
  cur.remove(); return row;
}

async function out(html, soft=false, delay=40){
  await sleep(delay);
  const row=document.createElement('div'); row.className='out-line';
  row.innerHTML=`<span class="arrow">&gt;</span><span class="out-text${soft?' soft':''}">${html}</span>`;
  container.appendChild(row); await sleep(20); row.classList.add('shown');
  row.scrollIntoView({behavior:'smooth',block:'nearest'});
  return row;
}

async function showOpts(items, row=false){
  const wrap=document.createElement('div');
  wrap.className='opts'+(row?' row':''); container.appendChild(wrap);
  for(const item of items){
    await sleep(100);
    const btn=document.createElement('button'); btn.className='opt';
    btn.textContent=item.label;
    btn.onclick=()=>{if(!busy)item.action();};
    wrap.appendChild(btn);
  }
}

function addBack(fn){
  const btn=document.createElement('button'); btn.className='back'; btn.textContent='← back';
  btn.onclick=()=>{if(!busy)fn();}; container.appendChild(btn);
}

function clear(){ container.innerHTML=''; }

// ══════════════════════════════════════════════════════════════
// ANIMATIONS
// ══════════════════════════════════════════════════════════════

const C={black:'#000d00',dark:'#0a1f0a',mid:'#1a4d1a',bright:'#39d939',white:'#a8ff78',glow:'#00ff41'};

function makeCanvas(w,h){
  const wrap=document.createElement('div'); wrap.className='anim-wrap';
  const cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const btn=document.createElement('button'); btn.className='anim-replay'; btn.textContent='▶ REPLAY';
  wrap.appendChild(cv); wrap.appendChild(btn); container.appendChild(wrap);
  return {cv,btn,wrap};
}