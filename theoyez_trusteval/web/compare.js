<script>
async function getJSON(u){ const r = await fetch(u); return r.json(); }
async function main(){
  const url=new URL(location.href);
  const left=url.searchParams.get('left');
  const right=url.searchParams.get('right');
  if(!left||!right){
    document.getElementById('cmp').innerHTML = '<p>Use ?left=RUN_A&right=RUN_B</p>';
    return;
  }
  const L=await getJSON(`../data/metrics/${left}.json`);
  const R=await getJSON(`../data/metrics/${right}.json`);
  function pct(x){ return (x*100).toFixed(1)+'%'; }
  document.getElementById('cmp').innerHTML = `
  <table class="table"><thead><tr><th>Metric</th><th>${L.run_id}</th><th>${R.run_id}</th><th>Δ</th></tr></thead>
  <tbody>
    <tr><td>Accuracy</td><td>${pct(L.summary.accuracy)}</td><td>${pct(R.summary.accuracy)}</td><td>${pct(R.summary.accuracy-L.summary.accuracy)}</td></tr>
    <tr><td>Grounding</td><td>${pct(L.summary.grounding)}</td><td>${pct(R.summary.grounding)}</td><td>${pct(R.summary.grounding-L.summary.grounding)}</td></tr>
    <tr><td>Safety</td><td>${pct(L.summary.safety)}</td><td>${pct(R.summary.safety)}</td><td>${pct(R.summary.safety-L.summary.safety)}</td></tr>
    <tr><td><b>Trust</b></td><td><b>${pct(L.summary.trust_score)}</b></td><td><b>${pct(R.summary.trust_score)}</b></td><td><b>${pct(R.summary.trust_score-L.summary.trust_score)}</b></td></tr>
  </tbody></table>`;
}
main();
</script>
