import {create,play,choose,legal,type Mode} from '../src/game.ts';
localStorage.setItem('arremate.save.v1','{bad');const frame=document.querySelector<HTMLIFrameElement>('#game')!,results=document.querySelector('#results')!,names:string[]=[];
await new Promise(resolve=>{frame.addEventListener('load',resolve,{once:true});frame.src='/';});const doc=frame.contentDocument!;
const tick=(ms=5)=>new Promise(r=>setTimeout(r,ms)),text=(s:string)=>doc.querySelector(s)!.textContent!,check=(name:string,ok:boolean)=>{if(!ok)throw Error(name);names.push(name);const li=document.createElement('li');li.textContent='PASS — '+name;results.append(li);};
const click=async(s:string)=>{const el=doc.querySelector<HTMLButtonElement>(s)!;if(!el||el.disabled)throw Error('Missing/disabled '+s);el.click();await tick();};
const select=async(s:string,v:string)=>{const el=doc.querySelector<HTMLSelectElement>(s)!;if(el.disabled)throw Error('Disabled '+s);el.value=v;el.dispatchEvent(new Event('change',{bubbles:true}));await tick();};
const waitFor=async(fn:()=>boolean)=>{const end=Date.now()+3000;while(!fn()){if(Date.now()>end)throw Error('Timed out');await tick(10);}};
const count=()=>Number(text('.game-actions>span').split('/')[0]);
async function match(mode:Mode,size:number){await click('#restart');await select('#mode',mode);await select('#size',String(size));let g=create(size);while(g.status==='playing'){
 if(mode!=='dupla'&&g.turn===1){g=play(g,choose(g,mode)!);continue;}
 await waitFor(()=>!doc.querySelector<HTMLButtonElement>('#stitch')!.disabled);const e=choose(g,g.turn===0?'atento':'leve')!;await select('#edge-select',String(e));await click('#stitch');g=play(g,e);
 while(mode!=='dupla'&&g.status==='playing'&&g.turn===1)g=play(g,choose(g,mode)!);
 await waitFor(()=>count()===g.moves);
 }check(`${mode} ${size}: complete UI match matches model`,Number(text('#score-0'))===g.scores[0]&&Number(text('#score-1'))===g.scores[1]&&count()===g.edges.length);return g;}
try{await tick(30);check('corrupt save starts a clean field',count()===0&&text('#score-0')==='0');
doc.querySelector('#board')!.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));await tick();check('keyboard places line and pending CPU blocks player',count()===1&&doc.querySelector<HTMLButtonElement>('#stitch')!.disabled);
await click('#pause');await tick();const pausedCount=count();await tick(500);check('pause freezes pending native CPU timer',count()===pausedCount&&doc.querySelector('dialog')!.open);
doc.querySelector('dialog')!.dispatchEvent(new Event('cancel',{cancelable:true}));await tick(460);check('resume schedules exactly one CPU move',count()===2);
await click('#restart');await select('#edge-select','0');await click('#stitch');await click('#restart');await tick(500);check('restart cancels stale CPU callback',count()===0&&text('#score-0')==='0');
frame.contentWindow!.dispatchEvent(new Event('blur'));await tick();check('blur pauses and blocks keyboard',doc.querySelector('dialog')!.open);doc.querySelector('#board')!.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));await tick();check('paused board cannot consume an edge',count()===0);doc.querySelector('dialog')!.dispatchEvent(new Event('cancel',{cancelable:true}));await tick();
await click('#motion');await match('leve',4);await match('atento',4);await match('dupla',5);await match('dupla',6);
const stored=JSON.parse(localStorage.getItem('arremate.save.v1')!);check('results separated by mode and field, no duplicate save',stored.stats['leve-4'].played===1&&stored.stats['atento-4'].played===1&&stored.stats['dupla-5'].played===1&&stored.stats['dupla-6'].played===1&&stored.stats['leve-6'].played===0);
await click('#restart');check('replay clears ownership and score without erasing history',count()===0&&text('#score-0')==='0'&&text('#stats').includes('1 partida'));
await select('#mode','leve');await select('#starter','1');await waitFor(()=>count()===1);check('rival may start before player input',doc.querySelector('#edge-0')!.getAttribute('aria-label')!.includes('Rival'));
await click('#sound');const prefs=JSON.parse(localStorage.getItem('arremate.save.v1')!);check('preferences persist alongside records',prefs.motion&&prefs.sound&&prefs.stats['dupla-6'].played===1);
document.title='PASS '+names.length+' — Arremate';
}catch(e){const li=document.createElement('li');li.textContent='FAIL — '+String(e);results.append(li);document.title='FAIL — Arremate';}
