import {projects,graphics,workPage,casePage,graphicPage,experiencePage,toolboxPage,offClockPage,contactPage,assetSize} from './content.js?v=20261105perf';
import {icon} from './icons.js?v=20261105perf';
const A = '/assets/';
const chapters = [
  {path:'/',name:'Cover',number:'00',deck:'An introduction'},
  {path:'/contents',name:'Contents',number:'01',deck:'Find your way around'},
  {path:'/about',name:'About',number:'02',deck:'A little about me'},
  {path:'/work',name:'Selected Works',number:'03',deck:'Projects and the stories behind them'},
  {path:'/graphic-design',name:'Graphic Design',number:'04',deck:'A folder of things I made'},
  {path:'/experience',name:'Experience & Education',number:'05',deck:'Where I have worked and learned'},
  {path:'/toolbox',name:'Toolbox',number:'06',deck:'The tools I use'},
  {path:'/off-the-clock',name:'Off the Clock',number:'07',deck:'Football, anime and the rest'},
  {path:'/contact',name:'Contact',number:'08',deck:'Let us make something'},
];

const app = document.getElementById('app');
if('scrollRestoration' in history)history.scrollRestoration='manual';
const undersideTexture=new Image();undersideTexture.src=`${A}paper-fibres.png`;
let currentPath = normalize(location.pathname);
let turning = false;
let turnPhase = 'idle';
let queuedNavigation = null;
const scrollMemory = new Map();
const forceReduced=new URLSearchParams(location.search).get('motion')==='reduce';
document.documentElement.classList.toggle('force-reduced',forceReduced);
let folderOpen=false,folderNeat=false,viewerIndex=-1,viewerMode='art',returnFocus=null;
let viewerScrollSnapshot=null;
let mapFocusSlug=null;
let revealObserver=null;
let suppressScrollPersistence=false;
let scrollPersistTimer=0;
const viewportSnapshots=new Map();
let snapshotTimer=0;
let idlePrefetchHandle=0;
let idlePrefetchUsesTimeout=false;
let snapshotIdleHandle=0;
let snapshotIdleUsesTimeout=false;
let lastInputAt=performance.now();
let snapshotCapture=null;
let mapDrawFrame=0;

