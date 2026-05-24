// ===== GOOGLE APPS SCRIPT — RSVP → GOOGLE SHEETS =====
//
// Managed with clasp. See README for full setup instructions.
//
// ── Deploying changes ──────────────────────────────────────────────────────────
//   clasp push                          # push gas/ to Apps Script editor
//   clasp deploy --description "..."    # create a new versioned deployment
//   clasp open                          # open editor in browser
//
//   ⚠️  doPost is only live on the *deployed* version. Push alone is not enough.
//       Run `clasp deployments` to confirm the active deployment URL.
//
// ── First-time setup (manual fallback without clasp) ──────────────────────────
//   1. Open your Google Sheets document
//   2. Extensions → Apps Script → paste contents of this file → Save
//   3. Deploy → New deployment → Web app
//      Execute as: Me | Who has access: Anyone
//   4. Copy the Web App URL → set as GOOGLE_SCRIPT_URL in Netlify env
//
// ── Script Properties (Project Settings → Script Properties) ──────────────────
//   RSVP_SECRET        — shared secret; must match GOOGLE_SCRIPT_SECRET in Netlify env
//   NOTIFICATION_EMAIL — couple's email address for new RSVP notifications (comma seperated if multiple)
//
// ── Sheet columns (row 1 headers) ─────────────────────────────────────────────
//   Timestamp | First Name | Last Name | Email | Phone | Attendance | Guest Count
//   | Additional Guests | Friday Evening BBQ | Sunday Recovery Breakfast
//   | Staying On Site | Travel Plans | Dietary Restrictions | Message

// ─── Configuration ────────────────────────────────────────────────────────────

const SHEET_NAME = 'RSVP-from-website';
// Read from Script Properties — see setup instructions above.
const SECRET = PropertiesService.getScriptProperties().getProperty('RSVP_SECRET') || '';
const NOTIFICATION_EMAIL =
  PropertiesService.getScriptProperties().getProperty('NOTIFICATION_EMAIL') || '';

// ─── Main entry point ─────────────────────────────────────────────────────────

