import { Link } from 'react-router-dom'
import { Seo } from '../components/shared/Seo'
import { ScheduleDemoButton } from '../components/shared/ScheduleDemoButton'
import { SectorMascot } from '../components/hangar/SectorMascot'
import { armors } from '../data/armors'
import './elections.css'

const features = [
  ['Cada proceso, en su lugar', 'Configura nombre, entidad convocante, año y fechas. Administra distintas instituciones según las entidades autorizadas de cada usuario y distingue elecciones en borrador, abiertas y cerradas.'],
  ['Candidaturas que se reconocen', 'Registra listas o candidaturas individuales con código, nombre, descripción e imagen. Presenta a sus integrantes con cargo y orden de participación.'],
  ['Un padrón preparado para decidir', 'Incorpora personas existentes al padrón de cada elección. Durante la preparación, habilita o inhabilita electores y registra el motivo. Conserva una copia histórica de sus datos.'],
  ['Control durante la jornada', 'Valida por documento la habilitación y si el elector ya votó. El operador autenticado registra la opción elegida únicamente con la elección abierta y dentro del horario establecido. Se impide un segundo voto.'],
  ['Resultados sin consolidación manual', 'Consulta votos y porcentajes por candidatura, participación, pendientes y listas líderes. Distingue resultados provisionales de los finales al cerrar el proceso.'],
  ['Trazabilidad del registro', 'Consulta elector, documento, opción elegida y fecha del voto. El flujo del módulo conserva los votos sin permitir su edición ni eliminación. Integra sus funciones mediante API.'],
]
const schoolFeatures = [
  ['Matrículas por año', 'Organiza código de estudiante, nivel, modalidad, grado, sección, turno y estado de matrícula.'],
  ['Importación con revisión previa', 'Carga el formato Excel escolar admitido y revisa coincidencias y conflictos antes de confirmar. Detecta documentos repetidos o inválidos, fechas incorrectas y diferencias de identidad.'],
  ['Datos sin duplicaciones', 'Reutiliza personas por documento y actualiza matrículas sin repetir registros.'],
  ['Del aula al padrón', 'Genera participantes desde las matrículas de la institución y el año de la elección, conservando los electores ya registrados. Las matrículas definitivas se habilitan; los otros estados requieren revisión.'],
  ['Resultados por grupos', 'Filtra resultados por nivel, grado, sección y turno para revisar la participación escolar.'],
  ['Continuidad para el siguiente año', 'Prepara el avance de grado y ajusta sección, turno, nivel y modalidad antes de crear nuevas matrículas, conservando las del año anterior.'],
]
const steps = [
  ['Configura la elección', 'Define la entidad, las fechas y la información del proceso.'],
  ['Registra las candidaturas', 'Incorpora listas, imágenes, integrantes y cargos.'],
  ['Prepara el padrón', 'Agrega electores o genera participantes desde las matrículas escolares.'],
  ['Abre la votación', 'El operador autorizado valida al elector y registra su opción.'],
  ['Consulta y cierra', 'Revisa participación y resultados; cierra el proceso para identificarlos como finales.'],
]

export default function ElectionsPage() {
  const armor = armors.find(item => item.slug === 'elecciones')!
  return <main id="main" className="elections-page">
    <Seo title="Suffrage | Elecciones con claridad y control | SAYRI" description="Organiza procesos electorales con Suffrage: padrones, candidaturas, votación asistida e identificada, resultados y herramientas para elecciones escolares." />
    <div className="elections-hero">
      <div><Link className="text-link" to="/soluciones">← Todas las soluciones</Link><p className="eyebrow">SAYRI / ELECCIONES / SUFFRAGE</p><h1>Organiza tus elecciones con <em>claridad y control.</em></h1><p className="lead">Gestiona participantes, listas y candidaturas; administra la jornada electoral y consulta los resultados desde un solo lugar.</p><div className="actions"><ScheduleDemoButton/><a className="text-link" href="#funcionalidades">Conocer sus funcionalidades ↓</a></div><p className="elections-caption">Votación asistida e identificada, operada por personal autorizado.</p></div>
      <div className="elections-portrait"><SectorMascot armor={armor} priority="high"/><p>SUFFRAGE <span>Tu coordinador electoral</span></p></div>
    </div>
    <div className="elections-principles" aria-label="Beneficios"><span>01 / Organización</span><span>02 / Eficiencia</span><span>03 / Control</span><span>04 / Trazabilidad</span></div>
    <section id="funcionalidades" aria-labelledby="elections-features"><p className="eyebrow">DEL PADRÓN AL ESCRUTINIO</p><h2 id="elections-features">Cada etapa conectada.</h2><p className="lead">Menos tareas manuales. Información concentrada en un mismo módulo para acompañar a quienes organizan el proceso.</p><div className="elections-grid">{features.map(([title, text], i) => <article key={title}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="elections-school" aria-labelledby="school-title"><p className="eyebrow">ELECCIONES ESCOLARES</p><h2 id="school-title">Menos trabajo repetitivo.<br/>Más tiempo para organizar.</h2><p className="lead">Aprovecha las matrículas de tu institución, revisa la información antes de importarla y genera el padrón sin volver a registrar a cada estudiante.</p><div className="elections-grid">{schoolFeatures.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section aria-labelledby="process-title"><p className="eyebrow">CÓMO FUNCIONA</p><h2 id="process-title">Un recorrido claro,<br/>de principio a fin.</h2><ol className="elections-steps">{steps.map(([title, text], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
    <section className="elections-audience" aria-labelledby="audience-title"><p className="eyebrow">PADRONES ESCOLARES Y GENERALES</p><h2 id="audience-title">Para organizaciones<br/>que necesitan decidir.</h2><p className="lead">Instituciones educativas, entidades públicas, comunidades campesinas, colegios profesionales, municipios y otras organizaciones. Cada entidad define quiénes están habilitados y verifica que el mecanismo corresponda a las reglas de su proceso.</p></section>
    <section className="elections-scope" aria-labelledby="scope-title"><p className="eyebrow">ALCANCE ACTUAL</p><h2 id="scope-title">Conoce cómo se registra cada voto.</h2><p className="lead">Suffrage implementa votación asistida e identificada: un usuario autenticado con acceso a la entidad registra el voto y se conserva la relación entre el elector y la opción elegida. Este mecanismo no ofrece voto secreto ni anónimo.</p><details><summary>Otros alcances a considerar</summary><p>La versión actual no incluye votos en blanco, voto preferencial, segunda vuelta automática ni validación directa con RENIEC. La importación Excel utiliza un formato escolar específico. Una interfaz pública de autoservicio para electores requiere una implementación adicional.</p></details></section>
    <section className="elections-cta" aria-labelledby="elections-demo"><p className="eyebrow">CONOCE SUFFRAGE</p><h2 id="elections-demo">Tu próxima elección<br/>empieza con orden.</h2><p className="lead">Conversemos sobre tu organización y el proceso electoral que necesitas preparar.</p><div className="actions"><ScheduleDemoButton/><Link className="text-link" to="/#contacto">Cuéntanos qué necesitas ↗</Link></div></section>
  </main>
}
