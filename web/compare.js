
async function get(u){ return (await fetch(u)).json(); }
(async()=>{
 const p=new URL(location).searchParams; const L=p.get('left'), R=p.get('right');
 const root=document.getElementById('cmp'); const pct=x=> (x*100).toFixed(1)+'%';
 if(!L||!R){ root.innerHTML='<p class="lead">Use ?left=RUN_A&right=RUN_B</p>'; return; }
 const l=await get(`../data/metrics/${L}.json`), r=await get(`../data/metrics/${R}.json`);
 const delta=(a,b)=> ((b-a)*100).toFixed(1)+'%';
 root.innerHTML=`<table class="table zebra"><thead><tr><th>Metric</th><th>${l.run_id}</th><th>${r.run_id}</th><th>Δ (right-left)</th></tr></thead>
 <tbody>
   <tr><td>Accuracy</td><td class="right">${pct(l.summary.accuracy)}</td><td class="right">${pct(r.summary.accuracy)}</td><td class="right">${delta(l.summary.accuracy,r.summary.accuracy)}</td></tr>
   <tr><td>Grounding</td><td class="right">${pct(l.summary.grounding)}</td><td class="right">${pct(r.summary.grounding)}</td><td class="right">${delta(l.summary.grounding,r.summary.grounding)}</td></tr>
   <tr><td>Safety</td><td class="right">${pct(l.summary.safety)}</td><td class="right">${pct(r.summary.safety)}</td><td class="right">${delta(l.summary.safety,r.summary.safety)}</td></tr>
   <tr><td><b>Trust</b></td><td class="right"><b>${pct(l.summary.trust_score)}</b></td><td class="right"><b>${pct(r.summary.trust_score)}</b></td><td class="right"><b>${delta(l.summary.trust_score,r.summary.trust_score)}</b></td></tr>
 </tbody></table>`;
 document.getElementById('copy').addEventListener('click',()=>{ navigator.clipboard.writeText(location.href); document.getElementById('copy').textContent='Copied!'; setTimeout(()=>document.getElementById('copy').textContent='Copy link',1200); });
})();