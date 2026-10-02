/**
 * Inline iridescent tile that sits inside the statement headline.
 *
 * The reference sets 3-D rendered objects in rounded squares, baseline-aligned
 * with the type (radius 22px on a 90px box). Those renders are Microsoft's, so
 * these are built from the same optics instead: a pearlescent CSS gradient with
 * the shared grain overlay, carrying a line icon.
 */

const PATHS: Record<string, string> = {
  unify: "M8 12h8M12 8v8M4 4h6v6H4zM14 14h6v6h-6z",
  erp: "M3 3v18h18M7 15v3M12 10v8M17 6v12",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3a14 14 0 010 18 14 14 0 010-18",
  connect: "M9 12a3 3 0 106 0 3 3 0 00-6 0M4 12H1M23 12h-3M12 4V1M12 23v-3",
  voice: "M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zM5 11a7 7 0 0014 0M12 18v4",
  signal: "M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4",
  deploy: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z",
  cloud: "M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z",
  shield:
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z",
};

/** Each glyph gets its own hue offset so the tiles aren't identical. */
const HUE: Record<string, number> = {
  unify: 0, erp: 42, globe: 96, connect: 150, voice: 196,
  signal: 238, deploy: 284, cloud: 320, shield: 18,
};

export default function Glyph({ name }: { name: string }) {
  const d = PATHS[name] ?? PATHS.unify;
  const hue = HUE[name] ?? 0;

  return (
    <span
      className="glyph grain"
      style={{ "--hue": `${hue}deg` } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d={d}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
