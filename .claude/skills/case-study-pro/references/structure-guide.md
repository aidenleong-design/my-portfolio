# Structure Guide — Framing by Designer Type

The framework should serve the story. Use this to set the right emphasis, text/
visual ratio, and type-specific questions once you know the designer archetype.

## By designer type

### UX Designer
- **Emphasis:** thinking process, research insights, problem reframing.
- **Ratio:** ~60–80% text.
- **Push on:** what research discovery changed the direction.

### Product Designer
- **Emphasis:** trade-offs between ideal, feasible, and valuable.
- **Ratio:** ~40–60% text, media roughly equal.
- **Push on:** business/user impact negotiations and scope decisions.

### Visual / Brand Designer
- **Emphasis:** the work is a system, not a set of pretty screens.
- **Ratio:** ~80–90% visuals.
- **Push on:** how it scales across touchpoints; show the system, not samples.

### Interaction Designer
- **Emphasis:** timing, easing, state transitions.
- **Ratio:** ~70% video / interactive — static screenshots can't convey this.
- **Push on:** the motion rationale (durations, curves, why).

### Design Systems Designer
- **Emphasis:** adoption strategy and governance, not just the component library.
- **Push on:** the political dimension of standardization — how adoption happened.

### UX Researcher
- **Emphasis:** trace every shown insight to a design move.
- **Push on:** proof that research actually changed a product decision.

### Design Engineer
- **Emphasis:** code and design as one practice.
- **Ratio:** ~50% prose with technical snippets (5–15 lines) explaining decisions.
- **Push on:** what shipped vs. what was specced; authorship transparency.

## Before / After comparisons

Comparisons succeed when:
- Annotated with the specific pain points being fixed.
- Using identical viewports / framing.

They fail when:
- The improvement is subjective and unexplained.
- Comparing to someone else's work.
- Presented without context for what changed and why.

## Screenshot / video placeholders

Every visual must earn its place. Use a structured placeholder that tells the
user exactly what to capture and the specs:

```markdown
<!-- SCREENSHOT: hero
     Capture: the final checkout summary screen, logged-in state, desktop
     Specs: 1440px wide, PNG, light mode, annotate the new order-confirmation banner -->
```

```markdown
<!-- VIDEO: interaction
     Capture: the drawer open/close transition, slow-mo if possible
     Specs: screen recording, 800px tall, note duration + easing in the caption -->
```

For analytics charts, see `metrics-guide.md`.

---
*Adapted from scoobynko/case-study-skill (MIT) — see CREDITS.md.*
