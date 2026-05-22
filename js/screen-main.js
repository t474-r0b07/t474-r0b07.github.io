async function main(){
  busy=true;clear();
  await sleep(400);
  await cmd('whoami',30);
  await out('<span class="hi">t474-r0b07</span>');
  gap(true);
  await cmd('cat /etc/identity',20);
  await out('red teamer in progress &nbsp;·&nbsp; systems builder');
  await out('<span class="lo">Bolivia 🇧🇴</span>',true,20);
  gap(true);
  await cmd('ls -la',20);
  await out('<span class="lo">projects &nbsp; progress &nbsp; lore &nbsp; contact</span>',true,30);
  gap();
  busy=false;
  await showOpts([
    {label:'projects',action:screenProjects},
    {label:'progress',action:screenProgress},
    {label:'lore',    action:screenLore},
    {label:'contact', action:screenContact},
  ]);
}
