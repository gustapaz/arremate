export type Owner=-1|0|1;export type Player=0|1;export type Mode='leve'|'atento'|'dupla';
export type Point={x:number;y:number};export type Edge={a:number;b:number;cells:number[]};export type Cell={nodes:number[];edges:number[];center:Point};export type Field={points:Point[];edges:Edge[];cells:Cell[]};
const fields=new Map<number,Field>();
export function field(size:number):Field{
 if(![4,5,6].includes(size))throw Error('Invalid size');const cached=fields.get(size);if(cached)return cached;
 const points:Point[]=[],ids=new Map<string,number>(),edges:Edge[]=[],cells:Cell[]=[],edgeIds=new Map<string,number>();
 for(let r=0;r<=size;r++)for(let c=0;c<=r;c++){ids.set(`${r}.${c}`,points.length);points.push({x:400+(c-r/2)*640/size,y:58+r*Math.sqrt(3)/2*640/size});}
 const add=(coords:number[][])=>{const nodes=coords.map(([r,c])=>ids.get(`${r}.${c}`)!);const ci=cells.length;const es=nodes.map((a,j)=>{const b=nodes[(j+1)%3],key=[a,b].sort((a,b)=>a-b).join(':');let id=edgeIds.get(key);if(id===undefined){id=edges.length;edgeIds.set(key,id);edges.push({a,b,cells:[]});}edges[id].cells.push(ci);return id;});cells.push({nodes,edges:es,center:{x:nodes.reduce((sum,i)=>sum+points[i].x,0)/3,y:nodes.reduce((sum,i)=>sum+points[i].y,0)/3}});};
 for(let r=0;r<size;r++)for(let c=0;c<=r;c++)add([[r,c],[r+1,c],[r+1,c+1]]);
 for(let r=1;r<size;r++)for(let c=0;c<r;c++)add([[r,c],[r,c+1],[r+1,c+1]]);
 const f={points,edges,cells};fields.set(size,f);return f;
}
export type Game={size:number;edges:Owner[];cells:Owner[];turn:Player;scores:[number,number];moves:number;last:number;status:'playing'|'done';claimed:number[]};
export function create(size=4,starter:Player=0):Game{const f=field(size);return {size,edges:Array(f.edges.length).fill(-1),cells:Array(f.cells.length).fill(-1),turn:starter===1?1:0,scores:[0,0],moves:0,last:-1,status:'playing',claimed:[]};}
export function legal(g:Game){return g.status==='done'?[]:g.edges.flatMap((owner,i)=>owner===-1?[i]:[]);}
export function play(g:Game,index:number):Game{
 if(g.status==='done'||!Number.isInteger(index)||index<0||index>=g.edges.length||g.edges[index]!==-1)return g;
 const edges=[...g.edges],cells=[...g.cells],scores:[number,number]=[...g.scores];edges[index]=g.turn;
 const claimed=field(g.size).edges[index].cells.filter(i=>cells[i]===-1&&field(g.size).cells[i].edges.every(e=>edges[e]!==-1));
 for(const i of claimed)cells[i]=g.turn;scores[g.turn]+=claimed.length;
 const done=edges.every(e=>e!==-1);return {size:g.size,edges,cells,scores,turn:claimed.length?g.turn:(1-g.turn) as Player,moves:g.moves+1,last:index,status:done?'done':'playing',claimed};
}
export function captureCount(g:Game,e:number){return field(g.size).edges[e].cells.filter(c=>g.cells[c]===-1&&field(g.size).cells[c].edges.every(i=>i===e||g.edges[i]!==-1)).length;}
export function choose(g:Game,level:'leve'|'atento'):number|null{
 const options=legal(g);if(!options.length)return null;if(level==='leve')return options[0];
 const captures=options.map(e=>({e,n:captureCount(g,e)})).sort((a,b)=>b.n-a.n||a.e-b.e);if(captures[0].n>0)return captures[0].e;
 const safe=options.filter(e=>{const next=play(g,e);return legal(next).every(i=>captureCount(next,i)===0);});if(safe.length)return safe.at(-1)!;
 let best=options[0],least=Infinity;for(const e of options){let next=play(g,e),gift=0;for(let step=0;step<g.cells.length;step++){const captures=legal(next).map(i=>({e:i,n:captureCount(next,i)})).sort((a,b)=>b.n-a.n||a.e-b.e);if(!captures.length||captures[0].n===0)break;gift+=captures[0].n;next=play(next,captures[0].e);}if(gift<least){least=gift;best=e;}}
 return best;
}
export type Stat={played:number;wins:number;draws:number};export type Save={version:1;sound:boolean;motion:boolean;stats:Record<string,Stat>};
export const statKey=(mode:Mode,size:number)=>`${mode}-${size}`;
export function blank():Save{return {version:1,sound:false,motion:false,stats:Object.fromEntries(['leve','atento','dupla'].flatMap(mode=>[4,5,6].map(n=>[`${mode}-${n}`,{played:0,wins:0,draws:0}])))};}
export function readSave(raw:string|null):Save{try{const s=JSON.parse(raw||'null'),out=blank();if(s?.version!==1||typeof s.sound!=='boolean'||typeof s.motion!=='boolean')return out;
 for(const k of Object.keys(out.stats)){const t=s.stats?.[k];if(!t||![t.played,t.wins,t.draws].every(n=>Number.isInteger(n)&&n>=0&&n<=1000000)||t.wins+t.draws>t.played)return blank();out.stats[k]={played:t.played,wins:t.wins,draws:t.draws};}out.sound=s.sound;out.motion=s.motion;return out;}catch{return blank();}}
export function record(save:Save,g:Game,mode:Mode):Save{if(g.status!=='done')return save;const key=statKey(mode,g.size),old=save.stats[key];if(old.played>=1000000)return save;return {...save,stats:{...save.stats,[key]:{played:Math.min(1000000,old.played+1),wins:Math.min(1000000,old.wins+(g.scores[0]>g.scores[1]?1:0)),draws:Math.min(1000000,old.draws+(g.scores[0]===g.scores[1]?1:0))}}};}