function normalize(path){const normalized=path === '/' ? '/' : path.replace(/\/+$/,'');return normalized==='/work/smart-leads'?'/work':normalized}
function chapter(path){return chapters.find(c=>c.path===path)}
function projectFor(path){return projects.find(p=>path===`/work/${p.slug}`)}
function routeTurn(from,to){
  if(to==='/')return 'close';
  if(from==='/'&&to==='/contents')return 'open';
  if(from==='/work'&&projectFor(to))return 'forward';
  if(projectFor(from)&&to==='/work')return 'back';
  const fromProject=projectFor(from),toProject=projectFor(to);
  if(fromProject&&toProject)return projects.indexOf(toProject)<projects.indexOf(fromProject)?'back':'forward';
  const fromIndex=chapters.findIndex(item=>item.path===from),toIndex=chapters.findIndex(item=>item.path===to);
  const fromOrder=fromProject?chapters.findIndex(item=>item.path==='/work'):fromIndex;
  const toOrder=toProject?chapters.findIndex(item=>item.path==='/work'):toIndex;
  if(to==='/work'&&fromProject)return 'back';
  if(from==='/work'&&toProject)return 'forward';
  if(fromOrder<0||toOrder<0)return 'forward';
  return toOrder<fromOrder?'back':'forward';
}
function resolvedTurn(from,to,requested){return requested==='direct'||!requested?routeTurn(from,to):requested}
function markedScroller(root=app){
  const elements=[...(root?.querySelectorAll?.('[data-scroll-container]')||[])];
  if(root?.matches?.('[data-scroll-container]'))elements.unshift(root);
  return elements.find(el=>/^(auto|scroll|overlay)$/.test(getComputedStyle(el).overflowY)&&el.scrollHeight>el.clientHeight+1)||elements[0]||null;
}
function captureScrollPosition(root=app){
  const container=markedScroller(root);
  return {windowY:window.scrollY,containerY:container?.scrollTop??0,containerId:container?.id||null,containerKey:container?.dataset.scrollContainer||null};
}
function restoreScrollPosition(snapshot,root=app){
  const value=snapshot||{windowY:0,containerY:0};
  window.scrollTo(0,Math.max(0,Number(value.windowY)||0));
  let container=null;
  if(value.containerId)container=root?.querySelector?.(`#${CSS.escape(value.containerId)}`)||null;
  if(!container&&value.containerKey)container=root?.querySelector?.(`[data-scroll-container="${CSS.escape(value.containerKey)}"]`)||null;
  container ||= markedScroller(root);
  if(container)container.scrollTop=Math.max(0,Number(value.containerY)||0);
}
function topScrollPosition(root=app){
  window.scrollTo(0,0);
  root?.querySelectorAll?.('[data-scroll-container]').forEach(container=>{container.scrollTop=0});
  if(root?.matches?.('[data-scroll-container]'))root.scrollTop=0;
}
function historyScrollState(){return {...(history.state||{}),path:currentPath,scrollPosition:captureScrollPosition(app)}}
function persistScrollPosition(){
  if(suppressScrollPersistence||turning)return;
  // Keep the in-session return point current without mutating browser history
  // while the user is scrolling. Navigation and pagehide save exact positions.
  scrollMemory.set(currentPath,captureScrollPosition(app));
}
function scheduleScrollPersistence(){
  if(suppressScrollPersistence||turning||scrollPersistTimer)return;
  // History state only needs a recent checkpoint while scrolling; replacing
  // it every animation frame forced synchronous work during mobile momentum.
  scrollPersistTimer=setTimeout(()=>{scrollPersistTimer=0;persistScrollPosition()},180);
}
function routeLink(path,label,mode='',klass=''){
  return `<a href="${path}" data-route="${path}"${mode?` data-turn="${mode}"`:''}${klass?` class="${klass}"`:''}>${label}</a>`;
}
function utility(c){
  if(c.path==='/')return `<header class="utility utility-cover"><a href="/" data-route="/" class="wordmark">By David</a><span>An ongoing personal publication.</span>${routeLink('/contents','Contents '+icon('book'),'direct','utility-link')}</header>`;
  return `<header class="utility"><a href="/" data-route="/" class="wordmark">By David</a><span class="chapter-indicator">${c.number} / ${c.name}</span><nav aria-label="Publication controls">${routeLink('/contents','Contents '+icon('book'),'direct','utility-link')}${routeLink('/','Close the publication '+icon('close'),'close','utility-link')}</nav></header>`;
}
function pageNav(c){
  if(c.path==='/')return '';
  const index=chapters.findIndex(x=>x.path===c.path);
  const prev=chapters[index-1],next=chapters[index+1];
  return `<nav class="page-nav" aria-label="Chapter navigation">${prev?routeLink(prev.path,icon('back')+`<span>Previous <strong>${prev.name}</strong></span>`,'back','previous'):''}</nav>`;
}
function furniture(c){return `<div class="sheet-folio"><span>BY DAVID</span><span>${c.number}</span></div>`}
function cover(){
  return `<div class="cover-layout"><div class="cover-intro"><div class="cover-copy"><p class="eyebrow">A little introduction, before we get into everything</p><h1 tabindex="-1">Hello,<br>I'm <em>David.</em></h1><p class="lead">I make websites, mobile experiences and graphics with a little personality. Come in, have a look around.</p></div><div class="cover-actions">${routeLink('/contents','Open the edition '+icon('arrow'),'open','button button-ink')}${routeLink('/work','Explore my work '+icon('external'),'direct','under-link')}</div></div><div class="cover-photo-group"><img class="cover-person" src="${A}cover-cutout.webp" width="1086" height="1448" fetchpriority="high" decoding="async" alt="David in a blue sweatshirt giving a thumbs-up"><svg class="cover-doodle" viewBox="0 0 380 110" aria-hidden="true"><path d="M3 10C86 0 181 16 320 52M297 38l27 15-26 13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="cover-caption">David Okafor<span>That’s me.</span></div></div><div class="cover-bottom"><span>WEB / MOBILE / GRAPHIC DESIGN</span><span>OPEN AT ANY CHAPTER</span></div>${routeLink('/contents','<span>Open the edition</span><i></i>','open','corner-turn corner-open')}</div>`;
}
function contents(){
  const rows=chapters.slice(2).map(c=>`<li><span>${c.number}</span>${routeLink(c.path,`<strong>${c.name}</strong><small>${c.deck}</small>`,'direct')}<span class="contents-arrow">${icon('external')}</span></li>`).join('');
  return `<div class="chapter-body contents-body"><div class="chapter-kicker"><span>01 / THE INDEX</span><span>YOU CAN START ANYWHERE</span></div><h1 tabindex="-1">Make yourself<br><em>at home.</em></h1><p class="contents-deck">This edition is a little of what I make and a little of who I am. Pick a chapter, or keep turning.</p><ol class="contents-list">${rows}</ol><div class="contents-side"><img src="${A}outdoor-portrait.jpg" ${assetSize('outdoor-portrait.jpg')} alt="David outdoors in a cap and blue patterned shirt" loading="lazy" decoding="async"><span>A note from the margins: there is no required reading order.</span></div><div class="contents-extra"><a href="/assets/david-okafor-cv-public.pdf" download>Download my CV ${icon('download')}</a><a href="mailto:okaforo253@gmail.com">Email me ${icon('external')}</a></div></div>`;
}
function about(){
  return `<div class="chapter-body about-body"><div class="chapter-kicker"><span>02 / ABOUT</span><span>HELLO AGAIN / I'M GLAD YOU'RE HERE</span></div><div class="about-grid"><div class="about-portrait"><img src="${A}about-cutout.webp" width="940" height="1673" alt="David standing in a dark outfit" decoding="async"></div><div class="about-writing"><h1 tabindex="-1">A work<br>in <em>progress.</em></h1><div class="about-copy"><p>I'm David Okafor, a final-year Computer Science student at the University of Port Harcourt. I move between frontend development, mobile apps, full-stack work and design.</p><p>In 2026, I worked as a Mobile App Developer Intern at Bincom. I developed with Apache Cordova, worked in a team and helped mobile-development trainees through practical sessions.</p><p>There's still plenty I want to learn. This is a place to see what I've made so far and where I'm heading.</p></div><div class="about-facts"><span>Mobile, web & visual design<br>B.Sc. Computer Science in progress, 2023–2027</span></div></div></div><aside class="about-sticker"><img src="${A}outdoor-portrait.jpg" ${assetSize('outdoor-portrait.jpg')} alt="David outdoors in a cap and blue patterned shirt" loading="lazy" decoding="async"></aside></div>`;
}
function buildPage(path){
  const project=projectFor(path);
  const c=chapter(path)||(project?{path,name:project.name,number:project.number,deck:project.kind}:{path,name:'Page not found',number:'?',deck:''});
  const section=document.createElement('section');section.className='chapter-page';section.dataset.path=path;
  const content=path==='/'?cover():path==='/contents'?contents():path==='/about'?about():path==='/work'?workPage():project?casePage(project):path==='/graphic-design'?graphicPage():path==='/experience'?experiencePage():path==='/toolbox'?toolboxPage():path==='/off-the-clock'?offClockPage():path==='/contact'?contactPage():`<div class="chapter-body"><h1 tabindex="-1">Page not found.</h1><p><a href="/contents" data-route="/contents">Go to Contents</a></p></div>`;
  const isChapter=!!chapter(path),index=chapters.findIndex(x=>x.path===path),next=chapters[index+1];
  const cornerLabel=project?'Next project': 'Next chapter';
  section.innerHTML=`${utility(c)}<main class="sheet ${path==='/'?'sheet-cover':`sheet-${c.number}`}" id="main">${content}${path==='/'?'':furniture(c)}${isChapter?pageNav(c):''}${next&&path!=='/'?routeLink(next.path,`<span>${cornerLabel}: ${next.name}</span><i></i>`,'forward','corner-turn corner-next'):''}</main>`;
  return section;
}
const CHAPTER_PREFETCH = {
  '/': ['/assets/outdoor-portrait.jpg'],
  '/contents': ['/assets/about-cutout.webp'],
  '/about': ['/assets/auto-job-serve-landing.webp'],
  '/work': [],
  '/graphic-design': [],
  '/experience': [],
  '/toolbox': [],
  '/off-the-clock': []
};
const PRELOADED_ASSETS = new Set();
function prefetchAssets(urls){
  for(const url of urls){
    if(!url || PRELOADED_ASSETS.has(url)) continue;
    PRELOADED_ASSETS.add(url);
    const img = new Image();
    img.decoding='async';img.fetchPriority='low';
    img.src = url;
  }
}
function scheduleIdlePrefetch(path){
  if(idlePrefetchHandle){idlePrefetchUsesTimeout?clearTimeout(idlePrefetchHandle):cancelIdleCallback(idlePrefetchHandle);idlePrefetchHandle=0}
  const schedule = window.requestIdleCallback || (cb => setTimeout(cb, 600));
  idlePrefetchUsesTimeout=!window.requestIdleCallback;
  idlePrefetchHandle=schedule(()=>{
    idlePrefetchHandle=0;
    if(normalize(location.pathname)!==path)return;
    const list = [...(CHAPTER_PREFETCH[path] || [])];
    const idx = chapters.findIndex(c => c.path === path);
    if(idx !== -1){
      const next = chapters[idx + 1]?.path;
      if(next && CHAPTER_PREFETCH[next]) list.push(...CHAPTER_PREFETCH[next]);
      const prev = chapters[idx - 1]?.path;
      if(prev && CHAPTER_PREFETCH[prev]) list.push(...CHAPTER_PREFETCH[prev]);
    }
    prefetchAssets(list);
  },{timeout:1600});
}

