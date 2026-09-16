import { NextResponse, type NextRequest } from 'next/server';
import { contactForm } from '../../../content/contact';
import { needsTelephone, readFields, validateContact, type ContactFields } from '../../../components/contactValidation';

// POST /api/contact
//
// Receives the enquiry form, validates every field again on the server, and
// sends it to the client's inbox through Resend, with Reply-To set to the
// enquirer. Nothing is stored: the email is the only record.
//
// Configuration comes only from the server environment, never the client
// bundle: RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.
//
// Responses: 200 { ok: true }, 400 { ok: false, errors } for invalid fields,
// or { ok: false, reason } with 400, 413, 429 or 500.

export const runtime = 'nodejs';

// Rate limit: a few messages per connection in a short window. Kept in memory,
// so it is per server instance and resets when an instance is recycled. That
// is enough to blunt a script hammering the form; see CONTACT_RATE_LIMIT in
// PLACEHOLDERS.md.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_IN_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = hits.length >= MAX_IN_WINDOW;
  if (!limited) hits.push(now);
  recent.set(key, hits);

  // Keep the map from growing without bound.
  if (recent.size > 1000) {
    for (const [k, times] of recent) {
      if (times.every((t) => now - t >= WINDOW_MS)) recent.delete(k);
    }
  }
  return limited;
}

const MAX_BODY_BYTES = 20_000;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function buildEmail(fields: ContactFields) {
  const method = contactForm.methods.find((m) => m.value === fields.method)?.label ?? '';
  const telephone = fields.telephone || 'Not given';
  const rows: [string, string][] = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Ideal method of initial contact', method],
    ['Telephone', telephone],
  ];

  // A line break in a subject line is never legitimate.
  const subject = `Website enquiry from ${fields.name.replace(/[\r\n]+/g, ' ')}`;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    fields.message,
    '',
    needsTelephone(fields.method)
      ? `They would like to be contacted by ${method.toLowerCase()} on ${telephone}.`
      : 'They would like to be contacted by email. Reply to this email to respond.',
  ].join('\n');

  const html = `<div style="font-family: sans-serif; font-size: 15px; line-height: 1.5; color: #000;">
<h2 style="font-size: 18px; margin: 0 0 16px;">New website enquiry</h2>
<table style="border-collapse: collapse;">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding: 4px 16px 4px 0; font-weight: bold; vertical-align: top;">${escapeHtml(label)}</td><td style="padding: 4px 0;">${escapeHtml(value)}</td></tr>`
  )
  .join('\n')}
</table>
<h3 style="font-size: 15px; margin: 20px 0 8px;">Message</h3>
<div style="white-space: pre-wrap;">${escapeHtml(fields.message)}</div>
</div>`;

  return { subject, text, html };
}

const fail = (reason: string, status: number) => NextResponse.json({ ok: false, reason }, { status });

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(ip)) return fail('rate-limited', 429);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail('too-large', 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail('invalid', 400);
  }

  const fields = readFields(body);

  // A filled honeypot is a bot. Report success so it learns nothing, and
  // send nothing.
  if (fields.website) return NextResponse.json({ ok: true });

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set');
    return fail('failed', 500);
  }

  const { subject, text, html } = buildEmail(fields);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], reply_to: fields.email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      // Resend's error body names the problem; it never contains the key.
      console.error('Contact form: Resend responded', response.status, await response.text());
      return fail('failed', 500);
    }
  } catch (error) {
    console.error('Contact form: sending failed', error);
    return fail('failed', 500);
  }

  return NextResponse.json({ ok: true });
}
