/**
 * Pause/play control for content that moves on its own (WCAG 2.2.2).
 *
 * Compact on purpose: an icon with a one-word label, so the control is easy
 * to find without competing with the content it governs. The accessible name
 * says exactly what it pauses.
 */
export default function MotionToggle({
  paused,
  onToggle,
  subject,
  className = "",
}: {
  paused: boolean;
  onToggle: () => void;
  /** What moves, e.g. "rotating headline" — completes "Pause …" / "Play …". */
  subject: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`motion-control ${className}`}
      aria-pressed={paused}
      aria-label={`${paused ? "Play" : "Pause"} ${subject}`}
      onClick={onToggle}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {paused ? (
          <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
        ) : (
          <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
      <span>{paused ? "Play" : "Pause"}</span>
    </button>
  );
}
