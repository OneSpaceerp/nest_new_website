"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type AppLink = { id: string; name: string };
const positions = [[13, 24], [32, 13], [54, 12], [77, 17], [90, 39], [85, 72], [65, 84], [43, 85], [23, 79], [9, 54]];

export default function LabsConstellation({ apps }: { apps: readonly AppLink[] }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`labs-universe ${paused ? "is-paused" : ""}`}>
      <div className="labs-universe__stage">
        <div className="labs-universe__rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="labs-universe__core" aria-hidden="true">
          <span className="labs-universe__spark">+</span>
          <strong>Different work.<br />One connected world.</strong>
          <span>BUILT FOR ERPNext</span>
        </div>
        <nav aria-label="Explore nsdLabs apps">
          <ul className="labs-universe__apps">
            {apps.map((app, i) => (
              <li key={app.id} style={{ "--x": `${positions[i][0]}%`, "--y": `${positions[i][1]}%`, "--delay": `${i * -.63}s` } as CSSProperties}>
                <a href={`#${app.id}`} className="labs-universe__app">
                  <Image src={`/nsdlabs/apps/${app.id}.png`} alt="" width={80} height={80} sizes="(max-width: 600px) 64px, 80px" />
                  <span>{app.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="labs-universe__caption">
        <p>Select an app. Find your next possibility.</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="labs-universe__pause">{paused ? "Resume animation" : "Pause animation"}</button>
      </div>
    </div>
  );
}
