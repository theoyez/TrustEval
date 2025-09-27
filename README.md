TrustEval (theoyez.org)

TrustEval is a static, auditable evaluation framework for AI research systems. It is designed for transparency, reproducibility, and ease of deployment.

Features

Accuracy: partial credit scoring (exact, token overlap with synonyms, regex, Levenshtein).

Grounding: hybrid policy — per-item source keys → domain allowlist → RAG consistency gate.

Safety: regex packs for PII, toxicity, and policy violations, with bounded penalties.

Provenance: local snapshots + Merkle roots for strict sources.

Explainability: per-run reports with “Why?” traces, tooltips, breadcrumbs, and a “How it works” page.

Compare view: side-by-side run comparison with Δ metrics.

Zero dependencies: no servers, no private data required — just static files.

Getting Started

View online
After enabling GitHub Pages, open your site at:
https://<your-org>.github.io/trusteval/

Add new runs

Place JSONL files under /data/runs/ (see sample run).

Run python3 scripts/build.py locally to regenerate metrics/reports/leaderboard.

Commit the updated /data/metrics, /data/reports, /data/proofs, and leaderboard.json.

Static hosting

Works directly on GitHub Pages.

No backend required.

📂 Repo Structure

index.html # leaderboard entry point
/web/ # styles, JS, report templates
/config/ # metrics weights, synonyms, domains
/data/ # datasets, sources, runs, reports, metrics, proofs
/scripts/ # evaluator, build, report builder
/prov/ # Merkle hashing

📖 More Info

See the How it works
 page for details on scoring, grounding, and provenance.
