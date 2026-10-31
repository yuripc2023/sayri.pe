export type Solution = { slug:string; name:string; title:string; category:string; description:string; available?:boolean }
export const solutions: Solution[] = [
  ['cocheras','Sayri Cocheras','Gestión para cocheras','Cocheras'],['comercial','Sayri Comercial','Gestión comercial','Comercio'],['distribucion-logistica','Sayri Distribución','Distribución y logística','Distribución y logística'],['droguerias','Sayri Droguerías','Gestión para droguerías','Droguerías'],['ferreterias','Sayri Ferreterías','Gestión para ferreterías','Ferreterías'],['odontologia','Sayri Dental','Gestión odontológica','Odontología'],['agroindustria','Sayri Agroindustria','Gestión para agroindustria','Agroindustria'],['colegios-profesionales','Sayri Profesionales','Gestión para colegios profesionales','Colegios profesionales'],['educacion','Sayri Educación','Gestión educativa','Educación'],['estudios-juridicos','Sayri Jurídico','Gestión para estudios jurídicos','Estudios jurídicos'],['transporte-pasajeros','Sayri Transporte','Transporte de pasajeros','Transporte de pasajeros'],['planta-de-produccion','Sayri Producción','Gestión para plantas de producción','Planta de producción'],['encomiendas','Sayri Encomiendas','Gestión de encomiendas','Encomiendas'],['restaurantes','Sayri Restaurantes','Gestión para restaurantes','Restaurantes']
].map(([slug,name,title,category]) => ({slug,name,title,category,description:'Estamos preparando la presentación completa de esta solución.'}))

solutions.push({ slug: 'elecciones', name: 'Suffrage', title: 'Gestión de procesos electorales', category: 'Elecciones', description: 'Organiza elecciones, administra padrones y consulta resultados con votación asistida e identificada.', available: true })

const parking = solutions.find(solution => solution.slug === "cocheras")
if (parking) {
  parking.available = true
  parking.description = "Conoce la base de placa, servicios, espacios, pagos y caja y el desarrollo de estadías y tarifas para tu cochera."
}

const commercial = solutions.find(solution => solution.slug === "comercial")
if (commercial) {
  commercial.available = true
  commercial.description = "Conecta ventas, compras, inventarios, facturación, cobranzas y caja con un ERP modular para tu negocio."
}

const logistics = solutions.find(solution => solution.slug === 'distribucion-logistica')
if (logistics) {
  logistics.available = true
  logistics.description = 'Organiza vehículos, cargas consolidadas, programación, entregas e inventario para conectar tu operación logística.'
}

const drugstore = solutions.find(solution => solution.slug === 'droguerias')
if (drugstore) {
  drugstore.available = true
  drugstore.description = 'Conecta catálogo de medicamentos, compras, inventario por lote y vencimiento y pedidos de venta para tu droguería.'
}

const hardware = solutions.find(solution => solution.slug === 'ferreterias')
if (hardware) {
  hardware.available = true
  hardware.description = 'Organiza catálogo, precios por presentación, inventario por tienda, series y kits, conectando compras, ventas y cobranza.'
}

const dental = solutions.find(solution => solution.slug === 'odontologia')
if (dental) {
  dental.available = true
  dental.description = 'Organiza pacientes, citas, registros odontológicos, recetas y cobros para conectar la atención y la gestión de tu consultorio.'
}

const agroindustry = solutions.find(solution => solution.slug === 'agroindustria')
if (agroindustry) {
  agroindustry.available = true
  agroindustry.description = 'Conecta catálogo, compras, inventario por lotes, ventas, distribución y tareas para tu empresa agroindustrial.'
}

const associations = solutions.find(solution => solution.slug === 'colegios-profesionales')
if (associations) {
  associations.available = true
  associations.description = 'Conecta padrón de colegiados, cuotas, cobranza y servicios institucionales con una base para tu portal del colegiado.'
}

const education = solutions.find(solution => solution.slug === 'educacion')
if (education) {
  education.available = true
  education.description = 'Conecta alumnos, docentes, admisión, matrículas, certificados y cobranza para la gestión administrativa de tu institución.'
}

const legal = solutions.find(solution => solution.slug === 'estudios-juridicos')
if (legal) {
  legal.available = true
  legal.description = 'Conecta clientes, agenda, tareas, documentos y cobranza, con una base para la gestión de arbitrajes de tu estudio.'
}

const production = solutions.find(solution => solution.slug === 'planta-de-produccion')
if (production) {
  production.available = true
  production.description = 'Conecta materiales, compras, inventario por lotes, tareas, ventas y despachos para la gestión administrativa de tu planta.'
}

const restaurant = solutions.find(solution => solution.slug === 'restaurantes')
if (restaurant) {
  restaurant.available = true
  restaurant.description = 'Conecta carta, ambientes, mesas, pedidos y caja, con una base para implementar tu carta QR y la gestión de tu restaurante.'
}

const transport = solutions.find(solution => solution.slug === 'transporte-pasajeros')
if (transport) {
  transport.available = true
  transport.description = 'Conoce la base de flota y administración y las ampliaciones para gestionar viajes, asientos, reservas y boletos de pasajeros.'
}
