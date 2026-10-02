import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { privacy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nest Software Development collects, uses, shares and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title={privacy.title}
      intro="How we collect, use, share and protect your information."
      cta={false}
    >
      <div className="prose">
        {privacy.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {"body" in s && s.body ? <p className="t-muted">{s.body}</p> : null}
            {"list" in s && s.list ? (
              <ul className="t-muted">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </PageShell>
  );
}
