# Reference Design Audit — `to_clone.mp4`

**Source:** 38.34 s screen recording, 1848 × 962 @ 30 fps.
**Subject identified:** the *Microsoft Copilot Tasks* product landing page.
**Method:** decoded with ffmpeg; 38 frames sampled at 1 fps into contact sheets for
structure, then 21 full-resolution frames pulled at motion beats, plus programmatic
pixel sampling (PIL) for exact colour values. Nothing below is guessed — every hex is
sampled and every measurement is read off a 1848 px-wide frame.

The recording is a single continuous scroll: **0 s → ~19 s scrolling down**, then
**~19 s → 38 s scrolling back up**. That return pass is valuable: it confirms every
animation is *scroll-position driven and reversible*, not a one-shot on-enter trigger.

---

## 1. Section inventory (scroll order)

| # | Section | Page background | Signature move |
|---|---------|-----------------|----------------|
| 1 | Hero | pearlescent image | Text fades up on load; background drifts |
| 2 | Statement | `#40383E` | Word-level text swap; **shrinks into a rounded card on exit** |
| 3 | How it works | `#E0DBD8` | Pinned card; checklist self-advances with masked scroll |
| 4 | Showcase ×3 | `#F7F2EF` | Thumbnail → full card promotion (card stack) |
| 5 | Final CTA | `#F7F2EF` | Dark rounded card, oversized wordmark |
| — | Floating nav pill | — | Appears after hero, persists to footer |

The page background is **animated between sections** — pearl → `#40383E` →
`#E0DBD8` → `#F7F2EF`. This is a scroll-driven colour interpolation on `<body>`,
not four separately-painted sections. It is the single biggest contributor to the
"cinematic" feel and is easy to miss.

---

## 2. Colour system (sampled, not estimated)

```
Ink / near-black          #221E1B   final CTA card fill
Ink strong                #2A2522   headings on light
Plum charcoal             #40383E   statement section background
Warm grey                 #E0DBD8   "how it works" page background
Card on warm grey         #EEE9E6   the pinned card fill
Chip / inner surface      #F0EBEA   pill chips inside the card
Hairline / rail           #CCC7C4   1px timeline rail, chip borders
Cream                     #F7F2EF   showcase + CTA page background
Text on dark              #D5D0CB   large type on #40383E (deliberately NOT white)
Accent green (check)      #87AB91   step-complete indicator ring
```

**Two observations that matter more than the values themselves:**

1. **Nothing is pure.** There is no `#FFFFFF` and no `#000000` anywhere in the
   frame. Every neutral carries a warm (red/yellow) bias. Pure white text on the
   dark section would immediately break the look — the reference uses `#D5D0CB`,
   about 83 % luminance, which reads as "lit" rather than "printed".
2. **The palette is monochrome + one accent.** All colour in the composition comes
   from the *artwork*, never from the UI. Buttons, chips, rails and type are all
   neutral. This is what keeps it feeling expensive.

### Iridescence
The only saturated colour is a full-spectrum pearlescent dispersion —
cyan → violet → magenta → amber — always at low saturation over a light neutral, always
carrying **film grain**. The grain is essential: it is what stops the gradients from
banding and reads as "photographed" rather than "CSS".

---

## 3. Typography

**The face is Segoe UI (Variable Display cut), Semibold**, confirmed at 118 px on the
final CTA frame: single-storey `g` with an open tail, slanted top-left terminal on `t`,
straight-tailed `y`, near-circular `C` and `o`, double-storey `a` with no spur.

Type scale, measured at 1848 px viewport:

| Role | Size | Weight | Tracking | Leading |
|------|------|--------|----------|---------|
| Display wordmark (CTA) | 118 px | 600 | −0.02 em | 1.0 |
| Statement headline | 90 px | 600 | −0.015 em | 1.28 |
| Hero headline | 68 px | 600 | −0.015 em | 1.1 |
| Section heading | 44 px | 700 | −0.01 em | 1.15 |
| CTA kicker | 40 px | 600 | −0.01 em | 1.2 |
| Section subhead | 24 px | 400 | 0 | 1.45 |
| Showcase title | 26 px | 700 | −0.005 em | 1.25 |
| Body | 20 px | 400 | 0 | 1.5 |
| Step title | 27 px | 600 | 0 | 1.3 |
| Chip / label | 18 px | 400 | 0 | 1 |
| Eyebrow | 17 px | 600 | 0 | 1 |

