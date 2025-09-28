
let runs=[], sortKey=null, sortAsc=true; const pct=x=> (x*100).toFixed(1)+'%';
function setAria(key){
  const map={'run_id':'th-run','model':'th-model','accuracy':'th-acc','grounding':'th-gnd','safety':'th-safe','trust_score':'th-trust'};
  document.querySelectorAll('.sortable').forEach(th=> th.setAttribute('aria-sort','none'));
  const th=document.getElementById(map[key]); if (th) th.setAttribute('aria-sort', sortAsc ? 'ascending' : 'descending');
}
function auditBadge(r){
  const a=r.audit||{}; const cls=a.status==='ok'?'good':(a.status==='warn'?'warn':'dim');
  const emoji=a.status==='ok'?'✅':(a.status==='warn'?'⚠️':'◻︎');
  const lines=[`Cited: ${a.cited?.join(', ')||'—'}`, `Retrieved: ${a.topk?.map(x=>x.key).join(', ')||'—'}`, `Consistency: ${a.consistency??'—'}`];
  return `<span class="badge ${cls}" title="${lines.join('\n')}">${emoji} ${a.status||'—'}</span>`;
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
      <td>${auditBadge(r)}</td>
      <td>${r.report?`<a aria-label="View report for ${r.run_id}" href="${r.report}">Report</a>`:'—'}</td>
    </tr>`).join('');
}
function applySort(key){
  if (sortKey===key) sortAsc=!sortAsc; else { sortKey=key; sortAsc=true; }
  runs.sort((a,b)=>{
    const av=a[key], bv=b[key];
    if (typeof av==='number' && typeof bv==='number') return sortAsc? av-bv : bv-av;
    return sortAsc? String(av||'').localeCompare(String(bv||'')) : String(bv||'').localeCompare(String(av||''));
  });
  document.querySelectorAll('.sortable').forEach(th=>th.classList.remove('active'));
  const idMap={'run_id':'th-run','model':'th-model','accuracy':'th-acc','grounding':'th-gnd','safety':'th-safe','trust_score':'th-trust'};
  const th=document.getElementById(idMap[key]); if (th) th.classList.add('active');
  setAria(key); render();
}
async function load(){
  try{
    const res=await fetch('leaderboard.json'); const data=await res.json();
    runs=(data.runs||[]).slice();
    document.getElementById('lastUpdated').textContent=data.updated_at||'—';
    render();
  }catch(e){ console.error(e); }
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
