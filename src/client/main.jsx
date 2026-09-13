import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createRootRoute, createRoute, createRouter, Outlet, RouterProvider,
} from '@tanstack/react-router'
import Home from './Home.jsx'
import Gracias from './Gracias.jsx'
import './styles.css'

const rootRoute = createRootRoute({ component: Outlet })

const routes = [
  createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home }),
  createRoute({ getParentRoute: () => rootRoute, path: '/gracias', component: Gracias }),
]

const router = createRouter({ routeTree: rootRoute.addChildren(routes) })

createRoot(document.getElementById('root')).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>,
)