Only **two weights carry the whole page** — 400 and 600, with 700 used sparingly for
section headings. No light weights, no italics, no all-caps.

> **Implementation note.** Segoe UI is a Microsoft system font: present on every
> Windows machine, absent elsewhere. The stack is
> `"Segoe UI Variable Display", "Segoe UI", Figtree, system-ui` — Windows visitors
> get the exact face from the reference; everyone else gets Figtree, a variable
> humanist-geometric with the same single-storey `g` and near-identical metrics.

---

## 4. Layout & grid

Container max-width **1512 px**, gutters 32 px, centred.

**Showcase grid** is the most distinctive layout — three tracks:

```
[ 190px prev-thumb ] [ 34px ] [ 1fr active card ] [ 32px ] [ 400px text ]
```

The active card is ~857 × 790 (aspect ≈ 1.085), radius 24 px. Thumbnails are 186 × 170,
radius 20 px. The *previous* item's thumb sits top-left; the *next* item's thumb sits
bottom-right under the copy. So the page always shows you where you came from and where
you're going.

**Pinned card** (how-it-works, final CTA) is 1142 px wide — deliberately narrower than
the container, radius 28 px (how-it-works) / 40 px (CTA).

Vertical rhythm is an **8 px base** with section padding at 160 px desktop.

Radii: `20 / 24 / 28 / 40 / 999px`. Nothing sharp anywhere on the page.

---

## 5. Motion language

Six distinct behaviours. Every one is scroll-*scrubbed* (reversible), not triggered.

**5.1 Background colour interpolation** — `<body>` background lerps between the four
section colours across the scroll. Duration is the section transition itself.

**5.2 Word-level text swap** (statement section) — the headline holds a fixed skeleton
(`I want to ▢ <verb> a ▢ <noun> for my ▢ <object>`) and swaps *individual words*, not
the whole line. Outgoing word: blur 0→6 px, opacity 1→0, y −8 px. Incoming word: reverse,
staggered ~60 ms apart. Three phrases cycle:
- *book a haircut for my daughter*
- *make a spreadsheet for my budget*
- *create a presentation for my report*

Each phrase carries its own three inline 3-D glyphs, set in rounded squares (radius
22 px on a 90 px box) and baseline-aligned with the text.

**5.3 Full-bleed → card shrink** — the signature transition. On exit, the dark section
animates `inset: 0 → 240px 310px`, `border-radius: 0 → 48px`, content `scale: 1 → 0.93`,
revealing the next section's background behind it. Scrubbed across ~60 vh of scroll.

**5.4 Pinned checklist** — the how-it-works card pins; steps advance as scroll
progresses. Completed steps show a filled green check; upcoming steps sit at
~35 % opacity. The list translates upward inside the card with a **mask-image
gradient** feathering top and bottom edges.

**5.5 Card promotion** (showcase) — the next thumbnail scales and translates into the
active card slot while the active card shrinks into the prev-thumb slot. Because both
run off the same scroll progress, they cross perfectly. Copy cross-fades with a 12 px
y-offset.

**5.6 Hero load** — headline, eyebrow, body and button fade up (y +24 px, opacity 0→1)
with a 90 ms stagger, ~1.0 s total, starting ~200 ms after paint.

### Timing & easing

| Purpose | Curve | Duration |
|---------|-------|----------|
| Scroll-scrubbed | linear (scrub 1) | tied to scroll |
| Entrances | `cubic-bezier(.22,1,.36,1)` | 700–900 ms |
| Word swaps | `cubic-bezier(.4,0,.2,1)` | 380 ms |
| Hover (buttons/cards) | `cubic-bezier(.22,1,.36,1)` | 260 ms |
| Press | `cubic-bezier(.4,0,1,1)` | 90 ms |

Smooth scroll is present throughout: momentum with ~1.1 s settle, no snap.

---

## 6. Component inventory

- **Floating nav pill** — cream `#FDFBF7`, radius 999, ~64 px tall, bottom-centre,
  24 px from viewport bottom. Holds wordmark + dark CTA pill. Enters after the hero.
