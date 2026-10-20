import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(form: FormData, name: string, max: number) {
  return String(form.get(name) ?? "").trim().slice(0, max);
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = request.headers.get("accept")?.includes("application/json");
  const respond = (ok: boolean, error?: string, status = ok ? 200 : 400) =>
    wantsJson
      ? new Response(JSON.stringify({ ok, error }), { status, headers: { "Content-Type": "application/json" } })
      : redirect(ok ? "/contact?sent=1" : "/contact?error=1", 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(false, "Invalid form submission.");
  }

  // Bots fill the hidden field; pretend it worked.
  if (field(form, "company_website", 200)) return respond(true);

  const name = field(form, "name", 120);
  const email = field(form, "email", 200);
  const organisation = field(form, "organisation", 200);
  const interest = field(form, "interest", 80);
  const message = field(form, "message", 4000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10 || form.get("consent") !== "on") {
    return respond(false, "Please complete all the required fields.");
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.CONTACT_FROM_EMAIL;

  // Concept build: without credentials, log the enquiry instead of sending it.
  if (!apiKey || !to || !from) {
    console.info("[contact] enquiry received (email not configured)", { name, email, organisation, interest });
    return respond(true);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `New enquiry: ${interest || "General"} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation || "-"}\nInterest: ${interest}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return respond(false, "We couldn't send your message. Please email us instead.", 502);
  }

  return respond(true);
};