function clearTemporaryTurnStyles(page){
  for(const property of ['position','left','right','top','width','zIndex','transform','transformOrigin','transformStyle','backfaceVisibility','transition','filter','pointerEvents'])page.style[property]='';
}

const paperUnderside = new Image();
paperUnderside.src = `${A}paper-fibres.png`;
function captureEngineReady(){
  if(typeof window.html2canvas === 'function') return Promise.resolve();
  return new Promise((resolve,reject)=>{
    const script=document.querySelector('script[src*="html2canvas.min.js"]');
    if(!script){reject(new Error('Paper capture engine is missing'));return}
    const timeout=setTimeout(()=>{cleanup();reject(new Error('Paper capture engine did not load'))},5000);
    const loaded=()=>{cleanup();typeof window.html2canvas==='function'?resolve():reject(new Error('Paper capture engine failed'))};
    const failed=()=>{cleanup();reject(new Error('Paper capture engine failed to load'))};
    const cleanup=()=>{clearTimeout(timeout);script.removeEventListener('load',loaded);script.removeEventListener('error',failed)};
    script.addEventListener('load',loaded,{once:true});script.addEventListener('error',failed,{once:true});
    if(typeof window.html2canvas==='function')loaded();
  });
}
async function captureViewport(page){
  await captureEngineReady();
  // Capture the currently painted font state; waiting on remote font delivery delayed every first turn.
  const viewportWidth=innerWidth,viewportHeight=innerHeight;
  const crop=Math.max(0,-page.getBoundingClientRect().top);
  const images=[...page.querySelectorAll('img')];
  const readyImageSources=new Set(images.filter(image=>image.complete&&image.naturalWidth>0).map(image=>image.currentSrc||image.src));
  const pruneSelector='.project-stop,.off-group,.off-notes,.case-section,.case-hero,.case-more';
  const heavyBlocks=[...page.querySelectorAll(pruneSelector)].map(element=>{const rect=element.getBoundingClientRect(),style=getComputedStyle(element);return{rect:{top:rect.top,bottom:rect.bottom,height:rect.height},marginTop:style.marginTop,marginBottom:style.marginBottom}});
  const bitmap=await Promise.race([
    window.html2canvas(page,{backgroundColor:'#38362f',logging:false,useCORS:true,imageTimeout:800,scale:Math.min(devicePixelRatio||1,1.15),x:0,y:crop,width:viewportWidth,height:viewportHeight,onclone:clone=>{
      const clonedPage=clone.querySelector('.chapter-page');
      if(!clonedPage)return;
      const clonedHeavyBlocks=[...clonedPage.querySelectorAll(pruneSelector)];
      heavyBlocks.forEach((block,index)=>{if(block.rect.bottom>0&&block.rect.top<viewportHeight)return;const target=clonedHeavyBlocks[index];if(!target)return;target.replaceChildren();target.style.height=`${block.rect.height}px`;target.style.minHeight=`${block.rect.height}px`;target.style.marginTop=block.marginTop;target.style.marginBottom=block.marginBottom;});
      clonedPage.querySelectorAll('img').forEach(image=>{if(readyImageSources.has(image.currentSrc||image.src))return;image.removeAttribute('src');image.removeAttribute('srcset');image.style.visibility='hidden'});
    }}),
    new Promise((_,reject)=>setTimeout(()=>reject(new Error('Paper capture timed out')),3500))
  ]);
  if(viewportWidth!==innerWidth||viewportHeight!==innerHeight)throw new Error('Viewport changed during paper preparation');
  if(!bitmap.width||!bitmap.height)throw new Error('Paper capture was empty');
  return bitmap;
}
function snapshotKey(path,scrollY){return `${path}|${Math.round(scrollY)}|${innerWidth}x${innerHeight}`}
function snapshotFor(page,path,scrollY){
  const key=snapshotKey(path,scrollY);
  if(viewportSnapshots.has(key))return viewportSnapshots.get(key);
  if(snapshotCapture){
    const active=snapshotCapture;let waiting;
    waiting=active.catch(()=>undefined).then(()=>{if(viewportSnapshots.get(key)===waiting)viewportSnapshots.delete(key);return snapshotFor(page,path,scrollY)});
    viewportSnapshots.set(key,waiting);
    return waiting;
  }
  let promise;
  promise=captureViewport(page).then(bitmap=>{
    if(path===currentPath&&Math.abs(window.scrollY-scrollY)>1)throw new Error('Page scrolled during capture');
    return bitmap;
  }).catch(error=>{viewportSnapshots.delete(key);throw error}).finally(()=>{if(snapshotCapture===promise)snapshotCapture=null});
  snapshotCapture=promise;
  viewportSnapshots.set(key,promise);
  while(viewportSnapshots.size>4)viewportSnapshots.delete(viewportSnapshots.keys().next().value);
  return promise;
}
function scheduleSnapshot(){
  clearTimeout(snapshotTimer);
  if(snapshotIdleHandle){snapshotIdleUsesTimeout?clearTimeout(snapshotIdleHandle):cancelIdleCallback(snapshotIdleHandle);snapshotIdleHandle=0}
  if(turning)return;
  snapshotTimer=setTimeout(()=>{
    snapshotTimer=0;
    const page=app.firstElementChild,path=currentPath,scrollY=window.scrollY;
    const run=()=>{
      snapshotIdleHandle=0;
      if(turning||page!==app.firstElementChild||path!==currentPath||Math.abs(window.scrollY-scrollY)>1)return;
      const quietFor=performance.now()-lastInputAt;
      const inputPending=!!navigator.scheduling?.isInputPending?.({includeContinuous:true});
      if(snapshotCapture){snapshotTimer=setTimeout(run,180);return}
      // Prepare the current viewport early enough that the first page turn is
      // usually backed by a ready sheet. Keep the input-pending guard so the
      // capture never competes with an active scroll, tap, or key press.
      if(quietFor<1400||inputPending){
        snapshotTimer=setTimeout(()=>{
          snapshotTimer=0;
          snapshotIdleUsesTimeout=!window.requestIdleCallback;
          snapshotIdleHandle=window.requestIdleCallback?requestIdleCallback(run,{timeout:600}):setTimeout(run,100);
        },inputPending?180:Math.max(120,1400-quietFor));
        return;
      }
      snapshotFor(page,path,scrollY).catch(()=>{});
    };
    snapshotIdleUsesTimeout=!window.requestIdleCallback;
    snapshotIdleHandle=window.requestIdleCallback?requestIdleCallback(run,{timeout:600}):setTimeout(run,100);
  },280);
}
function paintFlexibleSheet(canvas,bitmap,progress){
  const ctx=canvas.getContext('2d');
  const scale=canvas.width/innerWidth,W=innerWidth,H=innerHeight;
  ctx.setTransform(scale,0,0,scale,0,0);ctx.clearRect(0,0,W,H);
  const p=Math.max(0,Math.min(1,progress));
  const frontEnd=.78;
  if(p<=frontEnd){
    const t=p/frontEnd,edge=Math.max(0,W*(1-t)),bend=24*Math.sin(Math.PI*t);
    const columns=32,rows=5;
    ctx.save();ctx.shadowColor='rgba(35,29,19,.5)';ctx.shadowBlur=24;ctx.fillStyle='#b9a77c';ctx.fillRect(Math.max(0,edge-4),0,5,H);ctx.restore();
    for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
      const v=(row+.5)/rows,a=col/columns,b=(col+1)/columns;
      const x1=edge*a-bend*Math.sin(Math.PI*a)*v*v,x2=edge*b-bend*Math.sin(Math.PI*b)*v*v;
      if(x2<=x1)continue;
      ctx.drawImage(bitmap,a*bitmap.width,row*bitmap.height/rows,bitmap.width/columns+1,bitmap.height/rows+1,x1,row*H/rows,x2-x1+1,H/rows+1);
    }
    const shadow=ctx.createLinearGradient(Math.max(0,edge-130),0,Math.max(1,edge),0);
    shadow.addColorStop(0,'rgba(40,31,18,0)');shadow.addColorStop(.78,`rgba(40,31,18,${.15*t})`);shadow.addColorStop(1,`rgba(40,31,18,${.34*t})`);
    ctx.fillStyle=shadow;ctx.fillRect(Math.max(0,edge-130),0,Math.min(edge,130),H);
    ctx.strokeStyle='#b19c73';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(edge,0);ctx.quadraticCurveTo(edge-bend,H*.52,edge,H);ctx.stroke();
  }else{
    const t=(p-frontEnd)/(1-frontEnd),width=.26*W*Math.sin(Math.PI*t);
    if(width<1)return;
    ctx.save();ctx.shadowColor='rgba(35,29,19,.5)';ctx.shadowBlur=25;
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(width,0);ctx.quadraticCurveTo(width-25*Math.sin(Math.PI*t),H*.5,width,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle='#d7c59b';ctx.fill();ctx.clip();
    const paper=ctx.createLinearGradient(0,0,width,0);paper.addColorStop(0,'#ae9c73');paper.addColorStop(.3,'#eaddb5');paper.addColorStop(.8,'#d8c79e');paper.addColorStop(1,'#9b8965');ctx.fillStyle=paper;ctx.fillRect(0,0,width,H);
    if(paperUnderside.complete&&paperUnderside.naturalWidth){ctx.globalAlpha=.35;ctx.drawImage(paperUnderside,0,0,width,H);ctx.globalAlpha=1}
    ctx.restore();
  }
}
async function preparePaperWorker(canvas,bitmap,backwards,duration){
  if(!canvas.transferControlToOffscreen||!window.Worker||!window.createImageBitmap)return null;
  const front=await createImageBitmap(bitmap);
  const texture=paperUnderside.complete&&paperUnderside.naturalWidth?await createImageBitmap(paperUnderside):null;
  const worker=new Worker('/paper-turn-worker.js?v=20261105e');
  const offscreen=canvas.transferControlToOffscreen();
  let finishTurn;
  const finished=new Promise(resolve=>{finishTurn=resolve});
  const ready=new Promise((resolve,reject)=>{
    const timeout=setTimeout(()=>reject(new Error('Paper worker did not initialise')),1800);
    worker.onmessage=event=>{
      if(event.data.type==='ready'){clearTimeout(timeout);resolve()}
      if(event.data.type==='complete'){window.__lastPaperTurnFrames=event.data;finishTurn()}
    };
    worker.onerror=event=>{clearTimeout(timeout);window.__lastPaperTurnFrames={type:'error',message:event.message||'Paper worker failed'};finishTurn();reject(new Error(event.message||'Paper worker failed'))};
  });
  const transfer=[offscreen,front];if(texture)transfer.push(texture);
  worker.postMessage({type:'init',canvas:offscreen,front,texture,width:innerWidth,height:innerHeight,duration,backwards},transfer);
  try{await ready}catch(error){worker.terminate();throw error}
  return {worker,finished,start:()=>worker.postMessage({type:'start'})};
}
async function animateFlexibleTurn(outgoing,incoming,mode,destinationPosition,outgoingPosition){
  const backwards=mode==='back'||mode==='close';
  const destinationY=Math.max(0,Number(destinationPosition?.windowY)||0);
  incoming.style.position='fixed';incoming.style.inset='0';incoming.style.top=`${-destinationY}px`;incoming.style.width='100%';incoming.style.zIndex='-1';incoming.inert=true;incoming.setAttribute('aria-hidden','true');app.insertBefore(incoming,outgoing);
  let bitmap;
  try{[bitmap]=await Promise.all([snapshotFor(backwards?incoming:outgoing,backwards?incoming.dataset.path:outgoing.dataset.path,backwards?destinationY:outgoingPosition.windowY)])}catch(error){
    if(incoming.parentElement)incoming.remove();incoming.style.cssText='';incoming.inert=false;incoming.removeAttribute('aria-hidden');throw error;
  }
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  const canvas=document.createElement('canvas');canvas.className='turn-canvas';canvas.width=Math.ceil(innerWidth*Math.min(devicePixelRatio||1,1.35));canvas.height=Math.ceil(innerHeight*Math.min(devicePixelRatio||1,1.35));canvas.style.cssText='inset:0;width:100vw;height:100vh;';canvas.setAttribute('aria-hidden','true');canvas.inert=true;
  const duration=mode==='open'||mode==='close'?960:820;
  let paperWorker=null;
  try{
    paperWorker=await preparePaperWorker(canvas,bitmap,backwards,duration);
    if(!backwards){incoming.style.zIndex='1';outgoing.style.visibility='hidden'}
    else{outgoing.style.position='fixed';outgoing.style.left='0';outgoing.style.top=`${-Math.max(0,Number(outgoingPosition?.windowY)||0)}px`;outgoing.style.width='100%';outgoing.style.zIndex='2'}
    if(!paperWorker)paintFlexibleSheet(canvas,bitmap,backwards?1:0);
    restoreScrollPosition(destinationPosition,incoming);
    document.body.append(canvas);
    turnPhase='turning';
    const start=performance.now();
    await new Promise(resolve=>{
      let frame=0,finished=false;
      const watchdog=setTimeout(()=>{window.__lastPaperTurnFrames={type:'timeout'};done()},5000);
      const done=()=>{if(finished)return;finished=true;clearTimeout(watchdog);cancelAnimationFrame(frame);removeEventListener('resize',done);resolve()};
      const draw=now=>{if(finished)return;const t=Math.min(1,(now-start)/duration),ease=t*t*(3-2*t);paintFlexibleSheet(canvas,bitmap,backwards?1-ease:ease);if(t<1)frame=requestAnimationFrame(draw);else done()};
      addEventListener('resize',done,{once:true});
      if(paperWorker){paperWorker.finished.then(done);paperWorker.start()}
      else frame=requestAnimationFrame(draw);
    });
  }finally{
    turnPhase='settling';
    paperWorker?.worker.terminate();
    canvas.remove();outgoing.style.visibility='';clearTemporaryTurnStyles(outgoing);incoming.inert=false;incoming.removeAttribute('aria-hidden');incoming.style.cssText='';app.replaceChildren(incoming);restoreScrollPosition(destinationPosition,incoming);
  }
}

