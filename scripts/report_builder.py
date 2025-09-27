import json, html
from pathlib import Path
def render(run):
    tpl = Path('web/report_template.html').read_text()
    return tpl.replace('{{DATA_JSON}}', html.escape(json.dumps(run)))
if __name__=='__main__':
    Path('data/reports').mkdir(parents=True, exist_ok=True)
    for p in Path('data/metrics').glob('*.json'):
        run=json.loads(p.read_text())
        Path(f"data/reports/{run['run_id']}.html").write_text(render(run))
