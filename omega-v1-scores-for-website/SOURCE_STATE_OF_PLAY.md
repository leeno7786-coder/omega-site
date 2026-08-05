# State of play — LongMemEval, 2026-07-31

Written for fresh eyes. Everything here traces to a judged file or a measured
run; where something is an assumption, it says so. The section on **what I got
wrong** is included deliberately — several confident conclusions in this
project were later overturned by better measurement, and knowing which ones is
useful for calibrating the rest.

## The number

| arm | score | note |
| --- | --- | --- |
| R1 gemma-4B, 2026-07-05 | 259/500 = **51.8%** | archived, re-verified from judged file |
| R2 gemma-4B, 2026-07-07 | 346/500 = **69.2%** | the operator's "before" number |
| **NOW gemma-4B** | **390/500 = 78.0%** | local 4B, f16 KV, v4 prompt, flat layout |
| NOW mistral-large | 432/500 = **86.4%** | same frozen evidence |

The gemma and mistral arms replay the SAME persisted evidence out of
`.artifacts/runs/board-500-v2` (identical `evidence_sha256`), so their
difference isolates the answer model exactly. Judge is
`openai/gpt-4o-2024-08-06` throughout.

+8.8pp for the local 4B over its own before-number came from retrieval work
alone — same model, same quant, same prompt family.

Reproduce any of this with:

    python .artifacts/instruments/progression_table.py \
      --oracle D:/LongMemEval/longmemeval_oracle.json \
      "R2=<archive>/omega_predictions_r2.jsonl.eval-results-gpt-4o" \
      "NOW=.artifacts/replays/board-gemma-f16kv.jsonl.eval-results-gpt-4o"

## Where the remaining loss is

On identical evidence, across all 500:

| | cases |
| --- | --- |
| both models correct | 369 |
| **both fail** | **47** |
| **only gemma fails** | **63** |
| **only mistral fails** | **21** |

Of the 47 both-fail cases (44 non-abstention), reading the evidence directly:

- **20** numeric/short gold — counting questions
- **15** gold spans multiple rows — synthesis
- **7** gold genuinely absent — true retrieval loss
- **2** gold in one row, both models missed it

**So the retrieval ceiling is ~98%, not 90.6%.** Only 7 true-absence plus 3
abstention cases are beyond the answer layer. Retrieval is NOT the constraint.

gemma's 110 failures by what the question asks for:

| class | n | share |
| --- | --- | --- |
| **COUNT / quantity** | **48** | **44%** |
| single fact / other | 25 | 23% |
| **TEMPORAL ordering** | **16** | **15%** |
| PREFERENCE / advice | 8 | 7% |
| DURATION / rate | 6 | 5% |
| abstention | 4 | 4% |
| ENUMERATION / set | 3 | 3% |

**Counting + temporal ordering = 64 cases = the whole 90% target.**
390 + 48 + 16 = 454/500 = 90.8%.

## What has been tried, and measured

Everything below was run with a matched control on the same serving config.

### Static prompt interventions — all neutral-to-negative

| intervention | result |
| --- | --- |
| v5 written ledger | +0.7pp overall, temporal 28/33 -> 23/33 |
| grouped evidence layout | -1.3pp, multi-session +4, temporal -5 |
| grouped-chrono layout | -4.8pp |
| vote-of-3 self-consistency | +2.1pp (one case), 3x cost |
| summation scaffold | -2.0pp, knowledge-update 15/15 -> 11/15 |

**Established finding:** no single static answer contract serves all question
types. Multi-session wants aggregation, knowledge-update wants supersession;
anything that helps one damages the other. This is why a per-question
mechanism was pursued.

### The composer pre-stage — three attempts, all failed

A small model that reads question + evidence and emits a per-question plan
(`answer_shape`, `instructions`, `gaps`) injected into the answer prompt.
Wired and shipping behind `OMEGA_COMPOSER_URL` (off by default, so the control
prompt is byte-identical).

| version | what it was | result |
| --- | --- | --- |
| v2 | Qwen3.5-2B + Omega's own scaffold LoRA | **-5.6pp** (69.4% vs 75.0% control) |
| v3a | + 600 synthetic records, 1 phrasing per mode | **1/5** on target probe |
| v3b | + 2000 records, 149 phrasings, count-events mode | **1/5** on target probe |

Three distinct failure modes, one root cause:

- **v2 — wrong prior.** 48% of its training targets were `partial`/`refusal`
  (correct for a live assistant, wrong for a benchmark where ~94% of questions
  are answerable). It retrieved gold answers, named them, then refused.