function doPost(e) {
  console.info('doPost: request received');
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found. Please create it or check the name.`);
    }

    const data = JSON.parse(e.postData.contents);
    const debugMode = data.debugMode || false;
    if (debugMode) {
      console.info(
        'doPost: DEBUG MODE ENABLED — sending all emails to NOTIFICATION_EMAIL address',
        NOTIFICATION_EMAIL
      );
    }
    data.debugMode = debugMode; // pass debugMode flag to email functions
    console.info('doPost: parsed payload for', data.email || '(no email)');

    if (SECRET && data.secret !== SECRET) {
      console.warn('doPost: unauthorized request — secret mismatch');
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', message: 'Unauthorized' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (data.email && isDuplicateEmail(sheet, data.email)) {
      console.warn('doPost: duplicate email rejected —', data.email);
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'duplicate', message: 'Email already submitted.' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    const rowData = [
      new Date(data.timestamp),
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.attendance,
      data.guestCount,
      (data.additionalGuestNames || []).join(', '),
      data.fridayEveningBbq,
      data.sundayRecoveryBreakfast,
      data.stayingOnSite,
      (data.travelPlans || []).join(', '),
      data.dietaryRestrictions,
      data.message,
    ];

    console.info('doPost: appending row to sheet for', data.email);
    sheet.appendRow(rowData);
    console.info('doPost: row appended successfully');

    if (data.email) {
      sendConfirmationEmail(data);
    }

    sendEmailNotification(data);

    console.info('doPost: completed successfully for', data.email);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    console.error('doPost: unhandled error —', error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── Sheet helpers ────────────────────────────────────────────────────────────

// Check if an email address already exists in the sheet (column index 3, 0-based).
// Skips the header row. Case-insensitive.
function isDuplicateEmail(sheet, email) {
  const data = sheet.getDataRange().getValues();
  const normalizedEmail = email.trim().toLowerCase();
  for (let i = 1; i < data.length; i++) {
    const existingEmail = (data[i][3] || '').toString().trim().toLowerCase();
    if (existingEmail === normalizedEmail) {
      console.info('isDuplicateEmail: found existing entry for', normalizedEmail);
      return true;
    }
  }
  return false;
}

// ─── Email helpers ────────────────────────────────────────────────────────────

// ─── Email theme — email-safe hex values derived from app.css design tokens ─
// Emails are always rendered light-mode. These are fixed values — no dark/light
// switching. oklch tokens are converted to their closest sRGB hex equivalent.
//
// Token source → oklch value → hex used
//   --color-foreground (light)  oklch(13.63% 0.0364 259.2) → #1a1f2e  (dark navy, used as header bg)
//   --color-foreground (dark)   oklch(98.42% 0.0034 247.9) → #f8fafc  (near-white text on dark header)
//   --color-accent (light)      oklch(74.94% 0.0745 226)   → #66adcc  (links, highlights — brighter than primary)
//   --color-muted-foreground    oklch(48.87% 0.041  251.2) → #64748b  (label/secondary text)
//   --color-border (light)      oklch(88.53% 0.0128 228.9) → #cbd5e1  (dividers, table borders)
const EMAIL_THEME = {
  headerBg: '#1a1f2e', // --color-foreground light (dark navy — used as email header)
  headerText: '#f8fafc', // --color-foreground dark  (near-white on dark header)
  headerSub: '#94a3b8', // slate-400 — muted subtitle on dark header
  accent: '#66adcc', // --color-accent light (links, highlights)
  accentLight: '#eaf4f9', // tint of accent — alternating table row
  bodyBg: '#f8fafc', // off-white outer background
  cardBg: '#ffffff', // --color-card light
  text: '#1a1f2e', // --color-foreground light
  muted: '#64748b', // --color-muted-foreground light
  border: '#cbd5e1', // --color-border light
  footerBg: '#f1f5f9', // slightly off-white footer
  fontSans: "'Raleway', 'Helvetica Neue', Helvetica, Arial, sans-serif", // --font-sans
  fontHeading: "'Special Elite', 'Courier New', Courier, monospace", // --font-heading-2
  siteUrl: 'https://nicoleandjordy.wedding',
};

// Helper from bool -> Yes/No for email text rendering.
const yn = (val) => (val === true ? 'Yes' : 'No');

// Text divider for plain-text emails.
const divider = '─'.repeat(42);

// Build a structured data object for the confirmation email — keeps rendering logic separate.
function buildConfirmationEmailData(data) {
  const isAttending = data.attendance;
  const guestNames = (data.additionalGuestNames || []).filter(Boolean);

  return {
    firstName: data.firstName || 'Friend',
    fullName: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
    email: data.email,
    isAttending: isAttending,
    guestCount: data.guestCount,
    guestNames: guestNames,
    fridayBbq: isAttending ? data.fridayEveningBbq : null,
    sundayBreakfast: isAttending ? data.sundayRecoveryBreakfast : null,
    stayingOnSite: isAttending ? data.stayingOnSite : null,
    travelPlans: isAttending ? data.travelPlans || [] : [],
    dietaryRestrictions: isAttending ? data.dietaryRestrictions : null,
    message: data.message ? data.message : null,
  };
}

// Render the HTML confirmation email from structured email data.
function renderConfirmationEmailHtml(emailData) {
  const t = EMAIL_THEME;

  const heading = emailData.isAttending
    ? `See you there, ${emailData.firstName}! 🎊`
    : `Thanks for letting us know, ${emailData.firstName} 💌`;

  const intro = emailData.isAttending
    ? `<p style="margin:0 0 12px;line-height:1.7;">We are <strong>SO</strong> excited you're coming! We can't wait to celebrate with you. 🥂</p>
       <p style="margin:0 0 12px;line-height:1.7;">Snags on the Barbie, tinnies of VB and cringy live, laugh, love. 🫒😂💖</p>
       <p style="margin:0;line-height:1.7;">We (Jordy) will be updating our website leading up to the wedding. 🤓💻</p>
       <p style="margin:0;line-height:1.7;">Any questions, just flick us a message. 🙋</p>
       <p style="margin:0;line-height:1.7;">We will likely be in touch closer to the date with final details. 🔎🖊️📬</p>
       <p style="margin:0;line-height:1.7;">In the meantime, get ready for that fresh sea air! 🕺💃</p>`
    : `<p style="margin:0 0 12px;line-height:1.7;">Thanks so much for letting us know — we're gutted you can't make it 💔</p>
       <p style="margin:0 0 12px;line-height:1.7;">But we appreciate you taking the time to RSVP. ⏱️</p>
       <p style="margin:0 0 12px;line-height:1.7;">We'll raise a glass in your honour! 🥂</p>
       <p style="margin:0;line-height:1.7;">If plans change, reach out and we'll see what we can do.🎊🎉</p>
       <p style="margin:0;line-height:1.7;">You'll be missed. 😭</p>`;

  // Build summary table rows
  const rows = [];
  if (emailData.isAttending) {
    rows.push(['Name', emailData.fullName]);
    rows.push(['Total Guest Count', String(emailData.guestCount)]);
    rows.push([
      'Additional Guests',
      emailData.guestNames.length > 0 ? emailData.guestNames.join(', ') : '-',
    ]);
    rows.push(['Friday Evening BBQ', yn(emailData.fridayBbq)]);
    rows.push(['Sunday Recovery Breakfast', yn(emailData.sundayBreakfast)]);
    rows.push(['Staying On Site', yn(emailData.stayingOnSite)]);
    rows.push([
      'Getting There',
      emailData.travelPlans.length > 0 ? emailData.travelPlans.join(', ') : '—',
    ]);
    rows.push(['Dietary Requirements', emailData.dietaryRestrictions || '—']);
  }

  const tableRows = rows
    .map(([label, value], i) => {
      const bg = i % 2 === 0 ? t.cardBg : t.accentLight;
      return `<tr style="background:${bg};">
      <td style="padding:10px 16px;color:${t.muted};font-size:13px;font-family:${t.fontSans};width:46%;border-right:1px solid ${t.border};">${label}</td>
      <td style="padding:10px 16px;color:${t.text};font-size:14px;font-family:${t.fontSans};">${value}</td>
    </tr>`;
    })
    .join('');

  const summarySection = emailData.isAttending
    ? `
    <h3 style="margin:36px 0 12px;color:${t.text};font-size:13px;font-family:${t.fontHeading};letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid ${t.border};padding-bottom:10px;">Your RSVP Summary</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${t.border};border-radius:8px;overflow:hidden;border-collapse:separate;border-spacing:0;">
      ${tableRows}
    </table>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&family=Special+Elite&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${t.bodyBg};font-family:${t.fontSans};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${t.bodyBg};padding:40px 0;">
    <tr><td align="center" style="padding:0 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:${t.cardBg};border-radius:12px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 4px 24px rgba(26,31,46,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:${t.headerBg};padding:44px 36px 40px;text-align:center;">
            <p style="margin:0 0 10px;color:${t.accent};font-size:11px;font-family:${t.fontHeading};letter-spacing:4px;text-transform:uppercase;">19th – 21st March 2027</p>
            <h1 style="margin:0 0 10px;color:${t.headerText};font-size:36px;font-family:${t.fontHeading};font-weight:normal;letter-spacing:2px;">Nicole &amp; Jordy</h1>
            <p style="margin:0;color:${t.headerSub};font-size:13px;font-family:${t.fontSans};letter-spacing:1px;">Seacroft Estate · Great Ocean Road · Victoria</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 36px 32px;">
            <h2 style="margin:0 0 20px;color:${t.text};font-size:22px;font-family:${t.fontHeading};font-weight:normal;">${heading}</h2>
            <div style="color:${t.text};font-size:15px;">${intro}</div>
            ${summarySection}
            <div style="margin-top:36px;padding-top:24px;border-top:1px solid ${t.border};">
              <p style="margin:0 0 10px;color:${t.muted};font-size:13px;font-family:${t.fontSans};">Think something's wrong? Drop us a line:</p>
              <p style="margin:0;font-size:14px;font-family:${t.fontSans};line-height:1.8;">
                👰 Nicole — <a href="mailto:nfrances369@gmail.com" style="color:${t.accent};text-decoration:none;">nfrances369@gmail.com</a><br>
                🤵 Jordy — <a href="mailto:jordy_williams@hotmail.co.uk" style="color:${t.accent};text-decoration:none;">jordy_williams@hotmail.co.uk</a>
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${t.footerBg};padding:20px 36px;text-align:center;border-top:1px solid ${t.border};">
            <p style="margin:0 0 6px;color:${t.muted};font-size:12px;font-family:${t.fontSans};">Nicole &amp; Jordy · Seacroft Estate · March 2027 · Great Ocean Road, Victoria</p>
            <a href="${t.siteUrl}" style="color:${t.accent};font-size:12px;font-family:${t.fontSans};text-decoration:none;">${t.siteUrl.replace('https://', '')}</a>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Render the plain-text fallback for the confirmation email.
function renderConfirmationEmailText(emailData) {
  if (!emailData.isAttending) {
    return `Hi ${emailData.firstName},\n\nThanks so much for letting us know - we're gutted you can't make it.\n\nBut we appreciate you taking the time to RSVP.\n\nWe'll raise a glass in your honour!\n\nIf plans change, reach out and we'll see what we can do.\n\nIf plans change, reach out and we'll see what we can do.\n\nYou'll be missed.\n\nWith love,\nNicole & Jordy\n\n${EMAIL_THEME.siteUrl}`;
  }

  const lines = [
    `Hi ${emailData.firstName}!`,
    '',
    `We're SO excited you're coming! We can't wait to celebrate with you.`,
    `Snags on the Barbie, tinnies of VB and cringy live, laugh, love.`,
    `We (Jordy) will be updating our website leading up to the wedding.`,
    `Any questions, just flick us a message.`,
    `We will likely be in touch closer to the date with final details.`,
    `In the meantime, get ready for that fresh sea air!`,
    '',
    `${divider}`,
    '── Your RSVP Summary ──',
    `${divider}`,
    `Name: ${emailData.fullName}`,
    `Total Guest Count: ${emailData.guestCount}`,
    `Additional Guests: ${emailData.guestNames.length > 0 ? emailData.guestNames.join(', ') : '-'}`,
    `Friday Evening BBQ: ${yn(emailData.fridayBbq)}`,
    `Sunday Breakfast: ${yn(emailData.sundayBreakfast)}`,
    `Staying On Site: ${yn(emailData.stayingOnSite)}`,
    `Getting There: ${emailData.travelPlans.length > 0 ? emailData.travelPlans.join(', ') : 'Not specified'}`,
    `Dietary Requirements: ${emailData.dietaryRestrictions || 'None Provided'}`,
  ];

  lines.push(
    '',
    "Think something's wrong? Reach out:",
    '👰 Nicole — nfrances369@gmail.com',
    '🤵 Jordy  — jordy_williams@hotmail.co.uk',
    '',
    'See you on the dance floor! 🕺💃',
    'Nicole & Jordy',
    '',
    EMAIL_THEME.siteUrl
  );
  return lines.join('\n');
}

