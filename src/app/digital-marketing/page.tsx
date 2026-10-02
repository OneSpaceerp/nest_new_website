import type { Metadata } from "next";
import ServiceRoute from "@/components/ServiceRoute";
import { servicePages } from "@/lib/content";

const page = servicePages.find((p) => p.slug === "digital-marketing")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.intro,
  alternates: { canonical: "/digital-marketing" },
};

export default function Page() {
  return <ServiceRoute page={page} />;
}