async function animateDomTurn(outgoing,incoming,mode,destinationPosition,outgoingPosition){
  if(incoming.parentElement)incoming.remove();
  clearTemporaryTurnStyles(outgoing);
  clearTemporaryTurnStyles(incoming);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || forceReduced;
  const backwards = mode === 'back' || mode === 'close';
  const duration = reduced ? 180 : innerWidth < 700 ? 540 : 720;

  if(reduced){
    app.replaceChildren(incoming);
    restoreScrollPosition(destinationPosition,incoming);
    return;
  }

  try { await animateFlexibleTurn(outgoing,incoming,mode,destinationPosition,outgoingPosition); return; }
  catch(error){
    if(error.message==='Viewport changed during paper preparation')throw error;
    console.warn('Flexible paper turn unavailable; using the emergency page turn.',error);
  }

  const sheet = outgoing.querySelector('.sheet') || outgoing;
  const sheetRect = sheet.getBoundingClientRect();
  const spineX = backwards
    ? (innerWidth > 1464 ? sheetRect.right : innerWidth)
    : (innerWidth > 1464 ? sheetRect.left : 0);

  const scrollY = Math.max(0, Number(outgoingPosition?.windowY) || 0);
  const destY = Math.max(0, Number(destinationPosition?.windowY) || 0);

  app.insertBefore(incoming, outgoing);
  incoming.style.position = 'fixed';
  incoming.style.left = '0';
  incoming.style.right = '0';
  incoming.style.top = `${-destY}px`;
  incoming.style.width = '100%';
  incoming.style.zIndex = '1';
  incoming.style.pointerEvents = 'none';

  const stage = document.createElement('div');
  stage.className = 'paper-turn-stage';

  const underShadow = document.createElement('div');
  underShadow.className = 'paper-turn-under-shadow';
  underShadow.style.background = backwards
    ? 'linear-gradient(to left, rgba(20,18,12,0.32) 0%, rgba(20,18,12,0.08) 35%, transparent 75%)'
    : 'linear-gradient(to right, rgba(20,18,12,0.32) 0%, rgba(20,18,12,0.08) 35%, transparent 75%)';
  stage.appendChild(underShadow);

  const leaf = document.createElement('div');
  leaf.className = 'paper-turn-leaf';
  leaf.style.transformOrigin = `${spineX}px center`;

  const front = document.createElement('div');
  front.className = 'paper-turn-front';

  outgoing.style.position = 'absolute';
  outgoing.style.left = '0';
  outgoing.style.right = '0';
  outgoing.style.top = `${-scrollY}px`;
  outgoing.style.width = '100%';
  front.appendChild(outgoing);

  const shadeFront = document.createElement('div');
  shadeFront.className = 'paper-turn-shade-front';
  shadeFront.style.background = backwards
    ? 'linear-gradient(to left, rgba(20,18,12,0.3) 0%, rgba(20,18,12,0.06) 40%, transparent 100%)'
    : 'linear-gradient(to right, rgba(20,18,12,0.3) 0%, rgba(20,18,12,0.06) 40%, transparent 100%)';
  front.appendChild(shadeFront);

  const back = document.createElement('div');
  back.className = 'paper-turn-back';
  back.innerHTML = `<span class="paper-turn-back-watermark">BY DAVID</span><div class="paper-turn-shade-back" style="background:${backwards ? 'linear-gradient(to left, rgba(20,18,12,0.28) 0%, rgba(255,255,255,0.08) 18%, transparent 65%)' : 'linear-gradient(to right, rgba(20,18,12,0.28) 0%, rgba(255,255,255,0.08) 18%, transparent 65%)'};"></div>`;

  leaf.appendChild(front);
  leaf.appendChild(back);
  stage.appendChild(leaf);
  document.body.appendChild(stage);

  const targetAngle = backwards ? 165 : -165;
  const easing = 'cubic-bezier(0.2, 0.68, 0.18, 1)';

  try {
    const leafAnim = leaf.animate([
      { transform: 'rotateY(0deg)' },
      { transform: `rotateY(${targetAngle}deg)` }
    ], { duration, easing, fill: 'forwards' });

    shadeFront.animate([
      { opacity: 0 },
      { opacity: 0.32, offset: 0.48 },
      { opacity: 0.32 }
    ], { duration, easing, fill: 'forwards' });

    underShadow.animate([
      { opacity: 0.35 },
      { opacity: 0.32, offset: 0.35 },
      { opacity: 0 }
    ], { duration, easing: 'ease-out', fill: 'forwards' });

    await new Promise(resolve => {
      let settled = false;
      const finish = () => {
        if(settled) return;
        settled = true;
        resolve();
      };
      leafAnim.onfinish = finish;
      leafAnim.oncancel = finish;
      setTimeout(finish, duration + 100);
    });
  } catch {
  } finally {
    stage.remove();
    clearTemporaryTurnStyles(incoming);
    app.replaceChildren(incoming);
    restoreScrollPosition(destinationPosition, incoming);
  }
}

