"use client";

import { useEffect, useRef, useState } from "react";
import { contact, site } from "@/lib/content";
import Reveal from "./Reveal";
import Accent from "./Accent";

const productOptions = [
  { value: "onespace", label: "OneSpace ERP", note: "Operations, finance, stock" },
  { value: "miravoice", label: "MiraVoice", note: "Business calls and routing" },
  { value: "nestcloud", label: "nsdCloud", note: "Hosting and continuity" },
  { value: "digital", label: "Digital products", note: "Websites, apps, and growth" },
] as const;

type FormState = { products: string[]; name: string; company: string; email: string; phone: string; timeline: string; message: string; website: string };
const initialForm: FormState = { products: [], name: "", company: "", email: "", phone: "", timeline: "", message: "", website: "" };

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const toggleProduct = (value: string) => setForm((current) => ({ ...current, products: current.products.includes(value) ? current.products.filter((item) => item !== value) : [...current.products, value] }));
  useEffect(() => {
    if (step > 1) formRef.current?.querySelector<HTMLElement>("legend")?.focus();
  }, [step]);
  const next = () => { if (step === 2 && !formRef.current?.reportValidity()) return; if (step === 1 && form.products.length === 0) { setError("Choose at least one area so we can route your enquiry well."); return; } setError(""); setStep((current) => Math.min(current + 1, 3)); };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your enquiry.");
      setStatus("sent");
    } catch (submissionError) { setStatus("idle"); setError(submissionError instanceof Error ? submissionError.message : "We could not send your enquiry."); }
  };

  return <section id="contact" className="contact section" data-bg="cream"><div className="container contact__grid">
    <Reveal><p className="t-eyebrow t-muted">{contact.eyebrow}</p><h2 className="t-h2">{contact.heading}{/[.?!]$/.test(contact.heading) ? null : <Accent />}</h2><p className="contact__intro t-lead t-muted">Tell us what is changing in your business. We will shape the right conversation around it.</p><dl className="contact__meta"><div><dt className="t-mono t-muted">{contact.labels.email}</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div><div><dt className="t-mono t-muted">{contact.labels.phone}</dt><dd><a href={`tel:${site.phoneHref}`}>{site.phone}</a></dd></div><div><dt className="t-mono t-muted">{contact.labels.location}</dt><dd>{site.location}</dd></div></dl></Reveal>
    <Reveal delay={120} className="contact__panel">{status === "sent" ? <div className="contact__done" role="status"><p className="t-eyebrow">ENQUIRY RECEIVED</p><h3 className="t-h3">We have your starting point.</h3><p className="t-body t-muted">A confirmation is on its way to {form.email}. Our team will review your needs and follow up shortly.</p><button type="button" className="btn btn-ghost" onClick={() => { setForm(initialForm); setStep(1); setStatus("idle"); }}>Start another enquiry</button></div> : <form ref={formRef} aria-busy={status === "sending"} className="contact__form" onSubmit={onSubmit}>
      <div className="questionnaire__top"><span className="t-mono">STEP {step} OF 3</span><span className="questionnaire__progress" role="progressbar" aria-label="Enquiry progress" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}><i style={{ width: `${(step / 3) * 100}%` }} /></span></div>
      {step === 1 && <fieldset className="questionnaire__step"><legend tabIndex={-1} className="t-h3">What should we help you move forward?</legend><p className="t-body t-muted">Select every area that belongs in the conversation.</p><div className="product-choices">{productOptions.map((product) => <label className={`product-choice ${form.products.includes(product.value) ? "is-selected" : ""}`} key={product.value}><input type="checkbox" checked={form.products.includes(product.value)} onChange={() => toggleProduct(product.value)} /><span><strong>{product.label}</strong><small>{product.note}</small></span><b aria-hidden="true">✓</b></label>)}</div></fieldset>}
      {step === 2 && <fieldset className="questionnaire__step"><legend tabIndex={-1} className="t-h3">Give us the useful context.</legend><p className="t-body t-muted">A few details help us arrive prepared.</p><label className="field"><span className="field__label">Company</span><input name="company" autoComplete="organization" value={form.company} onChange={(e) => update("company", e.target.value)} required /></label><label className="field"><span className="field__label">What are you trying to improve?</span><textarea name="message" value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} required /></label><label className="field"><span className="field__label">When would you like to start?</span><select name="timeline" value={form.timeline} onChange={(e) => update("timeline", e.target.value)} required><option value="">Choose a timeframe</option><option>Exploring options</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Ready to start</option></select></label></fieldset>}
      {step === 3 && <fieldset className="questionnaire__step"><legend tabIndex={-1} className="t-h3">Where should we send your reply?</legend><p className="t-body t-muted">We will email you a confirmation and use these details to continue the conversation.</p><label className="field"><span className="field__label">Your name</span><input name="name" value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" required /></label><label className="field"><span className="field__label">Email address</span><input name="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" required /></label><label className="field"><span className="field__label">Phone <small>(optional)</small></span><input type="tel" name="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label><input className="questionnaire__trap" name="website" value={form.website} onChange={(e) => update("website", e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" /></fieldset>}
      {error && <p className="questionnaire__error" role="alert">{error}</p>}<div className="questionnaire__actions">{step > 1 && <button type="button" disabled={status === "sending"} className="btn btn-ghost" onClick={() => { setError(""); setStep((current) => current - 1); }}>Back</button>}{step < 3 ? <button type="button" className="btn btn-primary" onClick={next}>Continue</button> : <button type="submit" className="btn btn-primary" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send my enquiry"}</button>}</div><p className="questionnaire__privacy t-body t-muted">Your details are used only to respond to this enquiry.</p>
    </form>}</Reveal>
  </div></section>;
}
