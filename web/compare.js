
async function get(u){ const r=await fetch(u); return r.json(); }
const pct=x=> (x*100).toFixed(1)+'%'; const delta=(a,b)=> ((b-a)*100);
function badge(d){ const n=parseFloat(d); const sign = n>0?'+':''; const cls = n>0?'good':(n<0?'bad':'dim'); return `<span class="badge ${cls}">${sign}${n.toFixed(1)}%</span>`; }
async function init(){
  const lb=await get('../leaderboard.json'); const runs=lb.runs||[];
  const L=document.getElementById('left'), R=document.getElementById('right');
  runs.forEach(r=>{ const o=document.createElement('option'); o.value=r.run_id; o.textContent=r.run_id; L.appendChild(o); });
  runs.forEach(r=>{ const o=document.createElement('option'); o.value=r.run_id; o.textContent=r.run_id; R.appendChild(o); });
  if (runs.length>=2){ L.value=runs[0].run_id; R.value=runs[1].run_id; }
  const p=new URL(location).searchParams; if (p.get('left')) L.value=p.get('left'); if (p.get('right')) R.value=p.get('right');
  function render(){
    Promise.all([get(`../data/metrics/${L.value}.json`), get(`../data/metrics/${R.value}.json`)]).then(([l,r])=>{
      const dA = delta(l.summary.accuracy,r.summary.accuracy);
      const dG = delta(l.summary.grounding,r.summary.grounding);
      const dS = delta(l.summary.safety,r.summary.safety);
      const dT = delta(l.summary.trust_score,r.summary.trust_score);
      document.getElementById('cmp').innerHTML=`
        <div class="cards">
          <div class="card">Left <b>${l.run_id}</b></div>
          <div class="card">Right <b>${r.run_id}</b></div>
        </div>
        <table class="table zebra">
          <thead><tr><th>Metric</th><th>${l.run_id}</th><th>${r.run_id}</th><th>Δ (right−left)</th></tr></thead>
          <tbody>
            <tr><td>Accuracy</td><td class="right">${pct(l.summary.accuracy)}</td><td class="right">${pct(r.summary.accuracy)}</td><td>${badge(dT*0 + (r.summary.accuracy - l.summary.accuracy)*100)}</td></tr>
            <tr><td>Grounding</td><td class="right">${pct(l.summary.grounding)}</td><td class="right">${pct(r.summary.grounding)}</td><td>${badge((r.summary.grounding - l.summary.grounding)*100)}</td></tr>
            <tr><td>Safety</td><td class="right">${pct(l.summary.safety)}</td><td class="right">${pct(r.summary.safety)}</td><td>${badge((r.summary.safety - l.summary.safety)*100)}</td></tr>
            <tr><td><b>Trust</b></td><td class="right"><b>${pct(l.summary.trust_score)}</b></td><td class="right"><b>${pct(r.summary.trust_score)}</b></td><td>${badge((r.summary.trust_score - l.summary.trust_score)*100)}</td></tr>
          </tbody>
        </table>`;
    }).catch(()=>{ document.getElementById('cmp').textContent='Unable to load metrics.'; });
  }
  L.addEventListener('change', render); R.addEventListener('change', render);
  document.getElementById('open').addEventListener('click', ()=>{
    window.open(`../data/reports/${L.value}.html`,'_blank'); window.open(`../data/reports/${R.value}.html`,'_blank');
  });
  render();
}
window.addEventListener('DOMContentLoaded', init);
