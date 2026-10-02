import { randomUUID } from "node:crypto";
import logo from "./nest-logo.json";

export type EmailContent = { text: string; html?: string };
const base64 = (value: string) => Buffer.from(value, "utf8").toString("base64").match(/.{1,76}/g)?.join("\r\n") || "";
export const validMailbox = (value: string) => /^[^\s@<>\x00-\x1f\x7f]+@[^\s@<>\x00-\x1f\x7f]+\.[^\s@<>\x00-\x1f\x7f]+$/.test(value);

export function serializeEmail(from: string, to: string, subject: string, content: EmailContent) {
  if (!validMailbox(from) || !validMailbox(to)) throw new Error("Invalid email address.");
  const id = randomUUID();
  const alternative = `alternative_${id}`, related = `related_${id}`;
  // Encode subjects in short RFC 2047 words, without splitting Unicode characters.
  const subjectChunks = Array.from(subject.replace(/[\r\n]/g, " ")).reduce<string[]>((chunks, char) => {
    if (!chunks.length || Buffer.byteLength(chunks[chunks.length - 1] + char) > 42) chunks.push(char);
    else chunks[chunks.length - 1] += char;
    return chunks;
  }, []);
  const headers = [`From: Nest Software Development <${from}>`, `To: ${to}`, `Reply-To: inquiry@nsd-eg.com`, `Subject: ${subjectChunks.map(chunk => `=?UTF-8?B?${Buffer.from(chunk).toString("base64")}?=`).join("\r\n ")}`, `Date: ${new Date().toUTCString()}`, `Message-ID: <${id}@nsd-eg.com>`, "MIME-Version: 1.0"];
  const part = (type: string, value: string) => `Content-Type: ${type}; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${base64(value)}`;
  if (!content.html) return [...headers, part("text/plain", content.text)].join("\r\n");
  return [...headers, `Content-Type: multipart/alternative; boundary="${alternative}"`, "", `--${alternative}`, part("text/plain", content.text), `--${alternative}`, `Content-Type: multipart/related; boundary="${related}"`, "", `--${related}`, part("text/html", content.html), `--${related}`, 'Content-Type: image/png; name="nest.png"', "Content-Transfer-Encoding: base64", "Content-ID: <nest-logo>", 'Content-Disposition: inline; filename="nest.png"', "", logo.base64.match(/.{1,76}/g)!.join("\r\n"), `--${related}--`, `--${alternative}--`, ""].join("\r\n");
}