async function navigate(path,mode='direct',push=true,restore=null){
  path=normalize(path);
  if(turning){
    if(path !== currentPath && (!queuedNavigation || queuedNavigation.path !== path)){
      queuedNavigation = {path, mode, push, restore};
    }
    return;
  }
  if(path===currentPath){
    if(restore?.scrollPosition)restoreScrollPosition(restore.scrollPosition,app);
    else topScrollPosition(app);
    const heading=app.querySelector('.chapter-page h1');
    requestAnimationFrame(()=>heading?.focus({preventScroll:true}));
    return;
  }
  mode=resolvedTurn(currentPath,path,mode);
  closeViewer(false);
  const old=app.firstElementChild,next=buildPage(path),oldPath=currentPath;
  const outgoingPosition=captureScrollPosition(old);
  scrollMemory.set(oldPath,outgoingPosition);
  if(push){
    if(scrollPersistTimer){clearTimeout(scrollPersistTimer);scrollPersistTimer=0}
    history.replaceState({...history.state,path:oldPath,scrollPosition:outgoingPosition},'',location.href);
  }
  const destinationPosition=mode==='restore'
    ?(scrollMemory.get(path)||restore?.scrollPosition||{windowY:0,containerY:0})
    :(restore?.scrollPosition||{windowY:0,containerY:0});
  if(projectFor(path))mapFocusSlug=projectFor(path).slug;
  const isTurn=['open','forward','back','close'].includes(mode);
  clearTimeout(snapshotTimer);turning=true;turnPhase='preparing';suppressScrollPersistence=true;document.body.classList.add('is-turning');app.inert=true;
  try{
    try{
      if(isTurn&&old?.isConnected)await animateDomTurn(old,next,mode,destinationPosition,outgoingPosition);
      else{app.replaceChildren(next);restoreScrollPosition(destinationPosition,next)}
    }catch(error){
      console.warn('Page-turn animation could not finish; restoring the destination page.',error);
      app.replaceChildren(next);restoreScrollPosition(destinationPosition,next);
    }
    currentPath=path;
    if(push&&queuedNavigation?.push!==false){
      history.pushState({path,scrollPosition:destinationPosition},'',path);
    }else if(!push){
      history.replaceState({...history.state,path,scrollPosition:destinationPosition},'',location.href);
    }
    const c=chapter(path);document.title=`${c?.name||projectFor(path)?.name||'Page not found'} | By David`;
  }finally{
    document.querySelectorAll('.turn-canvas,.paper-turn-stage').forEach(el=>el.remove());
    document.querySelectorAll('.chapter-page').forEach(page=>{page.style.position='';page.style.left='';page.style.top='';page.style.width='';page.style.zIndex=''});
    app.inert=false;document.body.classList.remove('is-turning');document.documentElement.style.overflow='';document.body.style.overflow='';turning=false;turnPhase='idle';suppressScrollPersistence=false;
  }
  afterRender(path);
  scheduleSnapshot();
  const focusTarget=path==='/work'&&mapFocusSlug?document.querySelector(`#stop-${mapFocusSlug} .project-link`):next.querySelector('h1');
  if(path==='/work'||(!projectFor(path)&&path!=='/work'))mapFocusSlug=null;
  requestAnimationFrame(()=>{if(currentPath===path)focusTarget?.focus({preventScroll:true})});
  if(queuedNavigation){const queued=queuedNavigation;queuedNavigation=null;navigate(queued.path,queued.mode,queued.push,queued.restore)}
}

