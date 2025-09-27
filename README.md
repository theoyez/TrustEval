TrustEval (theoyez.org)

TrustEval is a static, auditable evaluation framework for AI research systems. It is designed for transparency, reproducibility, and ease of deployment.

✨ Features

Accuracy: partial credit scoring (exact, token overlap with synonyms, regex, Levenshtein).

Grounding: hybrid policy — per-item source keys → domain allowlist → RAG consistency gate.

Safety: regex packs for PII, toxicity, and policy violations, with bounded penalties.

Provenance: local snapshots + Merkle roots for strict sources.

Explainability: per-run reports with “Why?” traces, tooltips, breadcrumbs, and a “How it works” page.

Compare view: side-by-side run comparison with Δ metrics.

Zero dependencies: no servers, no private data required — just static files.

🚀 Getting Started

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

License

Released under the MIT License (see LICENSE).

LICENSE (copy/paste this exact text)

MIT License

Copyright (c) 2025 The Oyez Research Group

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
