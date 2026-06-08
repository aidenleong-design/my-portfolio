# Metrics Discovery & Analytics Guide

Primarily for design engineer mode — read after understanding the feature from
the diff and conversation. The non-engineer section at the end applies to anyone.

Think like a data analyst: map changes to behaviors, pick the right metric type,
define a fair comparison window, present honestly.

## Step 1: Map changes to user behaviors
Read the diff (or the redesign). What user-facing action does it touch?
- New search component → search usage, result clicks, time-to-result, zero-result rate
- Redesigned onboarding → completion rate, drop-off by step, time-to-first-value
- Performance work → load time, interaction latency, bounce rate
- New navigation → navigation depth, pages-per-session, search-after-landing
- Simplified form → completion rate, error rate, time-to-complete, abandonment step

## Step 2: Pick the right metric type

| Change type | Primary metric | Secondary |
|---|---|---|
| Interaction redesign | Funnel conversion / task completion | Time-on-task, error rate, rage clicks |
| Performance | LCP, FCP, TTI, p50/p95 | Bundle size delta, bounce rate |
| Information architecture | Nav depth / pages-per-session | Bounce rate, search-after-landing |
| New feature | Adoption (DAU used / total DAU) | Frequency, adopter vs non-adopter retention |
| Removal / simplification | Error rate / time-to-complete | Support tickets, completion rate |
| Design system component | Adoption count (teams/products) | Bugs per component, designer satisfaction |

## Step 3: Define a fair comparison window
- **Minimum** 2 weeks before / 2 weeks after.
- **Align day-of-week** (Monday-to-Monday).
- **Watch seasonality** (don't compare Black Friday to a normal week).
- **Flag confounders** — other changes in the same window.
- If a flag/gradual rollout was used, cohort comparison beats before/after.

## Step 4: Present a metrics brief (confirm before writing)

```
METRICS BRIEF
Feature: [name from the diff]
Affected behavior: [what user action this touches]

Recommended metrics (ranked by signal strength):
1. [Primary]  Why: [...]  Query: [...]  Before: [range]  After: [range]
2. [Secondary] Why: [...] Query: [...]
3. [Guardrail] Why: [confirm we didn't break X] Query: [...]

Confounders to acknowledge: [...]
Skip if: [conditions where this would mislead]
```

## Connecting to analytics tools
Check for a connected analytics MCP server. If present, pull data directly. If
not, write the query instructions and ask the user to paste numbers back.

- **Amplitude** — Official MCP (OAuth): `https://mcp.amplitude.com/sse`.
  Community: `npx amplitude-mcp --amplitude-api-key=KEY --amplitude-secret-key=SECRET`.
  Tools: search, event segmentation, funnels, retention, cohorts.
- **PostHog** — Official MCP: `https://mcp.posthog.com/sse`. Supports HogQL
  (SQL-like), trends, funnels, retention, paths, session replay links.
- **Mixpanel** — Official remote MCP (OAuth) via Mixpanel settings. Event
  queries, funnels, retention, segmentation.
- **Multi-platform** — `engageable` wraps GA4, Mixpanel, PostHog, Amplitude
  (`pip install engageable` → `engageable-mcp`).

If none connected: still run Steps 1–3, hand over exact query instructions, and
write the Impact section only once numbers are confirmed.

## Writing metrics into the case study
- **Always show the baseline.** "87% completion, up from 64%."
- **Name the metric precisely.** Not "improved onboarding" but the actual funnel.
- **One primary, one or two supporting.** No wall of numbers.
- **Percentages for rates, absolutes for counts.**
- **Acknowledge confounders.**
- **Never invent.** If absent: "too early to measure" / "no analytics
  instrumented for this flow."

### Impact section template
```markdown
## Impact

{Primary metric}: {before} to {after} ({timeframe}).
{One sentence on why this metric matters.}

{Secondary}: {before} to {after}. {Context.}

{Optional guardrail}: {Metric} held steady at {value}, confirming {what you
didn't break}.

{If no data}: This shipped {timeframe} ago. {Why no data.} Qualitative signal:
{teammate feedback / user quotes / support-ticket trend}.
```

### Chart placeholder
```markdown
<!-- CHART: impact comparison
     Capture: [metric] chart, [before range] through [after range]
     Specs: PNG, crop to relevant range, annotate deploy date -->
```

## Metrics for non-engineer designers
Even without code access, ask your PM/analyst for one number with a baseline and
a date:
- Task completion rate from usability testing (before/after)
- Support ticket volume for the affected area
- NPS / CSAT per feature, time-on-task from sessions
- Adoption rate of a new flow, error / abandonment rate

Frame it: "You don't need to own the dashboard. You need one number with a
baseline and a date."

---
*Adapted from scoobynko/case-study-skill (MIT) — see CREDITS.md.*
