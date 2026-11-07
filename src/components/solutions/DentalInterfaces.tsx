import { InterfaceGallery } from './InterfaceGallery'

const base = '/assets/img/odontologia/'

// Orden de presentación de las capturas en la página original de Sayri Dental.
const screens = [
  { file: 'Home.png', title: 'Panel principal', text: 'Una vista general de pacientes, citas e indicadores de gestión.' },
  { file: 'Odontograma.png', title: 'Odontograma digital', text: 'Dentición permanente y temporal, diagnósticos y evolución del paciente.' },
  { file: 'Citas.png', title: 'Agenda de citas', text: 'Organización semanal de profesionales, consultorios y horarios.' },
  { file: 'Pacientes.png', title: 'Ficha de pacientes', text: 'Datos del paciente, alergias y estado en un solo lugar.' },
  { file: 'Consultorios.png', title: 'Consultorios y ambientes', text: 'Sillones, responsables y colores para identificar cada consultorio.' },
  { file: 'Servicios.png', title: 'Servicios odontológicos', text: 'Organización de servicios con estructura clínica CIE-10.' },
  { file: 'Niveles.png', title: 'Niveles CIE-10', text: 'Consulta de las categorías de diagnóstico odontológico.' },
  { file: 'Cuentas por cobrar.png', title: 'Cuentas por cobrar', text: 'Seguimiento de deudas, vencimientos y recuperación de pagos.' },
  { file: 'Estado de cuenta de Clientes.png', title: 'Estado de cuenta del paciente', text: 'Detalle de movimientos y saldos asociados a cada paciente.' },
  { file: 'Facturar cuentas por cobrar.png', title: 'Facturación', text: 'De las cuentas por cobrar a la emisión de comprobantes.' },
  { file: 'Cajero.png', title: 'Caja', text: 'Consulta de ingresos y salidas de la operación diaria.' },
  { file: 'Registro de ventas.png', title: 'Registro de ventas', text: 'Seguimiento de las ventas y los servicios registrados.' },
  { file: 'Rentabilidad.png', title: 'Rentabilidad por servicio', text: 'Información para evaluar la utilidad de los tratamientos.' },
]

const explanations = [
  'El punto de partida para recorrer el sistema. Reúne accesos a las tareas frecuentes y permite pasar de la gestión de pacientes a la agenda, los servicios y las herramientas administrativas.',
  'Presenta gráficamente las piezas dentales del paciente, tanto permanentes como temporales. Ayuda a consultar el registro odontológico y relacionar la evolución de cada atención con sus diagnósticos y tratamientos.',
  'La vista semanal permite ubicar las citas por día y horario. Los colores identifican los consultorios para facilitar la coordinación de los ambientes y del equipo de atención.',
  'Centraliza la identificación y los datos de los pacientes. La pantalla muestra herramientas de búsqueda, estado y alergias, además de opciones para importar o exportar información.',
  'Organiza los espacios de atención del establecimiento. Cada consultorio puede identificarse por su nombre, responsable, estado y color, aportando contexto a la planificación de citas.',
  'Presenta el catálogo de servicios odontológicos organizado con referencias CIE-10. Esta estructura facilita localizar los servicios y mantener un criterio común de registro en el consultorio.',
  'Muestra la organización de las categorías CIE-10 utilizadas en odontología. Permite recorrer la clasificación y consultar el contexto de los diagnósticos registrados.',
  'Reúne los saldos pendientes para consultar cuánto queda por cobrar. La distinción entre deuda vencida y por vencer ayuda a priorizar el seguimiento de los pagos de los pacientes.',
  'Permite revisar los movimientos financieros de un paciente en particular. El detalle de cargos, pagos y saldos aporta trazabilidad para explicar el estado de su cuenta.',
  'Conecta las cuentas pendientes con el proceso de facturación. Esta vista permite seguir el paso desde los importes registrados por la atención hasta su comprobante.',
  'Presenta los ingresos y las salidas de caja. Facilita revisar el movimiento de dinero del día y contrastarlo con las operaciones registradas por el consultorio.',
  'Agrupa las ventas registradas para su consulta y seguimiento. Sirve como referencia para revisar la actividad comercial y los servicios que forman parte de la operación.',
  'Presenta información de rentabilidad por servicio para complementar la lectura de las ventas. Ayuda a evaluar qué tratamientos aportan utilidad y orientar las decisiones de gestión.',
]

export function DentalInterfaces() {
  return <InterfaceGallery name="Sayri Dental" base={base} introduction="Explora las pantallas de Sayri Dental, desde la atención del paciente hasta la gestión financiera. Selecciona una interfaz para conocer cómo acompaña tu operación." screens={screens.map((screen, index) => ({ ...screen, explanation: explanations[index] }))}/>
}
