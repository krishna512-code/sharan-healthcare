const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const progress=$('.progress'), glow=$('.cursor-glow'), loader=$('#loader');
window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('done'),450));
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/Math.max(h,1)*100)+'%';},{passive:true});
window.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}; const stage=$('#heroStage'); if(stage && innerWidth>1000){const x=(e.clientX/innerWidth-.5)*12,y=(e.clientY/innerHeight-.5)*10;stage.style.transform=`translate3d(${x}px,${y}px,0)`}},{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});$$('.reveal').forEach(el=>observer.observe(el));
$$('.magnetic').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`}));
$$('.magnetic').forEach(el=>el.addEventListener('pointerleave',()=>el.style.transform=''));
const menu=$('#menu'),navLinks=$('#navLinks');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));navLinks.style.display=open?'none':'flex';if(!open){navLinks.style.position='absolute';navLinks.style.top='65px';navLinks.style.left='10px';navLinks.style.right='10px';navLinks.style.flexDirection='column';navLinks.style.background='rgba(255,255,255,.96)';navLinks.style.padding='20px';navLinks.style.borderRadius='18px';navLinks.style.boxShadow='0 20px 50px rgba(0,0,0,.12)'}});$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<=1000){navLinks.style.display='none';menu.setAttribute('aria-expanded','false')}}));
const modal=$('#serviceModal'),modalTitle=$('#modalTitle'),modalText=$('#modalText');
const serviceCopy={
'Hernia Surgery':'The clinic lists hernia operations using open and laparoscopic approaches. A surgeon determines the appropriate technique after clinical assessment.',
'Gallbladder':'The clinic lists gallbladder surgery including laparoscopic cholecystectomy. Diagnosis and treatment depend on the individual case.',
'Appendix':'The clinic lists appendix operations including laparoscopic appendectomy. Urgent assessment may be needed for acute symptoms.',
'Trauma':'The clinic lists minor and major trauma among its surgical services. Urgent injuries should be assessed promptly.',
'Varicose Veins / PVD':'The clinic lists varicose veins and peripheral vascular disease (PVD) for surgical evaluation.',
'Hemorrhoids / Anal Fissure':'The clinic lists hemorrhoids/piles and anal fissure among its surgical care areas.',
'Hydrocele':'Hydrocele is listed among the clinic’s surgical services and can be evaluated by the surgeon.',
'Kidney Stones':'Kidney stones are listed for surgical consultation. The right treatment depends on stone characteristics and clinical assessment.',
'Diabetic Foot':'Diabetic foot problems are listed for surgical assessment. Urgent medical attention can be important when there is infection or tissue injury.',
'Lipoma / Cyst':'The clinic lists lipoma/cyst procedures among its surgical services.',
'Phimosis / Circumcision':'Phimosis and circumcision are listed among the clinic’s surgical services.',
'Prostate Conditions':'Prostate conditions are listed for clinical evaluation. Treatment depends on diagnosis and individual circumstances.',
'Abdominal Pain':'Abdominal pain is listed for surgical evaluation. New, severe or worsening pain can require prompt medical assessment.',
'Ingrowing Toe Nail':'Ingrowing toenail is listed among the clinic’s surgical care areas.'};
$$('.service-card').forEach(card=>card.addEventListener('click',()=>{const key=card.dataset.service;modalTitle.textContent=key;modalText.textContent=serviceCopy[key]||'Treatment depends on the individual condition and clinical assessment.';modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
$$('[data-close]').forEach(el=>el.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}});
const form=$('#bookingForm'),toast=$('#toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),4500)}
form?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const phone=String(data.get('phone')||'').replace(/\D/g,'');if(phone.length!==10){showToast('Please enter a valid 10-digit mobile number.');return}
const name=String(data.get('name')||'').trim();const date=data.get('date');const time=data.get('time');
const btn=form.querySelector('button[type=submit]');if(btn){btn.disabled=true;btn.dataset.orig=btn.innerHTML;btn.innerHTML='Sending request…'}
try{
const ref='SH-'+Date.now().toString(36).toUpperCase().slice(-6);
const summary=`Thank you, ${name}. Your appointment request has been recorded.\n\nRequest reference: ${ref}\nDate: ${date}\nTime: ${time}\n\nThe clinic will call you on ${phone} to confirm the exact slot. Requests are confirmed only after the clinic responds.`;
showToast('Request sent. The clinic will call you to confirm.');
const note=form.querySelector('.form-note');if(note){note.textContent='Request reference '+ref+' — the clinic will confirm your slot by phone.';note.style.color='#08783b';note.style.fontWeight='700'}
form.reset();
}catch(err){showToast('Something went wrong. Please try again or visit the clinic.');}finally{if(btn){btn.disabled=false;btn.innerHTML=btn.dataset.orig||'Request appointment ↗'}}
setTimeout(()=>{const l=$('#loader');},0);});
const dateInput=form?.querySelector('input[type=date]');if(dateInput){dateInput.min=new Date().toISOString().split('T')[0]}
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.scrollBehavior='auto'}

/* ---- Social updates carousel ---- */
(function(){
  const track=$('#socialTrack'),dots=$('#carDots'),prev=$('#carPrev'),next=$('#carNext');
  if(!track||!dots||!prev||!next)return;
  const posts=[...track.children];
  let current=0,timer=null;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  posts.forEach((_,i)=>{
    const b=document.createElement('button');
    b.type='button';b.setAttribute('aria-label','Go to update '+(i+1));
    b.addEventListener('click',()=>{go(i);restart()});
    dots.appendChild(b);
  });
  const dotEls=[...dots.children];
  function perView(){return Math.max(1,Math.round(track.clientWidth/posts[0].getBoundingClientRect().width)||1)}
  function go(i){current=(i+posts.length)%posts.length;const w=posts[0].getBoundingClientRect().width+14;track.scrollTo({left:Math.floor(current/perView())*w*perView(),behavior:reduced?'auto':'smooth'})}
  function update(){const vp=track.clientWidth;const w=posts[0].getBoundingClientRect().width+14;current=Math.round(track.scrollLeft/w);const max=Math.max(0,posts.length-perView());dotEls.forEach((d,di)=>d.classList.toggle('active',di===current));prev.classList.toggle('is-hidden',current<=0&&!track.scrollLeft);prev.style.opacity=track.scrollLeft<=5?.35:1;next.style.opacity=track.scrollLeft>=track.scrollWidth-vp-5?.35:1}
  prev.addEventListener('click',()=>{track.scrollBy({left:-track.clientWidth,behavior:reduced?'auto':'smooth'});restart()});
  next.addEventListener('click',()=>{track.scrollBy({left:track.clientWidth,behavior:reduced?'auto':'smooth'});restart()});
  track.addEventListener('scroll',()=>{requestAnimationFrame(update)},{passive:true});
  function start(){if(timer||reduced)return;timer=setInterval(()=>{const vp=track.clientWidth;if(track.scrollLeft>=track.scrollWidth-vp-5){track.scrollTo({left:0,behavior:'smooth'})}else{track.scrollBy({left:track.clientWidth,behavior:'smooth'})}},5000)}
  function restart(){clearInterval(timer);timer=null;start()}
  ['pointerdown','wheel','touchstart'].forEach(ev=>track.addEventListener(ev,restart,{passive:true}));
  const root=document.getElementById('socialCarousel');
  if(root){root.addEventListener('mouseenter',()=>{clearInterval(timer);timer=null});root.addEventListener('mouseleave',restart)}
  start();update();
})();

/* ---- Services show more / show less ---- */
(function(){
  const grid=$('#serviceGrid'),btn=$('#servicesToggle');
  if(!grid||!btn)return;
  function shouldCollapse(){return window.matchMedia('(max-width:1259px)').matches}
  function setState(collapsed){
    grid.classList.toggle('collapsed',collapsed);
    btn.setAttribute('aria-expanded',String(!collapsed));
    btn.innerHTML=collapsed?'Show more services <span aria-hidden="true">↓</span>':'Show less services <span aria-hidden="true">↑</span>';
  }
  function refresh(){if(shouldCollapse()){if(!grid.dataset.ctrl){setState(true)}}else{grid.classList.remove('collapsed');grid.dataset.ctrl=''}}
  btn.addEventListener('click',()=>{setState(!grid.classList.contains('collapsed'));/* remember choice until resize crosses breakpoint */grid.dataset.ctrl='1'});
  let last=shouldCollapse();
  window.addEventListener('resize',()=>{const now=shouldCollapse();if(now!==last){last=now;if(!now){grid.classList.remove('collapsed');grid.dataset.ctrl=''}else{grid.dataset.ctrl='';setState(true)}}});
  refresh();
})();
