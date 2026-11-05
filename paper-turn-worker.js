let canvas,ctx,front,texture,width,height,scale,duration,backwards;
let started=0,frames=0,largestGap=0,previous=0,stopped=false,maxPaint=0,totalPaint=0,initialPaint=0;

function paint(progress){
  const p=Math.max(0,Math.min(1,progress));
  const W=width,H=height;
  ctx.setTransform(scale,0,0,scale,0,0);
  ctx.clearRect(0,0,W,H);
  const frontEnd=.78;
  if(p<=frontEnd){
    const t=p/frontEnd,edge=Math.max(0,W*(1-t)),bend=24*Math.sin(Math.PI*t);
    const columns=32,rows=5;
    ctx.save();ctx.shadowColor='rgba(35,29,19,.5)';ctx.shadowBlur=24;ctx.fillStyle='#b9a77c';ctx.fillRect(Math.max(0,edge-4),0,5,H);ctx.restore();
    for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
      const v=(row+.5)/rows,a=col/columns,b=(col+1)/columns;
      const x1=edge*a-bend*Math.sin(Math.PI*a)*v*v,x2=edge*b-bend*Math.sin(Math.PI*b)*v*v;
      if(x2<=x1)continue;
      ctx.drawImage(front,a*front.width,row*front.height/rows,front.width/columns+1,front.height/rows+1,x1,row*H/rows,x2-x1+1,H/rows+1);
    }
    const shadow=ctx.createLinearGradient(Math.max(0,edge-130),0,Math.max(1,edge),0);
    shadow.addColorStop(0,'rgba(40,31,18,0)');shadow.addColorStop(.78,`rgba(40,31,18,${.15*t})`);shadow.addColorStop(1,`rgba(40,31,18,${.34*t})`);
    ctx.fillStyle=shadow;ctx.fillRect(Math.max(0,edge-130),0,Math.min(edge,130),H);
    ctx.strokeStyle='#b19c73';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(edge,0);ctx.quadraticCurveTo(edge-bend,H*.52,edge,H);ctx.stroke();
  }else{
    const t=(p-frontEnd)/(1-frontEnd),paperWidth=.26*W*Math.sin(Math.PI*t);
    if(paperWidth<1)return;
    ctx.save();ctx.shadowColor='rgba(35,29,19,.5)';ctx.shadowBlur=25;
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(paperWidth,0);ctx.quadraticCurveTo(paperWidth-25*Math.sin(Math.PI*t),H*.5,paperWidth,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle='#d7c59b';ctx.fill();ctx.clip();
    const paper=ctx.createLinearGradient(0,0,paperWidth,0);paper.addColorStop(0,'#ae9c73');paper.addColorStop(.3,'#eaddb5');paper.addColorStop(.8,'#d8c79e');paper.addColorStop(1,'#9b8965');ctx.fillStyle=paper;ctx.fillRect(0,0,paperWidth,H);
    if(texture){ctx.globalAlpha=.35;ctx.drawImage(texture,0,0,paperWidth,H);ctx.globalAlpha=1}
    ctx.restore();
  }
}

function tick(now){
  if(stopped)return;
  if(!started)started=now;
  if(previous)largestGap=Math.max(largestGap,now-previous);
  previous=now;frames++;
  const t=Math.min(1,(now-started)/duration),ease=t*t*(3-2*t);
  const paintStart=performance.now();
  paint(backwards?1-ease:ease);
  const paintCost=performance.now()-paintStart;
  maxPaint=Math.max(maxPaint,paintCost);totalPaint+=paintCost;
  if(t<1)requestAnimationFrame(tick);
  else postMessage({type:'complete',frames,largestGap:Math.round(largestGap),maxPaint:Math.round(maxPaint),totalPaint:Math.round(totalPaint),initialPaint:Math.round(initialPaint)});
}

onmessage=event=>{
  const data=event.data;
  if(data.type==='init'){
    canvas=data.canvas;front=data.front;texture=data.texture||null;
    width=data.width;height=data.height;scale=canvas.width/width;
    duration=data.duration;backwards=data.backwards;
    ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
    const paintStart=performance.now();
    paint(backwards?1:0);
    initialPaint=performance.now()-paintStart;
    postMessage({type:'ready'});
  }else if(data.type==='start')requestAnimationFrame(tick);
  else if(data.type==='stop')stopped=true;
};
