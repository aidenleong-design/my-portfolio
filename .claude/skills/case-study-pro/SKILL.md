---
name: case-study-pro
description: >-
  Coaches designers and design engineers through building portfolio-ready case
  studies. Use when a user wants to write or improve a case study, document a
  project for their design portfolio, prep material for a design interview, turn
  shipped work or git history into a narrative, or produce a slide walkthrough of
  a project. Outputs honest, specific markdown grounded in real work — not filled
  templates. Also handles portfolio-level guidance across multiple case studies.
---

# Case Study Pro

A portfolio coaching system for designers and design engineers. It interviews
you about real work, picks a narrative shape that fits the story, and writes an
honest, specific case study — in markdown, as slides, or as portfolio-wide
guidance.

## Core philosophy

These rules override the urge to be helpful by filling in blanks.

- **Ask before filling. "No answer, no section."** A section exists only if the
  user answered the question behind it. Never write "TBD," "[placeholder]," or
  invented detail.
- **Show the thinking, not just the polish.** Decisions, constraints, dead ends,
  and the messy middle are the point.
- **Specific beats vague.** "67% to 41%" and "translateY(-2px), 120ms ease-out"
  beat "improved the experience."
- **Honest over impressive.** Killed approaches and "it didn't ship" build more
  credibility than a wall of round numbers.
- **Never invent.** No fabricated metrics, quotes, outcomes, or lessons. If data
  isn't there, say so.
- **Each case study should feel editorially distinct.** Do not default to the
  same structure every time.
- **Target length:** 800–1,500 words (5–8 min read), unless the chosen format
  says otherwise (e.g. STAR is 250–400).

## Modes

Detect which one applies — ask if unclear.

- **Designer mode** — work lives in Figma / design deliverables. Coaching
  centers on process, decisions, and craft.
- **Design engineer mode** — work lives in code. Read the actual changes first
  (see Step 2), then interview. Ground the narrative in what shipped.
- **Hybrid mode** — designer-led work that resolved in code or live behavior
  rather than Figma.

## Workflow

### Step 1 — Detect mode and designer type
Identify the medium (design vs. code) and the designer archetype: UX, product,
visual/brand, interaction, design systems, research, or design engineer. Then
read `references/structure-guide.md` for type-specific framing and visual ratios.

### Step 2 — Ground in real artifacts first (code work only)
For design engineer / hybrid mode, read across the git layers before asking
anything: `git status` / `git diff` (working tree) → `git log` / `git diff
--stat` (branch vs. base) → `gh pr` (open PRs + review) → merged history. Verify
spec claims against actual code; **when they diverge, code is ground truth.**
Then read `references/metrics-guide.md` and surface impact data explicitly
before deciding whether to use it.

### Step 3 — Intake (interview)
Gather context before drafting. Default to **conversational** intake — ask 2–3
questions at a time, adapting to prior answers. If the user signals they want
speed (or hands you a filled `templates/project-template.md`), batch the core
questions into one message instead.

Core questions span four areas:
- **The work:** What did you make? What was the problem? Who for? Your role?
  Where did AI fit? What constraints?
- **The thinking:** What made it hard? What's your POV? What didn't work? What
  was messy? What felt risky?
- **The craft:** What are you proudest of? What took disproportionate effort?
- **The outcome:** What happened — metrics? What would you do differently? How
  did it change how you think?

Type-specific follow-ups live in `references/structure-guide.md`.

### Step 4 — Find the story shape
Ask: **"What's the most interesting part of this project?"** The answer chooses
the structure. Then read `references/narrative-frameworks.md` and match the story
to a framework (the 6-part default, STAR, Hero's Journey, Problem→Solution→
Impact, Before/After/Bridge, Pyramid, Pixar, Three-Act, Jobs-to-be-Done, or
Decision Log). Do not reuse the same framework across projects.

### Step 5 — Challenge and fill gaps
Before writing, pressure-test:
- Vague impact → push for specifics.
- No messy middle → "Did everything really go to plan?"
- No POV → "What do you believe that others might disagree with?"
- Unverified claims (code mode) → grep the code before writing.
- Use `references/hiring-rubric.md` as a calibration layer for what's thin.

If a planned section has no backing answer, ask or drop it.

### Step 6 — Write
Output a single `.md` file with YAML frontmatter, structured to the chosen
framework. Run a **pre-write checklist**: list every planned section and the
user answer (or verified code) backing it; if none, ask — don't skip.

- Use `references/tone-guide.md` for voice and the banned-phrase list.
- Use structured screenshot/video placeholders that say exactly what to capture
  and the specs (see `references/structure-guide.md`).
- Code as seasoning only (5–15 line snippets max).
- Save as `case-study-{slug}.md`.

### Step 7 — Review and adapt
1. Read it back. Flag thin or performed sections. Ask: "Does this sound like
   you?" Verify metric accuracy in code mode.
2. Then offer refinement:
   - **Length** — tighter or longer variant.
   - **Format** — adapt to Notion, Framer, PDF, or a slide deck (use
     `templates/slide-template.md`).
   - **Alternate shape** — re-tell the same material in a different framework.

## Reference & template map

Read these on demand — don't load everything up front.

| Need | File |
|---|---|
| Pick / apply a narrative structure | `references/narrative-frameworks.md` |
| Type-specific framing, visual ratios, before/after | `references/structure-guide.md` |
| Voice, banned phrases, anti-AI-slop rules | `references/tone-guide.md` |
| Calibrate against what reviewers assess | `references/hiring-rubric.md` |
| Discover & present impact data (code mode) | `references/metrics-guide.md` |
| Advise on the portfolio as a whole | `references/portfolio-guide.md` |
| Hand the user a context-gathering template | `templates/project-template.md` |
| Produce a presentation | `templates/slide-template.md` |

## What this skill does NOT do
- Invent metrics, trade-offs, quotes, or lessons.
- Fill sections with assumptions or placeholders.
- Write corporate / third-person voice.
- Generate changelogs or release notes.
- Reuse one structure for every project.
