# Nest website design refinement

Applied the Apple design skill as web guidance while retaining Nest fonts, cyan, warm surfaces, logos, imagery and routes.

## Decisions
- Keep content surfaces opaque; use subtle translucency only for the floating navigation, with solid fallbacks for reduced transparency and increased contrast.
- Dark ink on cyan actions replaces low-contrast white labels. Secondary text uses a stable neutral instead of background-dependent transparency.
- Motion tokens: 160ms feedback, 220ms transitions, 420ms entrances; entrance stagger capped at 160ms. These are Nest implementation choices, not Apple-prescribed timings.
- Native browser scrolling preserves touch, anchors and history. Navigation stays available from the first viewport, supports Escape and returns focus to its trigger.
- Remove automatic headline cycling and perpetual scroll-arrow motion. Client logos have a pause control. Existing nsdLabs pause controls remain.
- Large scroll choreography responds live to reduced-motion settings, widths below 900px and heights of 600px or less. Small-screen content uses the static list.
- Enquiry steps validate required information before continuing, focus the next heading, announce progress and prevent returning during submission.

## Source guidance
References live under `.design-rules/references/`:
- `hig/design-principles.md`: clarity and hierarchy.
- `hig/layout.md`, Visual hierarchy / Adaptability: content grouping and responsive layouts.
- `hig/typography.md`, Ensuring legibility: readable type and retained brand typography.
- `hig/color.md`, Best practices: consistent semantic colors and contrast.
- `hig/liquid-glass.md`, The two layers: functional controls separate from content.
- `hig/motion.md`, Best practices / Providing feedback: purposeful, optional, brief motion.
- `hig/accessibility.md`, Mobility: comfortable controls and alternative interaction.
- `hig/buttons.md`, Style: clear action hierarchy and press feedback.
- `hig/entering-data.md`, Best practices: validate input before proceeding.
- `cross-platform.md`: translate principles to the target platform.

## Verification
Production build passed with Next.js 16.3.8 using a fresh output directory. All 17 content routes were checked at 390px wide with reduced motion: no horizontal overflow and one h1 per route. Menu opening focus and Escape return passed. The three-step enquiry flow passed validation and a mocked successful submission; no email was sent. Browser reported no page errors during this flow. Mobile home and desktop About screenshots were visually reviewed. Live reduced-motion switching, 320px width and a 1024×500 landscape layout also passed. A pre-existing misplaced ScrollTrigger refresh option was moved into its proper configuration.

Not a certification of WCAG compliance or an exhaustive device/browser audit. Changes are local and have not been pushed.