- **Primary button** — dark fill, cream text, radius 999, 18 px × 32 px padding.
- **Inverse button** — cream fill, dark text (used inside dark cards).
- **Chip** — icon + label, radius 999, `#F0EBEA` on `#CCC7C4` hairline.
- **Step row** — 44 px check circle, title, description, chip row, on a 1 px rail.
- **Showcase card** — image, radius 24, grain overlay.
- **Thumbnail** — 186 px, radius 20, same grain.
- **Statement card** — the shrinking dark panel.
- **CTA card** — near-black, radius 40, kicker + oversized wordmark + inverse button.

Micro-detail worth copying: **every image surface carries the same grain overlay** at
identical opacity. It unifies procedurally-generated art with photographic art.

---

## 7. What cannot be copied, and what replaces it

The reference's hero background, the three showcase images, and the inline 3-D glyphs
are **Microsoft's proprietary 3-D artwork**. Reproducing those files on a commercial
site for another company would be copyright infringement, so they are not being copied.

What *is* being reproduced is the design language they sit inside — which is the part
that actually transfers. Replacements, built procedurally so they ship as code rather
than assets:

| Reference asset | Replacement |
|---|---|
| Pearlescent silk hero | WebGL fragment shader — flowing iridescent bands with chromatic dispersion + grain, animated, `<canvas>`-rendered |
| 3 showcase renders | CSS/SVG iridescent compositions on brand-relevant abstract forms, same palette, same grain |
| Inline 3-D glyphs | Iridescent rounded-square tiles carrying NSD's own product marks |

Same colour physics, same grain, same lighting — original artwork.

---

## 8. Mapping to nsd-eg.com

Content is preserved verbatim; only the visual language changes. All 11 routes,
the full nav, every service, every module description, the applications, contact
details and SEO structure carry over unchanged.

| Reference section | NSD content |
|---|---|
| Hero | *"The all-in-one technical partner"* + ecosystem line + `View Architecture` / `Partner With Us` |
| Statement (word swap) | `I want to ▢ unify a ▢ ERP for my ▢ enterprise` — cycling across NSD's three pillars |
| How it works (pinned checklist) | The existing **DISCOVER → DESIGN → BUILD → LAUNCH** methodology, one step per checklist row |
| Showcase ×3 | The three brands: **OneSpace ERP**, **MiraVoice**, **NestCloud** — logos preserved exactly |
| Client marquee | Existing 26 client logos, retained |
| Final CTA | `Partner With Us` + contact form |

**Routes preserved:** `/`, `/about`, `/onespace`, `/miravoice`, `/nestcloud`,
`/web-development`, `/mobile-apps`, `/digital-marketing`, `/infrastructure`,
`/privacy`, `/terms`, plus `#services` / `#ecosystem` / `#contact` anchors.

---

## 9. Design tokens

```css
--ink:#221E1B;  --ink-strong:#2A2522;  --plum:#40383E;
--warm:#E0DBD8; --card:#EEE9E6;        --chip:#F0EBEA;
--rail:#CCC7C4; --cream:#F7F2EF;       --pill:#FDFBF7;
--on-dark:#D5D0CB; --accent:#87AB91;

--r-sm:20px; --r-md:24px; --r-lg:28px; --r-xl:40px; --r-full:999px;
--container:1512px; --gutter:32px; --section-y:160px;

--e-out:cubic-bezier(.22,1,.36,1);
--e-inout:cubic-bezier(.4,0,.2,1);
--d-fast:180ms; --d-base:260ms; --d-slow:700ms;
```

---

## 10. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| ≥1600 px | Container caps at 1512 px; art scales, type does not |
| 1200–1600 | Fluid; showcase keeps 3 tracks |
| 900–1200 | Prev-thumb drops; showcase → card + copy below |
| 600–900 | Single column; statement type 90→48 px; card insets shrink |
| <600 | Nav pill goes full-width minus 16 px; type 48→34 px; scrubbed pins become simple reveals |

Type uses `clamp()` throughout so there are no jumps between breakpoints. All
scroll-scrubbing is disabled under `prefers-reduced-motion`, replaced by static
end-states — the page must be fully legible with zero animation.
