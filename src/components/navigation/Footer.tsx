import { Link } from 'react-router-dom'
import { contact } from '../../config/contact'
import { solutions } from '../../data/solutions'
import { ScheduleDemoButton } from '../shared/ScheduleDemoButton'
import whiteLogo from '../../img/logo-sayri-white.png'

const platformLinks = [
  ['Arquitectura web', 'plataforma'], ['Cómo trabajamos', 'como-trabajamos'],
  ['Evolución', 'evolucion'], ['Crecimiento', 'procesos'],
  ['Recorrido de un pedido', 'recorrido-pedido'], ['App móvil', 'app-movil'],
  ['Tecnología', 'tecnologia'], ['Preguntas frecuentes', 'faq'],
]

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-layout">
      <div className="footer-identity">
        <Link className="footer-logo" to="/" aria-label="Sayri, inicio"><img className="footer-sayri" src={whiteLogo} alt="Sayri" width="190" height="66"/></Link>
        <p className="footer-tagline">Tu empresa conectada.<br/><span>Más posibilidades para crecer.</span></p>
        <p className="footer-description">Plataforma empresarial para conectar la información, los procesos y las personas de tu organización.</p>
        <a className="footer-parent" href="https://atic.pe" target="_blank" rel="noreferrer">Una plataforma de <strong>ATIC Perú</strong> <span aria-hidden="true">↗</span></a>
      </div>
      <nav className="footer-links" aria-labelledby="footer-platform-title">
        <h2 id="footer-platform-title">Plataforma</h2>
        <ul>{platformLinks.map(([label, anchor]) => <li key={anchor}><Link to={`/#${anchor}`}>{label}</Link></li>)}</ul>
      </nav>
      <nav className="footer-links footer-solutions" aria-labelledby="footer-solutions-title">
        <h2 id="footer-solutions-title">Soluciones por rubro</h2>
        <ul>{solutions.map(solution => <li key={solution.slug}><Link to={`/soluciones/${solution.slug}`}>{solution.category}</Link></li>)}</ul>
        <Link className="footer-all-solutions" to="/soluciones">Ver todas las soluciones <span aria-hidden="true">↗</span></Link>
      </nav>
      <div className="footer-contact">
        <h2>Conversemos</h2>
        <p>Encuentra el siguiente paso para la gestión de tu empresa.</p>
        <ScheduleDemoButton/>
        <Link className="footer-contact-link" to="/#contacto">Enviar una consulta <span aria-hidden="true">↗</span></Link>
        <a className="footer-contact-link" href={contact.whatsapp} target="_blank" rel="noreferrer">Hablar por WhatsApp <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div className="footer-base"><p>© {new Date().getFullYear()} SAYRI. Todos los derechos reservados.</p><Link to="/#sectores">Explorar especialidades <span aria-hidden="true">↑</span></Link></div>
  </footer>
}
