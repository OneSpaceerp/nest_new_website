/**
 * The accented terminal full stop.
 *
 * Borrowed from the Axentor pattern: the accent lands on the punctuation that
 * closes a heading, never on a word. Colouring a word reads as emphasis and
 * competes with the sentence; colouring the stop reads as a mark of authorship
 * and leaves the sentence alone.
 *
 * `aria-hidden` because it is decoration — the heading's accessible name stays
 * the sentence itself rather than gaining a stray period.
 */
export default function Accent() {
  return (
    <span className="accent" aria-hidden="true">
      .
    </span>
  );
}
