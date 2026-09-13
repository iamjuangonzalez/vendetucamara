import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import './styles.css'
// Generated Routes
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree, defaultPreload: 'intent' })

createRoot(document.getElementById('root')).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>,
)
