# Omega V1 (LongMemEval-S) score update — website handoff

For the agent updating `omega-site`. Everything here traces to a judged file;
`scores.json` is the machine-readable version, `SOURCE_STATE_OF_PLAY.md` is the
canonical project doc these numbers come from (its "what I got wrong" section
is deliberate — read it before improvising any copy).

## What to change

The site currently shows **69.2%**, which is the 2026-07-07 run. It has been
superseded by two judged results on the same benchmark, same official
evaluator, same pinned judge (`openai/gpt-4o-2024-08-06`):

| show | value | context line |
| --- | --- | --- |
| Headline | **86.4%** (432/500) | with a large answer model (mistral-large) |
| The differentiator | **up to 78%** (76.7% mean of 3 trials) | with a **local 4B** in an 8 GB RAM budget |
| Progression | 51.8% → 69.2% → 78% | local-4B arm across July 2026 |

The strongest true sentence for copy: **on identical frozen retrieval
evidence, the local 4B scores within ~8 points of mistral-large (78.0% vs
86.4%)** — the memory system carries the score, and the answer model becomes
nearly swappable. That comparison is exact: both arms replay the same
persisted evidence (identical `evidence_sha256`), so the gap isolates the
answer model and nothing else.

## Where the 69.2% currently appears (verified 2026-08-05)

- `src/sections/Benchmarks.tsx:31` — section heading "LongMemEval-S: 69.2%"
- `src/sections/Benchmarks.tsx:40` — big stat tile
- `src/sections/Benchmarks.tsx:47` — progression caption "51.8% → 69.2%"
- `src/sections/Benchmarks.tsx:87` — comparison-table row
- `src/sections/About.tsx:39` — prose: "…scoring 69.2% on the…"

Line numbers are as of 2026-08-05; re-grep for `69.2` before editing.

## Honesty constraints (do not soften these)

1. **86.4% is the official headline** — full 500, official `evaluate_qa.py`,
   pinned gpt-4o judge. Safe to state plainly.
2. **The 4B number**: 78.0% is a single judged replay; the 3-trial mean is
   76.7%. Show "up to 78%" or "76.7% (mean of 3 trials)" — a bare "78%"
   presented as stable overstates run-to-run variance.
3. Do NOT use 82.6% (a negative experiment arm) or any n<500 gate result
   (e.g. "20/20 blind") as a score. Project rule: official scores come from
   the full 500 only.
4. Judge and evaluator are pinned; if the site names them, name them exactly:
   `gpt-4o-2024-08-06`, official LongMemEval `evaluate_qa.py`.

## Not included here

LongMemEval-**V2** results: a V2 run is in progress as of this handoff and has
produced no score yet. Nothing about V2 belongs on the site until it lands.
