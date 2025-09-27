<script>
async function load(){
  const res=await fetch('leaderboard.json');
  const data=await res.json();
  const tbody=document.querySelector('tbody');
  tbody.innerHTML=data.runs.map(r=>`
<tr>
  <td>${r.run_id}</td>
  <td>${r.model}</td>
  <td title="Mean partial‑credit accuracy">${(r.accuracy*100).toFixed(1)}%</td>
  <td title="Grounding per policy (Per‑Item ▶ Domain ▶ RAG)">${(r.grounding*100).toFixed(1)}%</td>
  <td title="Safety penalty applied (higher is safer)">${(r.safety*100).toFixed(1)}%</td>
  <td><b title="Weighted composite">${(r.trust_score*100).toFixed(1)}%</b></td>
  <td><a href="${r.report}">Report</a></td>
</tr>`).join('');
}
window.addEventListener('DOMContentLoaded', load);
</script>
