
let runs=[], sortKey=null, sortAsc=true; const pct=x=> (x*100).toFixed(1)+'%';
function setAria(key){
  const map={'run_id':'th-run','model':'th-model','accuracy':'th-acc','grounding':'th-gnd','safety':'th-safe','trust_score':'th-trust'};
  document.querySelectorAll('.sortable').forEach(th=> th.setAttribute('aria-sort','none'));
  const th=document.getElementById(map[key]); if (th) th.setAttribute('aria-sort', sortAsc ? 'ascending' : 'descending');
}
function rowDrawer(r){
  const a=r.audit||{};
  const topk = (a.topk||[]).map(x=>`<li><span class='code'>${(x.key||'').replace(/</g,'&lt;')}</span></li>`).join('') || '<li>—</li>';
  const cited = (a.cited||[]).map(x=>`<li><span class='code'>${x.replace(/</g,'&lt;')}</span></li>`).join('') || '<li>—</li>';
  const consistency = a.consistency || '—';
  return `<div class="drawer" id="drawer_${r.run_id}">
    <div class="small"><b>Retrieved top-k</b></div><ul>${topk}</ul>
    <div class="small"><b>Cited</b></div><ul>${cited}</ul>
    <div class="small"><b>Consistency</b>: ${consistency}</div>
  </div>`;
}
function auditCell(r){
  const a=r.audit||{}; const cls=a.status==='ok'?'good':(a.status==='warn'?'warn':'dim'); const emoji=a.status==='ok'?'✅':(a.status==='warn'?'⚠️':'◻︎');
  return `<span class="chev" data-run="${r.run_id}">▸ <span class="badge ${cls}">${emoji} ${a.status||'—'}</span></span>`;
}
function render(){
  const q=(document.getElementById('filter')?.value||'').toLowerCase();
  const view=runs.filter(r=> !q || JSON.stringify(r).toLowerCase().includes(q));
  const tbody=document.querySelector('tbody');
  tbody.innerHTML=view.map(r=>`
    <tr class="row">
      <td>${r.run_id}</td><td>${r.model??'—'}</td>
      <td class="right">${pct(r.accuracy)}</td>
      <td class="right">${pct(r.grounding)}</td>
      <td class="right">${pct(r.safety)}</td>
      <td class="right"><b>${pct(r.trust_score)}</b></td>
      <td>${auditCell(r)}</td>
      <td>${r.report?`<a aria-label="View report for ${r.run_id}" href="${r.report}">Report</a>`:'—'}</td>
    </tr>
    <tr><td colspan="8">${rowDrawer(r)}</td></tr>`).join('');
  document.querySelectorAll('.chev').forEach(el=>{
    el.addEventListener('click', ()=>{
      const id=el.getAttribute('data-run'); const dr=document.getElementById('drawer_'+id);
      const open=dr.classList.toggle('open'); el.firstChild.textContent = open ? '▾' : '▸';
    });
  });
}
function applySort(key){
  if (sortKey===key) sortAsc=!sortAsc; else { sortKey=key; sortAsc=true; }
  runs.sort((a,b)=>{
    const av=a[key], bv=b[key];
    if (typeof av==='number' && typeof bv==='number') return sortAsc? av-bv : bv-av;
    return sortAsc? String(av||'').localeCompare(String(bv||'')) : String(bv||'').localeCompare(String(av||''));
  });
  setAria(key); render();
}
async function load(){
  const res=await fetch('leaderboard.json'); const data=await res.json();
  runs=(data.runs||[]).slice(); document.getElementById('lastUpdated').textContent=data.updated_at||'—';
  render();
  const map={'th-run':'run_id','th-model':'model','th-acc':'accuracy','th-gnd':'grounding','th-safe':'safety','th-trust':'trust_score'};
  Object.entries(map).forEach(([id,key])=>{
    const th=document.getElementById(id); if (th){
      th.addEventListener('click',()=>applySort(key));
      th.tabIndex=0; th.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); applySort(key); } });
    }
  });
  const f=document.getElementById('filter'); if (f) f.addEventListener('input', render);
}
window.addEventListener('DOMContentLoaded', load);
