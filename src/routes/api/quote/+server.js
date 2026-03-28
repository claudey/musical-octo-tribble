/** @type {import('./$types').RequestHandler} */
export async function POST({ request, platform }) {
	try {
		const body = await request.json();
		const { name, phone, email, moveDate, service, description } = body;

		if (!name || !phone) {
			return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const RESEND_API_KEY = platform?.env?.RESEND_API_KEY;
		const TO_EMAIL = 'moveyoumovers@gmail.com';

		const emailBody = `
New quote request from the Move You Movers website:

Name:        ${name}
Phone:       ${phone}
Email:       ${email || 'Not provided'}
Move Date:   ${moveDate || 'Not specified'}
Service:     ${service || 'Not specified'}

Message:
${description || 'No additional details provided.'}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
		`.trim();

		const htmlBody = `
<div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #0d1b4b 0%, #1a2d6d 100%); padding: 24px; border-radius: 8px 8px 0 0;">
    <h2 style="color: white; margin: 0; font-family: 'Outfit', Arial, sans-serif;">📦 New Quote Request</h2>
    <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0;">Move You Movers Website</p>
  </div>
  <div style="background: #f5f7fa; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #0d1b4b; width: 120px;">Name</td>
        <td style="padding: 8px 0; color: #0d1b4b;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #0d1b4b;">Phone</td>
        <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #F5A623;">${phone}</a></td>
      </tr>
      ${email ? `<tr>
        <td style="padding: 8px 0; font-weight: bold; color: #0d1b4b;">Email</td>
        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F5A623;">${email}</a></td>
      </tr>` : ''}
      ${moveDate ? `<tr>
        <td style="padding: 8px 0; font-weight: bold; color: #0d1b4b;">Move Date</td>
        <td style="padding: 8px 0; color: #0d1b4b;">${moveDate}</td>
      </tr>` : ''}
      ${service ? `<tr>
        <td style="padding: 8px 0; font-weight: bold; color: #0d1b4b;">Service</td>
        <td style="padding: 8px 0; color: #0d1b4b;">${service}</td>
      </tr>` : ''}
    </table>
    ${description ? `
    <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border-left: 3px solid #F5A623;">
      <p style="font-weight: bold; color: #0d1b4b; margin: 0 0 8px;">Details:</p>
      <p style="color: #475569; margin: 0; line-height: 1.6;">${description}</p>
    </div>` : ''}
    <p style="margin-top: 24px; font-size: 12px; color: #64748b;">
      Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
    </p>
  </div>
</div>
		`.trim();

		if (RESEND_API_KEY) {
			const resendRes = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${RESEND_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: 'Move You Movers Website <quotes@yourdomain.com>',
					to: [TO_EMAIL],
					reply_to: email || undefined,
					subject: `New Quote Request from ${name} — Move You Movers`,
					text: emailBody,
					html: htmlBody
				})
			});

			if (!resendRes.ok) {
				const err = await resendRes.text();
				console.error('Resend error:', err);
			}
		} else {
			console.log('=== QUOTE REQUEST (no RESEND_API_KEY set) ===');
			console.log(emailBody);
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('Quote API error:', err);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
