import Image from "next/image";
import { clientLogos, clientsHeading } from "@/lib/content";

/**
 * Client logo marquee, preserved from the existing site (all 26 logos, exact
 * files). Duplicated once and translated -50% so the loop is seamless; pauses
 * on hover and is disabled entirely under reduced-motion.
 */
export default function ClientMarquee() {
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section className="clients" data-bg="cream" aria-label="Clients">
      <div className="container">
        <p className="t-mono t-muted clients__head">{clientsHeading}</p>
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