- **v3a — memorised templates.** Reproduced training sentences verbatim
  ("which counts WEEKLY OCCURRENCES, not how many different class types they
  named") then enumerated 3 of 4 operands and totalled wrong.
- **v3b — fabricates operands.** Learned the FORM of "enumerate with counts,
  then sum" and fills it with whatever is nearby: listed Burt's Bees, Dr.
  Hauschka and Lavera as "cuisines"; asserted three books took "1 week" each
  when the evidence says 2, 4, 2.

**v3b's one win is worth noting** — on the flagship case `2788b940` it produced
"Zumba on Tuesdays and Thursdays (2), Hip Hop Abs on Saturdays (1), yoga on
Sundays (1) and BodyPump on Mondays (1), which totals 5 classes a week", which
is exactly right and exactly what the design intended. The concept works when
the model does not fabricate. It fabricates most of the time.

**Conclusion: a 2B asked to AUTHOR reasoning over ~90 evidence rows produces
fluent, confident, wrong text.** A fourth corpus would be the same experiment
again.

### Serving

**q8_0 KV cache costs 4.9pp** — 75.0% vs 79.9% f16 on dev_set_a, 3 trials
each, no overlap between trial ranges. Damage concentrates in knowledge-update
and multi-session (long-context precise recall); single-session categories
untouched. The flag saves 666 MiB and warns about nothing.
**Never serve a scored run with `--cache-type-k/v q8_0`.**

## What I got wrong (calibration for the rest)

1. **Predicted the composer would fail from its training distribution.** A
   probe then appeared to overturn it, so I reversed. The full arm confirmed
   the original prediction. The probe had been run under a truncating record
   cap I set myself — a bad measurement, not a real update.
2. **Declared reranking dead on contaminated statistics.** "Median gold rank 2,
   17 of 26 in top-5" was almost entirely single-character numeric gold
   (`"5"`, `"4"`) matching noise anywhere in 90 rows. Retracted, then
   re-established on structural evidence instead.
3. **Quoted a 90.6% retrieval ceiling.** Derived by assuming every both-fail
   case was a retrieval loss. Reading the evidence showed 35 of 44 are
   aggregation/synthesis with complete evidence. True ceiling ~98%.
4. **Attributed a training slowdown to GPU power throttling.** The power cap
   was genuinely active, but the symptom was an eval pass blocking the loop.
5. **Poisoned the training venv twice with the same mistake** — installing
   llama.cpp's convert requirements into it, which downgraded transformers
   below qwen3_5 support (and on the previous box, replaced CUDA torch with a
   CPU build). Now structurally prevented via a separate `convert-env`.

The pattern: substring matching against short gold, and inference from
distribution without direct observation, have both produced confident wrong
conclusions here. Prefer reading the actual evidence for a handful of cases.

## Open leads, ranked by evidence rather than appeal

1. **The 21 cases where the 4B beats mistral-large.** Untouched. All 21 are
   mistral giving a confidently WRONG substantive answer — zero abstentions.
   Concentrated in knowledge-update (8) and multi-session (8). Example: asked
   how long the user has lived somewhere, evidence says 3 months, mistral
   computed "7 months and 4 days". **The small model's literalness is an asset
   where the benchmark rewards taking the stated value.** The two models fail
   in opposite directions, which is what makes a router worth more than
   max(A, B). Nobody has tried this.
2. **The 36 regressions.** R1->R2 fixed 97 but broke 10; R2->board fixed 112
   but broke 26. Those are questions an earlier configuration answered
   correctly. Known-winnable, unlike speculative work.
   `progression_table.py` prints each by id and type.
3. **Classifier instead of generative composer.** A model that SELECTS among
   hand-written instruction templates cannot invent an operand, because it
   never writes one. Classification is far easier to learn from limited data.
   Preserves the category-deriving claim if trained on general data.
4. **single-session-preference, 13/30.** Weakest category, and weakest for
   mistral too (19/30). Decomposition: 9 answer-layer (mistral solves them on
   identical evidence), 4 retrieval-addressable, 4 present-but-both-fail.
   Caveat: preference gold answers are often rubrics, so some of that gap is
   judge variance on an under-specified target.

## Constraints that are not negotiable

- **No benchmark fitting.** The leaderboard leaders use category-tuned prompts
  written for LongMemEval's six question types. The claim this stack makes is
  that the mechanism DERIVES the question type at inference having never seen
  the benchmark. Training a composer on LongMemEval's taxonomy would score
  higher and forfeit the claim — and would be worse for Omega in production.
- **Re-run the control whenever the model server was relaunched.** A baseline
  is only a baseline while the stack that produced it is standing. q8_0 KV hid
  4.9pp behind a stored number exactly this way.
- **All 500 question ids are burned** (`docs/burned_question_ids.json`). No
  future blind claim is possible on this dataset.
- **Every mechanism ships a loud firing proof independent of its effect
  measurement.** "No effect" without that proof is not a result — a stage that
  failed open on every case scores identically to baseline.

## Where things run

- Model box: GCP `instance-20260730-071319`, us-east1-c, L4 24 GB. Rebuilt
  2026-07-31 (fresh Debian 13, 99 GB disk). Driver 550.163.01, CUDA 12.4.
- `~/lora` = training venv (transformers 5.14.1 — the only version that
  recognises `qwen3_5`). `~/convert-env` = GGUF conversion only.
- `serve.sh` starts gemma :8000 (f16 KV) and the composer :8001.
- `tunnel_keeper.sh` maintains the SSH tunnel; it must run under bash, not
  PowerShell, which eats the `--` separator gcloud needs.
- Instruments live in `.artifacts/instruments/` and are **gitignored** — they
  exist only on this box. `answer_replay.py` carries an unpushed fix
  (`.splitlines()` breaks on U+2028/U+2029/U+0085 inside conversation text).
