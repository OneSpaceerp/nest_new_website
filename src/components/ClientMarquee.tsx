"use client";
import { useState } from "react";
import Image from "next/image";
import { clientLogos, clientsHeading } from "@/lib/content";

/** Client logos with a persistent pause control and a static reduced-motion layout. */
export default function ClientMarquee() {
  const [paused, setPaused] = useState(false);
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section className={`clients ${paused ? "is-paused" : ""}`} data-bg="cream" aria-label="Clients">
      <div className="container">
        <div className="clients__heading"><p className="t-mono t-muted clients__head">{clientsHeading}</p><button type="button" className="motion-control" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume logos" : "Pause logos"}</button></div>
      </div>

      <div className="clients__viewport">
        <div className="clients__track">
          {doubled.map((file, i) => (
            <span className="clients__item" key={`${file}-${i}`}>
              <Image
                src={`/client_logo/${file}`}
                alt={i < clientLogos.length ? file.replace(/\.[a-z]+$/i, "") : ""}
                aria-hidden={i >= clientLogos.length}
                width={180}
                height={60}
                sizes="180px"
                loading="lazy"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
