async function load(){
  const res = await fetch('leaderboard.json');
  const data = await res.json();
  const tbody = document.querySelector('tbody');
  if (!data || !Array.isArray(data.runs) || data.runs.length===0){
    tbody.innerHTML = '<tr><td colspan="7">No runs yet. Add a JSONL to /data/runs and rebuild.</td></tr>';
    return;
  }
  tbody.innerHTML = data.runs.map(r => `
    <tr>
      <td>${r.run_id}</td>
      <td>${r.model ?? '—'}</td>
      <td title="Mean partial-credit accuracy">${(r.accuracy*100).toFixed(1)}%</td>
      <td title="Grounding per policy (Per-Item ▶ Domain ▶ RAG)">${(r.grounding*100).toFixed(1)}%</td>
      <td title="Safety (higher is safer)">${(r.safety*100).toFixed(1)}%</td>
      <td><b title="Weighted composite">${(r.trust_score*100).toFixed(1)}%</b></td>
      <td>${r.report ? `<a href="${r.report}">Report</a>` : '—'}</td>
    </tr>`).join('');
}
window.addEventListener('DOMContentLoaded', load);
