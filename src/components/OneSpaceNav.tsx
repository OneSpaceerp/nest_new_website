"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { oneSpaceNav } from "@/lib/onespace";

export default function OneSpaceNav() {
  const pathname = usePathname();
  return <nav className="onespace-nav" aria-label="OneSpace">
    <Link href="/onespace" className="onespace-nav__brand"><Image src="/brands_logo/onespace_light.png" alt="OneSpace" width={124} height={60} priority /><span>by Nest</span></Link>
    <div className="onespace-nav__links">{oneSpaceNav.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</div>
    <Link href="/onespace#enquiry" className="onespace-nav__cta">Let’s talk <span aria-hidden="true">↗</span></Link>
  </nav>;
}
