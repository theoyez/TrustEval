
async function get(u){ const r=await fetch(u); return r.json(); }
const pct=x=> (x*100).toFixed(1)+'%'; const delta=(a,b)=> ((b-a)*100).toFixed(1)+'%';
async function init(){
  const lb=await get('../leaderboard.json'); const runs=lb.runs||[];
  const L=document.getElementById('left'), R=document.getElementById('right');
  runs.forEach(r=>{
    const o=document.createElement('option'); o.value=r.run_id; o.textContent=r.run_id; L.appendChild(o);
    const o2=o.cloneNode(true); R.appendChild(o2);
  });
  // Preselect newest two (assuming leaderboard.json ordered newest first)
  if (runs.length>=2){ L.value=runs[0].run_id; R.value=runs[1].run_id; }
  // Respect URL params if provided
  const p=new URL(location).searchParams;
  if (p.get('left')) L.value=p.get('left');
  if (p.get('right')) R.value=p.get('right');
  function render(){
    Promise.all([get(`../data/metrics/${L.value}.json`), get(`../data/metrics/${R.value}.json`)]).then(([l,r])=>{
      document.getElementById('cmp').innerHTML=`
        <div class="cards">
          <div class="card">Left <b>${l.run_id}</b></div>
          <div class="card">Right <b>${r.run_id}</b></div>
        </div>
        <table class="table zebra">
          <thead><tr><th>Metric</th><th>${l.run_id}</th><th>${r.run_id}</th><th>Δ (right-left)</th></tr></thead>
          <tbody>
            <tr><td>Accuracy</td><td class="right">${pct(l.summary.accuracy)}</td><td class="right">${pct(r.summary.accuracy)}</td><td class="right">${delta(l.summary.accuracy,r.summary.accuracy)}</td></tr>
            <tr><td>Grounding</td><td class="right">${pct(l.summary.grounding)}</td><td class="right">${pct(r.summary.grounding)}</td><td class="right">${delta(l.summary.grounding,r.summary.grounding)}</td></tr>
            <tr><td>Safety</td><td class="right">${pct(l.summary.safety)}</td><td class="right">${pct(r.summary.safety)}</td><td class="right">${delta(l.summary.safety,r.summary.safety)}</td></tr>
            <tr><td><b>Trust</b></td><td class="right"><b>${pct(l.summary.trust_score)}</b></td><td class="right"><b>${pct(r.summary.trust_score)}</b></td><td class="right"><b>${delta(l.summary.trust_score,r.summary.trust_score)}</b></td></tr>
          </tbody>
        </table>`;
    }).catch(e=>{ document.getElementById('cmp').textContent='Unable to load metrics.'; console.error(e); });
  }
  L.addEventListener('change', render); R.addEventListener('change', render);
  document.getElementById('open').addEventListener('click', ()=>{
    window.open(`../data/reports/${L.value}.html`,'_blank'); window.open(`../data/reports/${R.value}.html`,'_blank');
  });
  render();
}
window.addEventListener('DOMContentLoaded', init);
