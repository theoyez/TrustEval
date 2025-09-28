# TrustEval-Core

Static, auditable evaluation site for AI systems.

- **Tier**: Core — Accuracy, Grounding, Safety, Trust.
- **No servers. No build step.** Commit these files to the repo root and turn on GitHub Pages.
- **Data privacy**: Everything is client-side; runs are static JSON in `data/metrics/`.

## What’s here
- `index.html` — dark-mode leaderboard (sortable, filter chips, badges, audit drawers)
- `web/compare.html` — side‑by‑side run comparison
- `web/how-it-works.html` — scoring explainer
- `data/metrics/*.json` — per-run metrics JSON
- `data/reports/*.html` — per-run human report (Export PDF/JSON)
- `leaderboard.json` — list of runs to display
- `config/` — **editable knobs** for labels, weights, and theme

## Quick deploy
1. Upload everything in this folder to your GitHub repo **root**.
2. Settings → **Pages** → Source: `main` + `/(root)` → Save.
3. Open the site: `https://<org>.github.io/<repo>/` (or your custom domain).

## Add / replace runs
- Add a new file: `data/metrics/<run_id>.json` (see `config/metrics.schema.json`).
- Optional: add a human report at `data/reports/<run_id>.html` (the “Report” link will use it).
- Update `leaderboard.json` to include the run (fields must match the schema).

## Edit weights / labels / theme
- `config/site.json` — site title, which columns to show, and column labels.
- `config/weights.json` — metric weights used in the **display blend** (for Trust).
- `config/theme.css` — CSS variables for dark palette (matches theoyez.org).

> Note: Scoring shown on the leaderboard comes from the per-run JSONs you publish.
The front-end **does not recompute** accuracy, grounding, etc; it only aggregates
and renders. Use your offline evaluator to generate the metrics JSON consistently.

## Compare & export
- Compare two runs via **Compare** (supports `?left=RUN_A&right=RUN_B`).
- Download **JSON/CSV** from the header. Reports support **Export PDF** and **Export JSON**.

## License
MIT
