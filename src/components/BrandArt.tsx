import Image from "next/image";
/** Original generated illustrations, with the supplied brand marks preserved. */
export default function BrandArt({variant,logo,name}: {variant:string;logo:string;name:string;instance?:string}) {
  const asset = variant === "prism" ? "onespace" : variant === "wave" ? "voice" : "cloud";
  return <div className="art art--illustrated">
    <Image className="art__illustration" src={`/illustrations/${asset}.png`} alt="" fill sizes="(max-width: 900px) 90vw, 60vw" />
    <div className="art__logo"><Image src={logo} alt={name} width={190} height={72} sizes="190px" /></div>
  </div>;
}
