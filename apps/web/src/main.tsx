import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import './shared/styles/index.css'

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
const initialTheme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'dark'
document.documentElement.classList.add(initialTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
