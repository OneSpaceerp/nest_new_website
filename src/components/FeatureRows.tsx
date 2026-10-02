import Reveal from "./Reveal";

/**
 * Hairline-separated editorial rows: title on the left, description (and an
 * optional stat) on the right.
 *
 * Adopted from Axentor. For a list of five capabilities this reads as
 * considered editorial structure, where an equal-weight card grid reads as
 * filler — and it scales to any number of items without reflowing awkwardly.
 */
export default function FeatureRows({
  items,
}: {
  items: readonly { title: string; desc: string; stat?: string }[];
}) {
  return (
    <div className="erows">
      {items.map((f, i) => (
        <Reveal as="article" className="erow" key={f.title} delay={i * 70}>
          <h3 className="erow__title">{f.title}</h3>
          <div>
            <p className="erow__body">{f.desc}</p>
            {f.stat ? <span className="erow__stat">{f.stat}</span> : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