document.addEventListener('click',e=>{
  const action=e.target.closest('[data-folder-toggle],[data-arrange],[data-view-all],[data-art],[data-project-viewer],[data-viewer-close],[data-viewer-prev],[data-viewer-next],[data-viewer-all]');
  if(action){
    viewportSnapshots.clear();scheduleSnapshot();
    if(action.matches('[data-folder-toggle]'))toggleFolder();
    else if(action.matches('[data-arrange]')){folderOpen=true;folderNeat=true;syncFolder()}
    else if(action.matches('[data-view-all],[data-viewer-all]')){closeViewer();folderOpen=true;syncFolder();document.querySelector('.gallery-index')?.scrollIntoView({block:'start',behavior:'smooth'})}
    else if(action.matches('[data-art]'))openViewer(Number(action.dataset.art),action);
    else if(action.matches('[data-project-viewer]'))openProjectViewer(action.dataset.projectViewer,action.dataset.imageAlt,action);
    else if(action.matches('[data-viewer-close]'))closeViewer();
    else if(action.matches('[data-viewer-prev]'))openViewer((viewerIndex-1+graphics.length)%graphics.length);
    else if(action.matches('[data-viewer-next]'))openViewer((viewerIndex+1)%graphics.length);
    return;
  }
  const link=e.target.closest('a[data-route]');if(!link||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  e.preventDefault();
  const target=normalize(link.dataset.route),restoreMap=link.hasAttribute('data-scroll-restore');
  navigate(target,resolvedTurn(currentPath,target,link.dataset.turn),true,restoreMap?{scrollPosition:scrollMemory.get(target)||{windowY:0,containerY:0}}:null);
});
addEventListener('popstate',event=>navigate(location.pathname,routeTurn(currentPath,normalize(location.pathname)),false,{scrollPosition:event.state?.scrollPosition||scrollMemory.get(normalize(location.pathname))||{windowY:0,containerY:0}}));
addEventListener('scroll',()=>{lastInputAt=performance.now();scheduleScrollPersistence();scheduleSnapshot()},{passive:true,capture:true});
const noteInput=()=>{lastInputAt=performance.now()};
for(const type of ['pointerdown','keydown','wheel','touchstart','touchmove','touchend'])addEventListener(type,noteInput,{passive:type!=='keydown',capture:true});
document.addEventListener('load',event=>{const image=event.target;if(!(image instanceof HTMLImageElement)||image.closest('.chapter-page')!==app.firstElementChild)return;const rect=image.getBoundingClientRect();if(rect.width>0&&rect.height>0&&rect.bottom>0&&rect.top<innerHeight&&rect.right>0&&rect.left<innerWidth){viewportSnapshots.delete(snapshotKey(currentPath,window.scrollY));scheduleSnapshot()}},true);
addEventListener('pagehide',()=>{const position=captureScrollPosition(app);scrollMemory.set(currentPath,position);history.replaceState({...historyScrollState(),scrollPosition:position},'',location.href)});
app.replaceChildren(buildPage(currentPath));
topScrollPosition(app);
history.replaceState({...history.state,path:currentPath,scrollPosition:captureScrollPosition(app)},'',location.pathname===currentPath?location.href:currentPath+location.search+location.hash);
document.title=`${chapter(currentPath)?.name||projectFor(currentPath)?.name||'Page not found'} | By David`;
afterRender(currentPath);
scheduleSnapshot();
function afterRender(path){
  revealObserver?.disconnect();revealObserver=null;
  if(path==='/work'){
    scheduleMapDraw();
  }
  if(path==='/off-the-clock'){
    const body=document.querySelector('.off-body'),groups=[...document.querySelectorAll('.off-body [data-reveal]')];
    if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){groups.forEach(group=>group.classList.add('is-visible'))}
    else{body.classList.add('reveal-ready');revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver?.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -6%'});groups.forEach(group=>revealObserver.observe(group))}
  }
  if(path==='/graphic-design')syncFolder();
  scheduleIdlePrefetch(path);
}
addEventListener('resize',()=>{viewportSnapshots.clear();scheduleSnapshot();if(currentPath==='/work')scheduleMapDraw()});
function scheduleMapDraw(){if(mapDrawFrame)return;mapDrawFrame=requestAnimationFrame(()=>{mapDrawFrame=0;drawMap()})}
function drawMap(){
  const map=document.querySelector('#project-map'),svg=map?.querySelector('.map-lines');if(!map||!svg)return;
  const mr=map.getBoundingClientRect(),anchors=[...map.querySelectorAll('.stop-anchor')].map(a=>{const r=a.getBoundingClientRect();return {x:r.left-mr.left+r.width/2,y:r.top-mr.top+r.height/2}});
  svg.setAttribute('viewBox',`0 0 ${mr.width} ${mr.height}`);
  svg.innerHTML=`<defs><marker id="map-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 10 6 1 11" fill="none" stroke="currentColor" stroke-width="1.5"/></marker></defs>`+anchors.slice(0,-1).map((a,i)=>{const b=anchors[i+1],mid=(a.y+b.y)/2;return `<path d="M ${a.x} ${a.y} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${b.y}" marker-end="url(#map-arrow)"/>`}).join('');
}
function syncFolder(){
  const folder=document.querySelector('#folder');if(!folder)return;
  folder.classList.toggle('open',folderOpen);folder.classList.toggle('neat',folderNeat);
  folder.querySelectorAll('.print').forEach(print=>print.disabled=!folderOpen);
  folder.querySelector('.folder-front').setAttribute('aria-expanded',String(folderOpen));
  folder.querySelector('.folder-front b').innerHTML=folderOpen?`Close folder ${icon('folderClose')}`:`Open folder ${icon('folderOpen')}`;
  folder.parentElement.querySelector('.folder-actions [data-folder-toggle]').textContent=folderOpen?'Close folder':'Open folder';
}
function toggleFolder(){folderOpen=!folderOpen;if(!folderOpen)folderNeat=false;syncFolder()}
function openViewer(index,origin){
  let dialog=document.querySelector('#art-viewer');
  if(!dialog){dialog=document.createElement('dialog');dialog.id='art-viewer';dialog.className='art-viewer';document.body.append(dialog)}
  if(!dialog.open){viewerScrollSnapshot=captureScrollPosition(app);returnFocus=origin||document.activeElement}
  else if(origin)returnFocus=origin;
  viewerMode='art';viewerIndex=index;
  const g=graphics[index];
  dialog.innerHTML=`<div class="viewer-bar"><span>${String(index+1).padStart(2,'0')} / ${String(graphics.length).padStart(2,'0')} — ${g.title}</span><button type="button" data-viewer-close aria-label="Close artwork viewer">Close ${icon('close')}</button></div><div class="viewer-art"><img src="${A}${g.file}" ${assetSize(g.file)} alt="${g.alt}" decoding="async"></div><div class="viewer-actions"><button type="button" data-viewer-prev>${icon('previous')} Previous</button><button type="button" data-viewer-all>View all</button><button type="button" data-viewer-next>Next ${icon('next')}</button></div>`;
  if(!dialog.open)dialog.showModal();dialog.oncancel=e=>{e.preventDefault();closeViewer()};dialog.querySelector('[data-viewer-close]').focus();
}
function openProjectViewer(src,alt,origin){
  let dialog=document.querySelector('#art-viewer');
  if(!dialog){dialog=document.createElement('dialog');dialog.id='art-viewer';dialog.className='art-viewer';document.body.append(dialog)}
  if(!dialog.open){viewerScrollSnapshot=captureScrollPosition(app);returnFocus=origin||document.activeElement}
  viewerMode='project';viewerIndex=-1;
  dialog.innerHTML=`<div class="viewer-bar"><span>${alt}</span><button type="button" data-viewer-close aria-label="Close enlarged project image">Close ${icon('close')}</button></div><div class="viewer-art"><img src="${src}" ${assetSize(src)} alt="${alt}" decoding="async"></div>`;
  if(!dialog.open)dialog.showModal();dialog.oncancel=e=>{e.preventDefault();closeViewer()};dialog.querySelector('[data-viewer-close]').focus();
}
function closeViewer(restore=true){const dialog=document.querySelector('#art-viewer');if(dialog?.open)dialog.close();if(restore){restoreScrollPosition(viewerScrollSnapshot,app);if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true})}viewerIndex=-1;viewerScrollSnapshot=null;returnFocus=null;viewerMode='art';}
document.addEventListener('keydown',e=>{
  if(!document.querySelector('#art-viewer')?.open)return;
  if(e.key==='Escape'){e.preventDefault();closeViewer()}
  else if(viewerMode==='art'&&e.key==='ArrowLeft'){e.preventDefault();openViewer((viewerIndex-1+graphics.length)%graphics.length)}
  else if(viewerMode==='art'&&e.key==='ArrowRight'){e.preventDefault();openViewer((viewerIndex+1)%graphics.length)}
});
