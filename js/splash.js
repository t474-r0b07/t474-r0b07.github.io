(function(){
  const splash=document.getElementById('splash'),img=document.getElementById('splash-img');let done=false;
  function chooseLanguage(){
    const panel=document.createElement('div');panel.className='language-panel';
    panel.innerHTML='<div class="language-title">LANGUAGE PROTOCOL</div><div class="language-options"><button data-lang="es">[ ES ] ESPAÑOL</button><button data-lang="en">[ EN ] ENGLISH</button></div>';
    splash.appendChild(panel);
    panel.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{setLanguage(btn.dataset.lang);panel.classList.add('selected');setTimeout(enterSite,220);});
  }
  function enterSite(){
    if(done)return;done=true;splash.classList.add('fade-out');
    setTimeout(()=>{splash.remove();const params=new URLSearchParams(window.location.search),postId=params.get('postId')||params.get('post');
      const post=postId&&typeof screenAntiHypeDetail==='function'?null:null;
      if(typeof main==='function')main();
    },800);
  }
  function scheduleFlicker(){const delay=800+Math.random()*1600;setTimeout(()=>{if(done)return;img.classList.add('flicker');setTimeout(()=>{img.classList.remove('flicker');scheduleFlicker();},160);},delay);}
  scheduleFlicker();setTimeout(chooseLanguage,2500);
})();