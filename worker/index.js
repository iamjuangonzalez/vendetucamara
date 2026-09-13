import { Hono } from 'hono'

const app = new Hono()

// ponytail: validación a mano; si el formulario crece, zod.
export function validate(body) {
  const name = String(body?.name ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const message = String(body?.message ?? '').trim()
  const offer = String(body?.offer ?? '').trim()

  if (body?.website) return { error: 'spam' }            // honeypot: los bots lo llenan
  if (name.length < 2 || name.length > 80) return { error: 'Nombre inválido' }
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email) || email.length > 254) return { error: 'Correo inválido' }
  if (message.length > 2000) return { error: 'Mensaje demasiado largo' }
  if (offer.length > 40) return { error: 'Oferta inválida' }

  return { data: { name, email, message, offer } }
}

const escape = (s) => s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c])

app.post('/api/contact', async (c) => {
  const { error, data } = validate(await c.req.json().catch(() => ({})))
  if (error === 'spam') return c.json({ ok: true })        // fingimos éxito, no enviamos
  if (error) return c.json({ error }, 400)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `vendetucamara.com <${c.env.FROM_EMAIL}>`,
      to: [c.env.OWNER_EMAIL],
      reply_to: data.email,
      subject: `Oferta por vendetucamara.com${data.offer ? ` — ${data.offer}` : ''}`,
      html: `<p><b>${escape(data.name)}</b> &lt;${escape(data.email)}&gt;</p>
<p>Oferta: <b>${escape(data.offer) || 'no indicada'}</b></p>
<p>${escape(data.message) || '(sin mensaje)'}</p>`,
    }),
  })

  if (!res.ok) {
    console.error('resend', res.status, await res.text())
    return c.json({ error: 'No se pudo enviar. Escríbeme directo por correo.' }, 502)
  }
  return c.json({ ok: true })
})

export default app
