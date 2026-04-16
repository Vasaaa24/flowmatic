import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, business, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Chybí povinná pole' })
  }

  try {
    await resend.emails.send({
      from: 'Valton <noreply@valton.cz>',
      to: 'valton.reserv@gmail.com',
      replyTo: email,
      subject: `Nová poptávka od ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #fff; border-radius: 12px;">
          <h2 style="color: #f0b429; margin-top: 0;">Nová poptávka přes valton.cz</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 120px;">Jméno</td>
              <td style="padding: 8px 0; color: #fff; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">E-mail</td>
              <td style="padding: 8px 0; color: #fff;"><a href="mailto:${email}" style="color: #f0b429;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #888;">Telefon</td>
              <td style="padding: 8px 0; color: #fff;">${phone}</td>
            </tr>` : ''}
            ${business ? `
            <tr>
              <td style="padding: 8px 0; color: #888;">Typ byznysu</td>
              <td style="padding: 8px 0; color: #fff;">${business}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #f0b429;">
            <p style="margin: 0; color: #ccc; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 32px; font-size: 12px; color: #555;">Zpráva odeslána přes valton.cz</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Nepodařilo se odeslat zprávu' })
  }
}
