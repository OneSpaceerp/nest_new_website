import { NextResponse } from "next/server";
import tls from "node:tls";
import { inquiryConfirmation, productLabel } from "@/lib/email/inquiry-confirmation";
import { serializeEmail, validMailbox, type EmailContent } from "@/lib/email/mime";

export const runtime = "nodejs";

type Inquiry = { products?: unknown; name?: unknown; company?: unknown; email?: unknown; phone?: unknown; timeline?: unknown; message?: unknown; website?: unknown };

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
function smtpSend(to: string, subject: string, content: EmailContent) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || user;
  if (!host || !user || !password || !from) throw new Error("Email service is not configured.");
  const payload = serializeEmail(from, to, subject, content);

  return new Promise<void>((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host, rejectUnauthorized: true });
    let buffer = "";
    let settled = false;
    let phase = "greeting";
    const fail = (error: Error) => { if (!settled) { settled = true; socket.destroy(); reject(error); } };
    const finish = () => { if (!settled) { settled = true; socket.end(); resolve(); } };
    const send = (command: string) => socket.write(`${command}\r\n`);
    const readResponse = (): { code: number; message: string } | null => {
      const match = buffer.match(/^(\d{3})([ -])(.*?)(?:\r\n|\n)/);
      if (!match) return null;
      const code = Number(match[1]);
      const complete = match[2] === " ";
      buffer = buffer.slice(match[0].length);
      return complete ? { code, message: match[3] } : readResponse();
    };
    socket.setTimeout(15000, () => fail(new Error("Email server timed out.")));
    socket.on("error", fail);
    socket.on("close", () => { if (!settled) fail(new Error("Email server closed the connection unexpectedly.")); });
    socket.on("data", (chunk) => {
      buffer += chunk.toString();
      let response: { code: number; message: string } | null;
      while ((response = readResponse())) {
        if (response.code >= 400) return fail(new Error(`Email server rejected the request (${response.code}).`));
        if (response.code === 220 && phase === "greeting") { phase = "ehlo"; send("EHLO nsd-eg.com"); }
        else if (response.code === 250 && phase === "ehlo") { phase = "auth-user"; send("AUTH LOGIN"); }
        else if (response.code === 334 && phase === "auth-user") { phase = "auth-password"; send(Buffer.from(user).toString("base64")); }
        else if (response.code === 334 && phase === "auth-password") { phase = "mail-from"; send(Buffer.from(password).toString("base64")); }
        else if (response.code === 235 && phase === "mail-from") { phase = "rcpt-to"; send(`MAIL FROM:<${from}>`); }
        else if (response.code === 250 && phase === "rcpt-to") { phase = "data"; send(`RCPT TO:<${to}>`); }
        else if (response.code === 250 && phase === "data") { phase = "body"; send("DATA"); }
        else if (response.code === 354 && phase === "body") { socket.write(`${payload}\r\n.\r\n`); }
        else if (response.code === 250 && phase === "body") { phase = "quit"; send("QUIT"); }
        else if (response.code === 221) finish();
      }
    });
  });
}

export async function POST(request: Request) {
  try {
    const input = await request.json() as Inquiry;
    if (text(input.website)) return NextResponse.json({ ok: true });
    const name = text(input.name), email = text(input.email), company = text(input.company), message = text(input.message);
    const products = Array.isArray(input.products) ? input.products.map(text).filter(Boolean) : [];
    const timeline = text(input.timeline), phone = text(input.phone);
    if (!name || !company || !email || !message || !timeline || products.length === 0 || !validMailbox(email)) return NextResponse.json({ error: "Please complete the required fields before sending." }, { status: 400 });
    const details = [`Name: ${name}`, `Company: ${company}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Timeline: ${timeline}`, `Products: ${products.map(productLabel).join(", ")}`, "", "What they want to improve:", message].join("\n");
    const inbox = process.env.INQUIRY_TO || "inquiry@nsd-eg.com";
    await smtpSend(inbox, `Website enquiry from ${name}`, { text: details });
    await smtpSend(email, "We received your Nest enquiry", inquiryConfirmation({ name, company, products, timeline, message }));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry email failed", error);
    return NextResponse.json({ error: "We could not send your enquiry right now. Please email inquiry@nsd-eg.com directly." }, { status: 500 });
  }
}
