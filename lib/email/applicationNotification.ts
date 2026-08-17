function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function initials(name: string) {
  return escapeHtml(name.trim().split(/\s+/).map((w) => w[0]).join('').toUpperCase().slice(0, 2));
}

// Tables + inline styles only: Gmail strips <style> blocks, Outlook ignores flex/grid.
export function renderApplicationEmail({
  projectTitle, workspaceUrl, applicantName, ownerName, fields, motivation,
}: {
  projectTitle: string;
  workspaceUrl: string;
  applicantName: string;
  ownerName: string | null;
  fields: [string, string | null][];
  motivation: string | null;
}) {
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const preheader = `${applicantName} just applied${fields[1][1] ? ` for ${fields[1][1]}` : ''} — review it in your workspace.`;

  const rows = fields
    .filter(([, v]) => v)
    .map(([label, value]) => `
      <tr>
        <td style="padding:9px 0;border-top:1px solid #232330;font:400 13px ${font};color:#8a8a99;width:110px;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:9px 0;border-top:1px solid #232330;font:500 13px ${font};color:#e9e9f0;vertical-align:top;word-break:break-word">${escapeHtml(value!)}</td>
      </tr>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<title>${escapeHtml(applicantName)} applied to ${escapeHtml(projectTitle)}</title>
</head>
<body style="margin:0;padding:0;background:#08080a;">
  <div style="display:none;font-size:1px;color:#08080a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">${escapeHtml(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#08080a;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

          <!-- brand -->
          <tr>
            <td style="padding:0 4px 16px;font:700 15px ${font};color:#ffffff;letter-spacing:-0.2px">
              Cross<span style="color:#a855f7">Think</span><span style="font-weight:400;color:#6b6b7b">: by Iris</span>
            </td>
          </tr>

          <!-- card -->
          <tr>
            <td style="background:#101015;border:1px solid #23232f;border-radius:16px;overflow:hidden">

              <!-- accent bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="height:3px;background:#8b5cf6;line-height:3px;font-size:0">&nbsp;</td></tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:28px 28px 8px">
                    <p style="margin:0 0 14px;font:600 11px ${font};letter-spacing:1.4px;text-transform:uppercase;color:#a855f7">New application</p>

                    <!-- applicant -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="44" style="vertical-align:middle">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="40" height="40" align="center" valign="middle"
                                  style="width:40px;height:40px;background:#7c3aed;border-radius:20px;font:700 14px ${font};color:#ffffff">
                                ${initials(applicantName)}
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align:middle;padding-left:12px">
                          <div style="font:600 17px ${font};color:#ffffff;line-height:1.35">${escapeHtml(applicantName)}</div>
                          <div style="font:400 13px ${font};color:#8a8a99;padding-top:2px">applied to ${escapeHtml(projectTitle)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- details -->
                <tr>
                  <td style="padding:20px 28px 4px">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
                  </td>
                </tr>

                ${motivation ? `
                <!-- motivation -->
                <tr>
                  <td style="padding:18px 28px 0">
                    <div style="background:#16161d;border-left:3px solid #8b5cf6;border-radius:0 8px 8px 0;padding:14px 16px">
                      <p style="margin:0 0 6px;font:600 11px ${font};letter-spacing:0.8px;text-transform:uppercase;color:#8a8a99">Why they want in</p>
                      <p style="margin:0;font:400 14px/1.6 ${font};color:#d5d5e0">${escapeHtml(motivation)}</p>
                    </div>
                  </td>
                </tr>` : ''}

                <!-- cta -->
                <tr>
                  <td style="padding:24px 28px 8px">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="#7c3aed" style="border-radius:10px">
                          <a href="${workspaceUrl}"
                             style="display:inline-block;padding:13px 26px;font:600 14px ${font};color:#ffffff;text-decoration:none;border-radius:10px">
                            Review application &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 0;font:400 12px ${font};color:#6b6b7b">
                      Reply to this email to reach ${escapeHtml(applicantName)} directly.
                    </p>
                  </td>
                </tr>

                <tr><td style="padding:24px 28px 26px"></td></tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:18px 4px 0;font:400 12px/1.6 ${font};color:#55555f">
              ${ownerName ? `Sent to ${escapeHtml(ownerName)} because you own this project on CrossThink.` : 'Sent because you own this project on CrossThink.'}
              <br><a href="${workspaceUrl}" style="color:#8a8a99;text-decoration:underline">Manage applications</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