// Send a confirmation email to the guest who just RSVPed.
function sendConfirmationEmail(data) {
  const emailData = buildConfirmationEmailData(data);

  const subject = emailData.isAttending
    ? "🎉 RSVP Confirmed — Nicole & Jordy's Wedding!"
    : "💌 Thanks for letting us know — Nicole & Jordy's Wedding";
  // Override recipient with NOTIFICATION_EMAIL in debug mode to avoid sending test emails to guests.
  const recipient = data.debugMode ? NOTIFICATION_EMAIL : emailData.email;
  console.info('sendConfirmationEmail: sending to', recipient);
  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      // BCC couple on all confirmation emails for visibility
      bcc: NOTIFICATION_EMAIL,
      body: renderConfirmationEmailText(emailData),
      htmlBody: renderConfirmationEmailHtml(emailData),
    });
    console.info('sendConfirmationEmail: sent successfully to', recipient);
  } catch (error) {
    console.error('sendConfirmationEmail: failed for', recipient, '—', error.toString());
  }
}

// Send a notification email to the couple when a new RSVP arrives.
function sendEmailNotification(data) {
  if (!NOTIFICATION_EMAIL) {
    console.warn('sendEmailNotification: NOTIFICATION_EMAIL not set — skipping');
    return;
  }

  // Reuse the same normalised data object as the guest confirmation email.
  const emailData = buildConfirmationEmailData(data);

  const subject = emailData.isAttending
    ? `🎉 RSVP — ${emailData.fullName} is coming!`
    : `💌 RSVP — ${emailData.fullName} can't make it`;

  const guestLine = emailData.guestNames.length > 0 ? emailData.guestNames.join(', ') : '-';

  const attendingLines = emailData.isAttending
    ? [
        `  Guests: ${emailData.guestCount}`,
        `  Additional: ${guestLine}`,
        `  Friday BBQ: ${yn(emailData.fridayBbq)}`,
        `  Sunday Breakfast: ${yn(emailData.sundayBreakfast)}`,
        `  Staying On Site: ${yn(emailData.stayingOnSite)}`,
        `  Getting There: ${emailData.travelPlans.length > 0 ? emailData.travelPlans.join(', ') : 'Not specified'}`,
        `  Dietary: ${emailData.dietaryRestrictions || 'None Provided'}`,
      ]
    : [];

  const messageLines = emailData.message ? ['', `  Message:`, `  "${emailData.message}"`] : [];

  const body = [
    `New RSVP received from ${emailData.fullName}`,
    divider,
    '',
    `  Name: ${emailData.fullName}`,
    `  Email: ${emailData.email}`,
    `  Phone: ${data.phone || '—'}`,
    `  Attending: ${emailData.isAttending ? 'Yes ✓' : 'No ✗'}`,
    '',
    ...attendingLines,
    ...messageLines,
    '',
    divider,
    `Submitted: ${new Date(data.timestamp).toLocaleString()}`,
  ].join('\n');

  console.info('sendEmailNotification: sending to', NOTIFICATION_EMAIL);
  try {
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    console.info('sendEmailNotification: sent successfully');
  } catch (error) {
    console.error('sendEmailNotification: failed —', error.toString());
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────
//
// Test function per scenario (Attending/Declining)
// Can be run from Apps Script Editor to ensure email functionlity.
//
// WARNING:
// * Both functions below write a real row to the sheet and send real emails.
// * After running, remove the test row from the sheet.

// Returns a tagged test address: base+test-<random>@domain.com
// This bypasses the duplicate-email check on each run without needing to clean the sheet.
function testEmail() {
  const base = NOTIFICATION_EMAIL || 'test@example.com';
  const tag = Math.random().toString(36).slice(2, 8); // e.g. 'k4z9mw'
  const [local, domain] = base.split('@');
  return `${local}+test-${tag}@${domain}`;
}

// Tests the attending (happy) path — with additional guests and dietary info.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testScript() {
  const testData = {
    timestamp: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'User',
    email: testEmail(),
    phone: '0400 000 000',
    attendance: true,
    guestCount: 3,
    additionalGuestNames: ['Jane Doe', 'John Smith'],
    fridayEveningBbq: true,
    sundayRecoveryBreakfast: false,
    stayingOnSite: true,
    travelPlans: ['hire-car', 'shuttle'],
    dietaryRestrictions: 'Vegetarian',
    message: 'Looking forward to it!',
    secret: PropertiesService.getScriptProperties().getProperty('RSVP_SECRET') || '',
  };

  const result = doPost({ postData: { contents: JSON.stringify(testData) } });
  Logger.log('testScript result: ' + result.getContent());
}

// Tests the declining (not attending) path.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testScriptDeclining() {
  const testData = {
    timestamp: new Date().toISOString(),
    firstName: 'Declining',
    lastName: 'Guest',
    email: testEmail(),
    phone: '0400 000 000',
    attendance: false,
    guestCount: 1,
    additionalGuestNames: [],
    fridayEveningBbq: false,
    sundayRecoveryBreakfast: false,
    stayingOnSite: false,
    travelPlans: [],
    dietaryRestrictions: 'None',
    message: "So sorry I can't make it!",
    secret: PropertiesService.getScriptProperties().getProperty('RSVP_SECRET') || '',
  };

  const result = doPost({ postData: { contents: JSON.stringify(testData) } });
  Logger.log('testScriptDeclining result: ' + result.getContent());
}
