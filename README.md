# nsd-eg.com — redesign

Next.js 15 rebuild of [nsd-eg.com](https://nsd-eg.com) in the visual language of
the reference recording (`to_clone.mp4`).

**All content, routes, logos and contact details are preserved verbatim from the
live site.** Only the visual design and typography change. The full reverse
engineering of the reference — colour sampling, type scale, grid, motion
timings — is in [`docs/DESIGN-AUDIT.md`](docs/DESIGN-AUDIT.md); read that first
if you're changing anything visual.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Builds to 16 fully static routes. There is no server runtime and no database.

> **Stop the dev server before running a build.** Both write to `.next`. If you
> build while `npm run dev` is live, the production output overwrites the dev
> server's manifests underneath it and every route starts returning 404 with
> `missing required error components, refreshing...` in the browser. It is not a
> code fault and nothing is broken — recover with:
>
> ```bash
> taskkill /F /IM node.exe; rmdir /s /q .next; npm run dev
> ```
>
> In PowerShell: `Get-Process node | Stop-Process -Force; Remove-Item .next -Recurse -Force; npm run dev`

---

## Structure

```
src/
  app/
    layout.tsx           root shell: fonts, metadata, JSON-LD, nav, footer
    page.tsx             home — composes the six reference sections
    globals.css          design tokens + base + type scale
    components.css       every component style
    <route>/page.tsx     the 10 inner routes
    sitemap.ts robots.ts
  components/
    SmoothScroll.tsx     Lenis on GSAP's ticker
    PageBackground.tsx   scroll-linked page background interpolation
    Hero.tsx             hero composition
    Iridescence.tsx      WebGL pearlescent silk (hero backdrop)
    Statement.tsx        word-swap headline + shrink-to-card exit
    HowItWorks.tsx       pinned methodology checklist
    Showcase.tsx         card-promotion stack for the three brands
    BrandArt.tsx         procedural card artwork
    Glyph.tsx            inline iridescent tiles
    NavPill.tsx  Footer.tsx  Contact.tsx  Services.tsx
    ClientMarquee.tsx  CtaCard.tsx  Reveal.tsx
    PageShell.tsx  ServiceRoute.tsx   shared inner-page templates
  lib/
    content.ts           ALL site copy — single source of truth
    motion.ts            GSAP registration, colour mixing helpers
public/
  company_logo/ brands_logo/ erp_logo/ client_logo/
```

**Copy lives in `src/lib/content.ts` and nowhere else.** Components read from
it. If you find yourself typing a sentence into a `.tsx` file, put it in
`content.ts` instead.

---

## Routes

`/` · `/about` · `/onespace` · `/miravoice` · `/nestcloud` ·
`/web-development` · `/mobile-apps` · `/digital-marketing` · `/infrastructure` ·
`/privacy` · `/terms`

Plus the `#services` / `#ecosystem` / `#contact` anchors, `sitemap.xml` and
`robots.txt`. This matches the live site exactly — no URL changed, so nothing
needs redirecting.

---

## The motion system

Six scroll behaviours, all **scrubbed** rather than triggered, so they reverse
correctly when the user scrolls back up (the reference recording scrolls both
ways, which is how you can tell).

| Behaviour | Where |
|---|---|
| Page background colour interpolation | `PageBackground.tsx` |
| Word-level phrase swap | `Statement.tsx` |
| Full-bleed → rounded-card shrink | `Statement.tsx` |
| Pinned checklist with masked scroll | `HowItWorks.tsx` |
| Thumbnail → card promotion | `Showcase.tsx` |
| Staggered entrances | `Reveal.tsx` |

Sections opt into the background system with `data-bg="plum|warm|cream"`.

**Reduced motion is a first-class path, not an afterthought.** Under
`prefers-reduced-motion: reduce` the smooth scroll, all pins, the phrase
cycling, the marquee and the shader animation are disabled, and the showcase
swaps to a plain stacked list. The page stays fully legible with zero motion.

---

## Things worth knowing before you edit

**Typography.** The reference sets Segoe UI Variable Display. That's a Windows
system font, so Windows visitors get the exact face and everyone else gets
Figtree, loaded via `next/font`. The stack is in `globals.css` under
`--font-sans`. This is deliberate — see audit §3.

**Type is a three-register system.** Space Grotesk (display) carries the
character — it descends from Space Mono, so headings keep engineering
character without tipping into novelty. Inter (body) carries the reading at
1.6 line-height. JetBrains Mono carries eyebrows, labels and spec-table keys,
which is where the "technical" read actually comes from — moving eyebrows from
semibold sans to letterspaced mono did more for the feel than anything at
display size. next/font exposes them as `--ff-grotesk` / `--ff-inter` /
`--ff-mono`; the composed stacks are `--font-display`, `--font-sans`,
`--font-mono-stack`. Keep those two layers separate or they collide.

**Four patterns came from a review of axentor.co**, chosen because they add
information density the original reference deliberately avoided:
`.spec` (key/value metadata under a product card), `.erows` / `FeatureRows`
(hairline-separated editorial rows, title left / body right), `.flow`
(horizontal connected process timeline), and `.chamfer` (cut corners echoing
the supplied logo, used once on the closing CTA — a signature, not a texture).
The cinematic layer — background interpolation, pinned checklist, card
promotion, WebGL hero — is unchanged and remains the spine of the design.

**There are two brand accent tokens, and the difference matters.**
`--color-brand` is the real company cyan `#02C8F0`. It only reaches **1.80:1**
on the cream background — it fails even the 3:1 large-text threshold, so it
cannot be used for type on any light surface. It is fine on the dark ones
(5.68:1 on plum, 8.29:1 on ink). `--color-brand-ink` `#016A7F` is the same hue
darkened until it clears AA 4.5:1 on *every* light surface (cream 5.61, card
5.17, warm 4.54, chip 5.28). Light surfaces use `-brand-ink`; dark surfaces and
the logo use `-brand`. If someone "corrects" the eyebrows back to `#02C8F0`
they will silently break contrast everywhere.

**Accent usage is deliberately narrow** (the Axentor pattern): eyebrows, link
labels, arrows, and the terminal full stop of a heading via `<Accent />`. Never
a whole word — colouring a word reads as emphasis and fights the sentence;
colouring the stop reads as a mark of authorship.

**The artwork is code, not assets.** The reference's hero and card images are
Microsoft's proprietary 3-D renders and are not reproduced. The hero is a WebGL
fragment shader (`Iridescence.tsx`); the three brand cards are layered CSS/SVG
(`BrandArt.tsx`). Same optics — pearlescent dispersion, film grain, soft studio
lighting — original artwork. Your own brand logos are composited on top
untouched, at full fidelity.

**The shader is tuned, not arbitrary.** The fold warp is deliberately
*anisotropic*; isotropic fbm turns the silk into marble veins. Dispersion is
clamped low; above ~0.12 the hero becomes neon stripes. Both failure modes are
commented in the source.

**SVG gradient ids must stay unique.** `BrandArt` renders twice — once in the
desktop stage, once in the mobile list — so it takes an `instance` prop to
disambiguate. Duplicate ids make the paint server resolve to whichever copy is
first in the document, which may be inside a `display:none` subtree, and the
artwork silently vanishes.

**Pinned sections must not have section padding.** `.sc` and `.hiw` set
`padding-block: 0` on desktop; padding offsets the pinned wrapper from the
viewport top and pushes content below the fold. The wrappers own their own
vertical space.

---

## Known gaps

- **The contact form has no backend.** It composes a `mailto:` to
  `info@nsd-eg.com` with the message pre-filled, which is genuinely functional
  but not a form submission. Swap the handler in `Contact.tsx` for a POST when
  an endpoint exists.
- **Oracle's logo is hotlinked from Wikimedia**, as it is on the current live
  site. Worth self-hosting.
- **No analytics** is wired up.
- **Lighthouse has not been run.** The build is statically generated with
  105 kB shared JS, images go through `next/image`, and the shader is capped at
  1.5× DPR and pauses off-screen and on tab-hide — but that is reasoning about
  performance, not a measurement. Run it before launch.

---

## Deploying

Any static-capable host. `npm run build` then serve `.next` via `npm start`, or
deploy to Vercel directly — no configuration needed, no environment variables.
