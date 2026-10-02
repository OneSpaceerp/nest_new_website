export type ConfirmationDetails = {
  name: string;
  company: string;
  products: string[];
  timeline: string;
  message: string;
};

const productLabels: Record<string, string> = {
  onespace: "OneSpace ERP", miravoice: "MiraVoice", nestcloud: "NestCloud", digital: "Digital products",
};
export const productLabel = (value: string) => productLabels[value] || value;
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);

export function inquiryConfirmation(details: ConfirmationDetails) {
  const products = details.products.map(productLabel);
  const text = `Hi ${details.name},\n\nThank you for telling us where you want to move forward. We have received your enquiry and our team will be in touch shortly.\n\nYOUR ENQUIRY\nCompany: ${details.company}\nSelected areas: ${products.join(", ")}\nTimeframe: ${details.timeline}\n\nWhat you want to improve:\n${details.message}\n\nWHAT HAPPENS NEXT\nWe review your needs, connect you with the right team, and discuss the next steps with you.\n\nHave something to add? Reply to this email.\n\nNest Software Development\nThe all-in-one technical partner\nhttps://nsd-eg.com\n+20 10 2196 5445\n6th of October City, Giza, Egypt`;
  const row = (label: string, value: string) => `<tr><td style="padding:0 0 18px;word-break:break-word;overflow-wrap:anywhere;"><p style="margin:0 0 6px;font:11px/1.5 'Courier New',monospace;letter-spacing:1.5px;color:#625b55;">${label}</p><p dir="auto" style="margin:0;font-size:16px;line-height:1.65;color:#221e1b;">${escapeHtml(value).replace(/\r?\n/g, "<br>")}</p></td></tr>`;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>We received your Nest enquiry</title>
<style>body{margin:0;padding:0}table{border-collapse:collapse}a{color:#016a7f}@media only screen and (max-width:620px){.outer{padding:16px 8px!important}.pad{padding-left:24px!important;padding-right:24px!important}.headline{font-size:36px!important;line-height:1.12!important}.summary{padding:22px!important}}</style></head>
<body style="margin:0;padding:0;background:#eee9e6;font-family:Arial,Helvetica,sans-serif;color:#221e1b;">
<div style="display:none;font-size:1px;line-height:1px;color:#eee9e6;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">Your enquiry is with our team. Here is your starting point, and what happens next.</div>
<table role="presentation" width="100%" style="background:#eee9e6;"><tr><td class="outer" align="center" style="padding:40px 16px;">
<!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
<table role="presentation" width="100%" style="max-width:600px;background:#f7f2ef;border-radius:24px;">
<tr><td class="pad" style="padding:36px 40px 28px;border-top:5px solid #02c8f0;">
<a href="https://nsd-eg.com" style="text-decoration:none;"><img src="cid:nest-logo" width="120" height="34" alt="Nest" style="display:block;border:0;width:120px;height:34px;color:#016a7f;font-size:28px;font-weight:bold;"></a>
<p style="margin:10px 0 0;font-size:11px;letter-spacing:1px;color:#625b55;">SOFTWARE DEVELOPMENT</p></td></tr>
<tr><td class="pad" style="padding:8px 40px 30px;">
<p style="margin:0 0 18px;font:11px/1.6 'Courier New',monospace;letter-spacing:2px;color:#016a7f;">YOUR NEXT CHAPTER STARTS HERE</p>
<h1 class="headline" style="margin:0 0 26px;font-size:46px;line-height:1.08;letter-spacing:-1.8px;font-weight:700;color:#221e1b;">Great things start<br>with a conversation<span style="color:#02c8f0;">.</span></h1>
<p dir="auto" style="margin:0 0 12px;font-size:18px;line-height:1.6;">Hi ${escapeHtml(details.name)},</p>
<p style="margin:0;font-size:16px;line-height:1.8;color:#625b55;">Thank you for telling us where you want to move forward. Your enquiry is with our team, and we will be in touch shortly.</p>
</td></tr>
<tr><td class="pad" style="padding:0 40px 32px;"><table role="presentation" width="100%" style="background:#eee9e6;border-radius:18px;"><tr><td class="summary" style="padding:28px;">
<p style="margin:0 0 24px;font:11px/1.6 'Courier New',monospace;letter-spacing:2px;color:#016a7f;">YOUR STARTING POINT</p>
<table role="presentation" width="100%" style="table-layout:fixed;">${row("COMPANY", details.company)}${row("SELECTED AREAS", products.join(" · "))}${row("YOUR TIMEFRAME", details.timeline)}${row("WHAT YOU WANT TO IMPROVE", details.message)}</table>
</td></tr></table></td></tr>
<tr><td class="pad" style="padding:0 40px 34px;"><h2 style="margin:0 0 20px;font-size:24px;line-height:1.3;letter-spacing:-.5px;">What happens next?</h2>
<table role="presentation" width="100%">
${[["01", "We listen.", "We review your goals and the challenges behind them."], ["02", "We connect the right people.", "Your enquiry reaches the team best placed to help."], ["03", "We shape the next step.", "Together, we discuss an approach that fits your business."]].map(([number, heading, copy]) => `<tr><td width="40" valign="top" style="padding:0 12px 20px 0;font:13px/1.8 'Courier New',monospace;color:#016a7f;">${number}</td><td style="padding:0 0 20px;"><p style="margin:0 0 4px;font-size:16px;line-height:1.5;font-weight:bold;">${heading}</p><p style="margin:0;font-size:14px;line-height:1.7;color:#625b55;">${copy}</p></td></tr>`).join("")}
</table>
<p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:#625b55;">Something else on your mind? Simply reply to this email.</p>
<table role="presentation"><tr><td bgcolor="#02c8f0" style="border-radius:30px;text-align:center;mso-padding-alt:16px 28px;"><a href="mailto:inquiry@nsd-eg.com" style="display:inline-block;padding:16px 28px;font-size:15px;font-weight:bold;color:#13100f;text-decoration:none;border-radius:30px;">Continue the conversation &rarr;</a></td></tr></table>
</td></tr>
<tr><td class="pad" style="padding:28px 40px;background:#13100f;border-radius:0 0 24px 24px;">
<p style="margin:0 0 8px;font-size:17px;line-height:1.5;font-weight:bold;color:#f7f2ef;">One connected partner. More possibilities.</p>
<p style="margin:0 0 22px;font-size:13px;line-height:1.8;color:#c7beb8;">ERP &nbsp; / &nbsp; Communications &nbsp; / &nbsp; Cloud &nbsp; / &nbsp; Digital</p>
<p style="margin:0 0 6px;font-size:12px;line-height:1.8;color:#c7beb8;">Nest Software Development<br>6th of October City, Giza, Egypt</p>
<p style="margin:0;font-size:12px;line-height:1.8;"><a href="https://nsd-eg.com" style="color:#02c8f0;text-decoration:none;">nsd-eg.com</a> &nbsp; <a href="tel:+201021965445" style="color:#c7beb8;text-decoration:none;">+20 10 2196 5445</a></p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
<p style="max-width:520px;margin:20px 16px 0;font-size:11px;line-height:1.7;color:#625b55;">You received this confirmation because you submitted an enquiry to Nest.</p>
</td></tr></table></body></html>`;
  return { text, html };
}
