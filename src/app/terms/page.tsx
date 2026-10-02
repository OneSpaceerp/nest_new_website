import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { terms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Nest Software Development website and services.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title={terms.title}
      intro="The terms governing your use of this site and our services."
      cta={false}
    >
      <div className="prose">
        {terms.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p className="t-muted">{s.body}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
