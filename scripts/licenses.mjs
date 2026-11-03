import {readFileSync,writeFileSync} from 'node:fs';
const pkg=JSON.parse(readFileSync('node_modules/preact/package.json','utf8'));
writeFileSync('public/third-party.txt',('Arremate - third-party notices\n\nPreact '+pkg.version+'\n'+readFileSync('node_modules/preact/LICENSE','utf8')).replace(/\r\n/g,'\n').trimEnd()+'\n');
