async function main(){
  busy=true;clear();
  await sleep(400);
  await cmd('whoami',30);
  await out('<span class="hi">t474-r0b07</span>');
  gap(true);
  await cmd('cat /etc/identity',20);
  await out(L('creative technologist &nbsp;·&nbsp; systems builder','creative technologist &nbsp;·&nbsp; systems builder'));
  await out('<span class="lo">'+L('comunicación · tecnología · sistemas · IA · audiovisual','communication · technology · systems · AI · audiovisual')+'</span>',true,20);
  gap(true);
  await cmd('ls -la',20);
  await out('<span class="lo">'+L('projects &nbsp; trajectory &nbsp; progress &nbsp; lore &nbsp; hackball &nbsp; audiovisual &nbsp; anti_hype &nbsp; git4dummies &nbsp; contact','projects &nbsp; trajectory &nbsp; progress &nbsp; lore &nbsp; hackball &nbsp; audiovisual &nbsp; anti_hype &nbsp; git4dummies &nbsp; contact')+'</span>',true,30);
  gap();
  busy=false;
  await showOpts([
    {label:'projects',action:screenProjects},
    {label:'trajectory',action:screenTrajectory},
    {label:'progress',action:screenProgress},
    {label:'lore',action:screenLore},
    {label:'hackball',action:screenHackball},
    {label:'audiovisual',action:screenMedia},
    {label:'anti_hype',action:screenAntiHype},
    {label:'git4dummies',action:screenGit4Dummies},
    {label:'contact',action:screenContact},
  ]);
}