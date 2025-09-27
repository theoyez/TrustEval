from pathlib import Path
import json
from evaluator import evaluate_run
import report_builder

Path('data/metrics').mkdir(parents=True, exist_ok=True)
Path('data/reports').mkdir(parents=True, exist_ok=True)
Path('data/proofs').mkdir(parents=True, exist_ok=True)

rows=[]
for rp in Path('data/runs').glob('*.jsonl'):
    run_id, outj = evaluate_run(str(rp))
    Path(f"data/metrics/{run_id}.json").write_text(json.dumps(outj, indent=2))
    Path(f"data/reports/{run_id}.html").write_text(report_builder.render(outj))
    # Read model from manifest if present
    model='unknown'
    man=Path(f"data/runs/{run_id}.manifest.json")
    if man.exists():
        try: model=json.loads(man.read_text()).get('model','unknown')
        except: pass
    rows.append({'run_id':run_id,'model':model,'accuracy':outj['summary']['accuracy'],'grounding':outj['summary']['grounding'],'safety':outj['summary']['safety'],'trust_score':outj['summary']['trust_score'],'report':f"data/reports/{run_id}.html"})
Path('leaderboard.json').write_text(json.dumps({'runs':rows}, indent=2))
