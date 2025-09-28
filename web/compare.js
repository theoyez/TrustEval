
async function get(u){ return (await fetch(u)).json(); }
const pct=x=> (x*100).toFixed(1)+'%'; const delta=(a,b)=> ((b-a)*100).toFixed(1)+'%';
async function loadOptions(){
  const lb=await get('../leaderboard.json'); const runs=lb.runs||[];
  const L=document.getElementById('left'), R=document.getElementById('right');
  runs.forEach(r=>{
    const o1=document.createElement('option'); o1.value=r.run_id; o1.textContent=r.run_id; L.appendChild(o1);
    const o2=document.createElement('option'); o2.value=r.run_id; o2.textContent=r.run_id; R.appendChild(o2.cloneNode(true));
  });
  if (runs.length>=2){ L.value=runs[0].run_id; R.value=runs[1].run_id; }
  document.getElementById('open').addEventListener('click', ()=>{
    window.open(`../data/reports/${L.value}.html`,'_blank'); window.open(`../data/reports/${R.value}.html`,'_blank');
  });
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
    });
  }
  L.addEventListener('change', render); R.addEventListener('change', render); render();
}
window.addEventListener('DOMContentLoaded', loadOptions);
