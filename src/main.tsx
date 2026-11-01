import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import './styles/global.css'
import './styles/brand.css'
import './styles/palette.css'
import './styles/home-sections.css'
import './components/navigation/header.css'
import './components/navigation/footer.css'
const root = document.getElementById('root')!
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
