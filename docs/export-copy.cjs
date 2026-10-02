const fs=require('fs');const ts=require('typescript');
function read(file){const m={exports:{}};new Function('exports','module',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(m.exports,m);return m.exports;}
const shared=read('src/lib/content.ts');const {serviceStories}=read('src/lib/stories.ts');const {oneSpaceOverview,oneSpacePages,erpModules,industryWorkflows}=read('src/lib/onespace.ts');
let out='# Nest website — complete editorial copy\n\nPrepared 2 October 2026. Implemented in the local redesign. Sources and commercial validation notes are in CONTENT-RESEARCH.md.\n\n';
out+='## Homepage\n\n### '+shared.hero.headline.join(' ')+'\n\n'+shared.hero.body+'\n\nPrimary action: '+shared.hero.primary.label+'\n\nSecondary action: '+shared.hero.secondary.label+'\n\n';
out+='### Your business has a rhythm. Your technology should keep up.\n\nAn enquiry becomes a conversation. A conversation becomes an order. An order becomes work for several teams. We help connect those moments, so the experience outside your business matches the work happening inside it.\n\n';
out+='### '+shared.methodology.heading+'\n\n'+shared.methodology.body+'\n\n'+shared.methodology.steps.map(s=>'#### '+s.number+' / '+s.title+'\n\n'+s.desc+'\n\n'+s.chips.join(' · ')).join('\n\n')+'\n\n';
for(const b of shared.ecosystem.brands)out+='### '+b.name+' / '+b.title+'\n\n'+b.desc+'\n\n';
out+='### '+shared.services.heading+'\n\n'+shared.services.body+'\n\n'+shared.services.items.map(x=>'#### '+x.title+'\n\n'+x.desc).join('\n\n')+'\n\n';
out+='### '+shared.advantage.heading+'\n\n'+shared.advantage.body+'\n\n';
function questions(faq){return '### Questions and answers\n\n'+faq.map(f=>'#### '+f.question+'\n\n'+f.answer).join('\n\n')+'\n\n';}
out+='## OneSpace overview /onespace\n\n### '+oneSpaceOverview.title+'\n\n'+oneSpaceOverview.intro+'\n\n### '+oneSpaceOverview.opening.title+'\n\n'+oneSpaceOverview.opening.body+'\n\n';
out+='### From a promise to a complete picture\n\n'+oneSpaceOverview.journey.map(x=>'#### '+x.title+'\n\n'+x.desc).join('\n\n')+'\n\n';
out+='### What needs to change first?\n\n'+oneSpaceOverview.paths.map(x=>'#### '+x.title+'\n\n'+x.desc+'\n\nAction: '+x.label).join('\n\n')+'\n\n'+questions(oneSpaceOverview.faq);
for(const s of [...oneSpacePages,...serviceStories]){
out+='## '+s.eyebrow+'\n\n### '+s.title+'\n\n'+s.intro+'\n\n### '+s.opening.title+'\n\n'+s.opening.body+'\n\n';
if(s.slug==='erpnext')out+=erpModules.map(x=>'### '+x.title+'\n\n'+x.desc+'\n\n').join('');
if(s.slug==='industries')out+=industryWorkflows.map(x=>'### '+x.title+'\n\n'+x.desc+'\n\n'+x.points.map(p=>'- '+p).join('\n')+'\n\n').join('');
for(const ch of s.chapters)out+='### '+ch.title+'\n\n'+ch.body+'\n\n'+ch.points.map(p=>'- '+p).join('\n')+'\n\n';
out+='### Better work, in practical terms\n\n'+s.outcomes.map(x=>'- '+x).join('\n')+'\n\n'+questions(s.faq)+'Action: '+s.cta+'\n\n';}
out+='## About Nest\n\n### '+shared.about.heading+'\n\n'+shared.about.intro+'\n\n### '+shared.about.mission.title+'\n\n'+shared.about.mission.body+'\n\n### '+shared.about.vision.title+'\n\n'+shared.about.vision.body+'\n\n';
out+='## Shared enquiry\n\n### Start with what needs to work better.\n\nTell us where things stand, what is getting in the way, and what you want to achieve. We can shape the next step from there.\n\nEmail: '+shared.site.email+'\n\nPhone: '+shared.site.phone+'\n\nHomepage form action: Open email draft. This opens your email app. Review and send your message there.\n';
fs.writeFileSync('docs/WEBSITE-COPY.md',out);
