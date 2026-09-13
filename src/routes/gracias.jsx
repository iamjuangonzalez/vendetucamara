import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/gracias')({ component: Gracias })

function Gracias() {
  return (
    <main>
      <span className="tag">Recibido</span>
      <h1>Gracias<span>.</span></h1>
      <p className="lead">
        Tu oferta por <b>vendetucamara.com</b> ya me llegó al correo. Te respondo
        en menos de 24 horas al correo que dejaste.
      </p>
      <p style={{ marginTop: 32 }}><Link to="/">← Volver</Link></p>
    </main>
  )
}
