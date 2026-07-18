import type { APIRoute } from "astro";
import { Resend } from "resend";
import { site } from "../../config";

// This is the ONLY on-demand route. Everything else is prerendered static.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escape user input before interpolating into the HTML email body. */
function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  // Does the client want a JSON reply (fetch), or is this a no-JS navigation?
  const wantsJson =
    request.headers.get("x-requested-with") === "fetch" ||
    (request.headers.get("accept") || "").includes("application/json");

  const redirect = (path: string) =>
    new Response(null, { status: 303, headers: { Location: path } });

  // Lenient same-site guard (replaces Astro's checkOrigin, which misfires
  // behind Vercel's proxy). Only reject when an Origin/Referer is present AND
  // it clearly points to a foreign site. Missing header → allowed (the
  // honeypot + server-side validation still guard against abuse).
  const originHeader =
    request.headers.get("origin") || request.headers.get("referer") || "";
  if (originHeader) {
    try {
      const host = new URL(originHeader).hostname;
      const sameSite =
        host === "ad-ascent.com" ||
        host.endsWith(".ad-ascent.com") ||
        host === "localhost" ||
        host === "127.0.0.1";
      if (!sameSite) {
        return wantsJson
          ? json({ ok: false, error: "Forbidden." }, 403)
          : redirect("/thanks?error=1");
      }
    } catch {
      // Malformed header — allow through; other protections still apply.
    }
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return wantsJson ? json({ ok: false, error: "Invalid form submission." }, 400) : redirect("/thanks?error=1");
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();

  // 1) Honeypot — a real user never fills this hidden field.
  if (get("company_website")) {
    // Pretend success so bots don't learn they were caught.
    return wantsJson ? json({ ok: true }) : redirect("/thanks");
  }

  // 2) Collect + validate.
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const company = get("company");
  const budget = get("budget");
  const message = get("message");

  const errors: string[] = [];
  if (!name) errors.push("Name is required.");
  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("Email is invalid.");
  if (!message) errors.push("Message is required.");
  if (name.length > 120 || email.length > 160 || message.length > 5000) {
    errors.push("One or more fields are too long.");
  }

  if (errors.length) {
    return wantsJson
      ? json({ ok: false, error: errors.join(" ") }, 400)
      : redirect("/thanks?error=1");
  }

  // 3) Send via Resend.
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return wantsJson
      ? json({ ok: false, error: "Email service is not configured yet. Please email us directly." }, 500)
      : redirect("/thanks?error=1");
  }

  const resend = new Resend(apiKey);

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["WhatsApp", phone || "—"],
    ["Company", company || "—"],
    ["Monthly ad budget", budget || "—"],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0b0d12">
      <div style="background:#0b0d12;color:#e7e9ee;padding:20px 24px;border-radius:14px 14px 0 0">
        <h1 style="margin:0;font-size:18px">New lead from Ad-Ascent</h1>
        <p style="margin:6px 0 0;font-size:13px;color:#9aa3b2">Submitted via ad-ascent.com contact form</p>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none">
        ${rows
          .map(
            ([k, v], i) => `
          <tr style="background:${i % 2 ? "#f7f8fa" : "#ffffff"}">
            <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#55617a;width:150px;vertical-align:top">${esc(k)}</td>
            <td style="padding:10px 16px;font-size:14px;color:#0b0d12">${esc(v)}</td>
          </tr>`,
          )
          .join("")}
        <tr style="background:#ffffff">
          <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#55617a;vertical-align:top">Message</td>
          <td style="padding:10px 16px;font-size:14px;color:#0b0d12;white-space:pre-wrap">${esc(message)}</td>
        </tr>
      </table>
      <p style="font-size:12px;color:#9aa3b2;margin:16px 0 0">Reply directly to this email to reach ${esc(name)}.</p>
    </div>`;

  const text = [
    "New lead from Ad-Ascent",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    `Message: ${message}`,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: site.fromEmail,
      to: site.contactEmail,
      replyTo: email,
      subject: `New lead from Ad-Ascent site — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return wantsJson
        ? json({ ok: false, error: "We couldn't send your message. Please email us directly." }, 502)
        : redirect("/thanks?error=1");
    }
  } catch (err) {
    console.error("Unexpected send failure:", err);
    return wantsJson
      ? json({ ok: false, error: "Unexpected error. Please try again shortly." }, 500)
      : redirect("/thanks?error=1");
  }

  return wantsJson ? json({ ok: true }) : redirect("/thanks");
};

// Any non-POST hitting the endpoint gets a clear 405.
export const ALL: APIRoute = () =>
  json({ ok: false, error: "Method not allowed." }, 405);
