'use strict';
const $ = (s) => document.querySelector(s);
const pages = {
  components: { title: '组件', render: () => `<div class="jb-content"><h1>常用组件</h1><p class="jb-muted">用于列表、表单和多面板应用的基础控件。</p><div class="jb-grid"><section><h3>操作</h3><div class="jb-stack"><button class="jb-button jb-primary" data-action="save">保存</button><button class="jb-button" data-action="reset">重置</button><button class="jb-button" disabled>发布</button></div><h3>输入与选择</h3><label class="jb-field">项目名称：<input class="jb-input" id="project-name" value="workspace-ui"></label><label class="jb-field">环境：<select class="jb-select"><option>开发环境</option><option>生产环境</option></select></label><label class="jb-stack"><input type="checkbox" checked>自动保存</label><h3>字段错误</h3><label class="jb-field">服务地址：<input class="jb-input" aria-invalid="true" aria-describedby="endpoint-error" value="https://"><span id="endpoint-error" class="jb-error">请输入完整的服务地址。</span></label><h3>只读</h3><label class="jb-field">项目标识：<input class="jb-input" readonly value="workspace-01"></label></section><section><h3>反馈</h3><p class="jb-banner">配置已更新。</p><p class="jb-banner" data-kind="warning">当前有未保存的修改。</p><p class="jb-banner" data-kind="error">无法连接服务，请检查地址后重试。</p><h3>资源列表</h3><table class="jb-table"><thead><tr><th>名称</th><th>状态</th></tr></thead><tbody><tr><td>应用主题</td><td>已启用</td></tr><tr><td>图标资源</td><td>待导入</td></tr><tr><td>快捷键</td><td>已启用</td></tr></tbody></table><h3>代码</h3><pre class="jb-code"><code>const theme = {
  appearance: 'islands',
  followSystem: true,
};</code></pre></section></div></div>` },
  colors: { title: '主题颜色', render: () => { const roles = ['window','editor','text','muted','accent','link','selection','border']; return `<div class="jb-content"><h1>主题颜色</h1><p class="jb-muted">颜色随当前外观切换。</p><table class="jb-table"><thead><tr><th>语义</th><th>当前值</th></tr></thead><tbody>${roles.map(role => `<tr><td><span class="jb-swatch" style="background:var(--jb-${role})"></span>${role}</td><td><code>${getComputedStyle(document.documentElement).getPropertyValue('--jb-'+role).trim()}</code></td></tr>`).join('')}</tbody></table></div>`; } },
  empty: { title: '空状态', render: () => '<div class="jb-empty"><h1>尚未添加资源</h1><p class="jb-muted">添加首个资源以开始整理工作区。</p><button class="jb-button jb-primary" data-action="add">添加资源</button></div>' }
};
let opened = ['components','colors'], active = 'components';
let settings = { name: '设计工作台', compact: false };
let savedConfig = { name: 'workspace-ui', environment: '开发环境', autoSave: true };
const status = (text) => { $('#status').textContent = text; };
function setTheme(value) {
  if (value === 'system') delete document.documentElement.dataset.jbTheme;
  else document.documentElement.dataset.jbTheme = value;
  try { localStorage.setItem('jb-gallery-theme', value); } catch (_) { /* Storage may be unavailable in local-file mode. */ }
  if (active === 'colors') renderView();
}
try { const saved = localStorage.getItem('jb-gallery-theme'); if (['light','dark','system'].includes(saved)) $('#theme').value = saved; } catch (_) {}
setTheme($('#theme').value);
$('#theme').addEventListener('change', event => setTheme(event.target.value));
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if ($('#theme').value === 'system' && active === 'colors') renderView(); });
function filesMarkup() { return `<details open><summary>工作区</summary><ul>${Object.entries(pages).map(([id,p]) => `<li><button class="jb-file" data-page="${id}" aria-current="${active===id}"><svg aria-hidden="true"><use href="#i-code"/></svg>${p.title}</button></li>`).join('')}</ul></details>`; }
function renderFiles() { for (const id of ['desktop-files','mobile-files']) $('#'+id).innerHTML = filesMarkup(); }
function renderView() {
  $('#view').innerHTML = active ? pages[active].render() : '<div class="jb-empty"><h1>选择一个页面</h1><p class="jb-muted">从资源面板打开组件、颜色或空状态。</p><button class="jb-button" data-action="open-components">打开组件</button></div>';
  if (active) { $('#view').setAttribute('aria-labelledby','tab-'+active); $('#view').removeAttribute('aria-label'); } else { $('#view').removeAttribute('aria-labelledby'); $('#view').setAttribute('aria-label','工作区'); }
  if (active === 'components') {
    $('#project-name').value = savedConfig.name;
    $('#view select').value = savedConfig.environment;
    $('#view input[type=checkbox]').checked = savedConfig.autoSave;
  }
}
function render(focus=false) {
  $('#tabs').innerHTML = opened.map(id => `<div class="jb-tab-wrap"><button class="jb-tab" id="tab-${id}" role="tab" aria-controls="view" aria-selected="${id===active}" tabindex="${id===active?0:-1}" data-page="${id}">${pages[id].title}</button><button class="jb-icon-button jb-close" data-close="${id}" aria-label="关闭${pages[id].title}"><svg aria-hidden="true"><use href="#i-close"/></svg></button></div>`).join('');
  renderFiles(); renderView();
  if (focus && active) $('#tab-'+active).focus(); else if (focus) $('#view').focus();
}
function openPage(id, focus=true) { if (!opened.includes(id)) opened.push(id); active=id; render(focus); }
$('#tabs').addEventListener('click', event => {
  const close = event.target.closest('[data-close]');
  if (close) { const id=close.dataset.close,index=opened.indexOf(id); opened=opened.filter(x=>x!==id); if(active===id) active=opened[Math.min(index,opened.length-1)]||null; render(true); return; }
  const tab=event.target.closest('[role=tab]'); if(tab) openPage(tab.dataset.page);
});
$('#tabs').addEventListener('keydown', event => {
  const tab=event.target.closest('[role=tab]'); if(!tab) return;
  let index=opened.indexOf(tab.dataset.page);
  if(event.key==='ArrowRight') index=(index+1)%opened.length;
  else if(event.key==='ArrowLeft') index=(index-1+opened.length)%opened.length;
  else if(event.key==='Home') index=0; else if(event.key==='End') index=opened.length-1; else return;
  event.preventDefault(); openPage(opened[index]);
});
for(const id of ['desktop-files','mobile-files']) $('#'+id).addEventListener('click', event => { const button=event.target.closest('[data-page]'); if(button){ if($('#resources').open) $('#resources').close(); openPage(button.dataset.page); } });
$('#components-button').onclick=()=>openPage('components');
$('#resources-button').onclick=()=>{ const hidden=$('#sidebar').hidden=!$('#sidebar').hidden; $('#resources-button').setAttribute('aria-pressed',String(!hidden)); $('.jb-workspace').style.gridTemplateColumns=hidden?'var(--jb-rail-width) minmax(0,1fr)':''; };
matchMedia('(max-width:760px)').addEventListener('change',()=>{ $('.jb-workspace').style.gridTemplateColumns=''; $('#sidebar').hidden=false; $('#resources-button').setAttribute('aria-pressed','true'); });
$('#open-resources').onclick=()=>$('#resources').showModal(); $('#close-resources').onclick=()=>$('#resources').close();
$('#settings-button').onclick=()=>{ $('#workspace-name').value=settings.name; $('#compact').checked=settings.compact; $('#name-error').hidden=true; $('#workspace-name').removeAttribute('aria-invalid'); $('#settings').showModal(); };
$('#cancel-settings').onclick=()=>$('#settings').close();
$('#settings-form').addEventListener('submit', event=>{ event.preventDefault(); const name=$('#workspace-name').value.trim(); if(!name){ $('#name-error').hidden=false; $('#workspace-name').setAttribute('aria-invalid','true'); $('#workspace-name').focus(); return; } settings={name,compact:$('#compact').checked}; $('.jb-toolbar strong').textContent=name; if(settings.compact) document.documentElement.dataset.jbDensity='compact'; else delete document.documentElement.dataset.jbDensity; $('#settings').close(); status('工作区设置已应用'); });
$('#view').addEventListener('click',event=>{ const action=event.target.closest('[data-action]')?.dataset.action; if(action==='save') { savedConfig = { name: $('#project-name').value, environment: $('#view select').value, autoSave: $('#view input[type=checkbox]').checked }; status('示例配置已保存在当前会话中'); } if(action==='reset'){ $('#project-name').value='workspace-ui';status('已重置项目名称'); } if(action==='add') { $('#view').innerHTML='<div class="jb-content"><h1>资源</h1><p class="jb-banner">已添加示例资源。</p></div>';status('已添加示例资源'); } if(action==='open-components') openPage('components'); });
render();
