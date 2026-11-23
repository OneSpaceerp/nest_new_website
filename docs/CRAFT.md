# Craft — the Nest paper language

The site's visual layer is **Craft**: Nest shown as precise paper craft. The 3-D
illustrations in `public/illustrations/` are already white paper models with cyan
ribbons. Craft gives the interface the same material, so the art and the UI read
as one thing.

Content, routes, logos and contact details are unchanged (see README). Craft
changes only how they look.

## Where it lives

| File | What it holds |
|------|---------------|
| `src/app/globals.css` | Tokens (`@theme`): paper, kraft and navy palette, crisp radii, fonts |
| `src/app/craft.css` | The Craft layer, loaded last: sheets, strips, tags, buttons, dark paper, hero |
| `src/components/Hero.tsx` | The paper-stage hero |
| `src/components/PageBackground.tsx` | Scroll-linked page colours (paper → navy → kraft → paper → night) |

`craft.css` re-skins existing components by class name. It doesn't change their
layout or motion logic, so the pinned and scroll-driven sections behave exactly
as before.

## The signature: the cut corner

The Nest logo plate has its top-left and bottom-right corners cut. That shape is
the signature of every sheet on the site.

```css
clip-path: polygon(var(--ch) 0, 100% 0, 100% calc(100% - var(--ch)),
                   calc(100% - var(--ch)) 100%, 0 100%, 0 var(--ch));
```

`--ch` is a registered `@property` (`inherits: false`), so each element sets its
own cut size and the cut can animate. Interactive sheets open their corners
slightly on hover. Always write the polygon inline: a shared custom property
would be resolved once, on `:root`, and every sheet would get the same cut.

## The six moves

| Move | How | Used on |
|------|-----|---------|
| **Sheet** | Paper painted on `::before` with the cut corner; a hairline `drop-shadow` draws the edge, diagonals included; a second `drop-shadow` lifts it | Cards, panels, steps, form panel (`.sheet-cut` or the class list in `craft.css`) |
| **Strip** | Flat cyan (`.strip--brand`) or navy (`.strip--navy`) band, square ends, ±4–9° | Hero stage, CTA card, footer top edge |
| **Crease** | 45° split: one half ~15% darker | Buttons on hover, statement glyph tiles, strip crossings |
| **Tag** | 5px-radius label with a punched hole | `.chip`, `.tag` |
| **Stack** | 2 offset sheets rotated ±3–4° behind the main sheet | Hero stage |
| **Mount** | Illustration on a paper mat with a kraft keyline | `.art`, `.story-art` |

Navy sections (`.statement__panel`, `.story-platform`, `.story-enquiry`,
`.ctacard__card`) are **navy card stock**: same grain, plus a faint diagonal fold.

## Palette

| Token | Hex | Role | Contrast |
|-------|-----|------|----------|
| `--color-cream` | `#F4EFE6` | Paper (page) | |
| `--color-card` | `#FBF7EF` | Sheet | |
| `--color-warm` | `#EAE2D3` | Kraft | |
| `--color-rail` | `#D8CDBA` | Kraft edge | |
| `--color-ink` | `#01133F` | Nest navy (logo plate), dark sections | 15.7:1 on paper |
| `--color-ink-strong` | `#121A2E` | Body ink | 15.1:1 on paper |
| `--color-brand` | `#02C8F0` | Nest cyan: buttons, strips, accents on navy | 9.0:1 on navy |
| `--color-brand-ink` | `#016A7F` | Cyan for text on paper | 5.4:1 on paper |
| `--color-night` | `#000B26` | Footer | |

Rules: cyan is **never** text on paper (1.7:1); use `--color-brand-ink`. Buttons
are cyan with navy text (9:1).

## Type

Space Grotesk (display), Instrument Sans (body), JetBrains Mono (eyebrows and
labels). Eyebrows carry a small paper strip in front of them.

## Accessibility

- The sheet's paper is clipped on `::before`, so focus rings on the element
  itself are never clipped.
- `prefers-reduced-motion`: hero entrance animations are off. All existing
  motion controls are kept.
- `prefers-contrast: more`: sheets get a solid ink outline.
