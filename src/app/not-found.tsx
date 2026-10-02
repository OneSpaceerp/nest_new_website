import Link from "next/link";
import BrandLink from "@/components/BrandLink";

export default function NotFound() {
  return (
    <main id="main" className="page" style={{ minHeight: "70svh" }}>
      <div className="container">
        <div className="page__brand">
          <BrandLink height={34} />
        </div>
        <p className="t-eyebrow t-muted">404</p>
        <h1 className="t-h2" style={{ margin: "0.75rem 0 1.25rem" }}>
          This page doesn&rsquo;t exist
        </h1>
        <p className="t-lead t-muted" style={{ marginBottom: "2rem" }}>
          The link may be out of date, or the page may have moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </main>
  );
}
