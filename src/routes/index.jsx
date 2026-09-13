import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setSending(true); setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Error')
      // /gracias es la conversión: cuenta sus pageviews en Web Analytics.
      navigate({ to: '/gracias' })
    } catch (err) {
      setError(err.message)
      setSending(false)
    }
  }

  return (
    <main>
      <span className="tag">Dominio en venta</span>
      <h1>vendetucamara<span>.com</span></h1>
      <p className="lead">
        Un nombre exacto, en español, para el negocio de comprar y vender cámaras
        y equipo fotográfico. Corto, memorable y con la extensión que todo el
        mundo escribe por defecto.
      </p>
      <ul>
        <li>.com exacto</li>
        <li>Keyword en español</li>
        <li>Transferencia inmediata</li>
      </ul>

      <form onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email">Correo</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="offer">Tu oferta (opcional)</label>
          <input id="offer" name="offer" placeholder="USD 1.500" />
        </div>
        <div>
          <label htmlFor="message">Mensaje (opcional)</label>
          <textarea id="message" name="message" />
        </div>
        <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button disabled={sending}>{sending ? 'Enviando…' : 'Enviar oferta'}</button>
        <p className="status err" role="status" aria-live="polite">{error}</p>
      </form>

      <footer>Sitio independiente. Este dominio no está afiliado a ningún negocio existente.</footer>
    </main>
  )
}
