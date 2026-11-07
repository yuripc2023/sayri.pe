export const basicMonthlyPrice = 30

export const basicModules: Record<string, readonly string[]> = {
  cocheras: ['Registro de clientes y vehículos', 'Catálogo de servicios y precios', 'Registro de servicios y pagos', 'Caja y consulta de movimientos'],
  comercial: ['Clientes y proveedores', 'Catálogo de productos y precios', 'Pedidos y registro de ventas', 'Inventario y caja básica'],
  'distribucion-logistica': ['Clientes y transportistas', 'Registro de vehículos', 'Organización de cargas y entregas', 'Consulta de pedidos y movimientos'],
  droguerias: ['Clientes y proveedores', 'Catálogo de medicamentos', 'Inventario por lote y vencimiento', 'Pedidos de compra y venta'],
  ferreterias: ['Clientes y proveedores', 'Catálogo, presentaciones y precios', 'Compras, ventas e inventario', 'Caja y cuentas por cobrar'],
  odontologia: ['Registro de pacientes', 'Agenda de citas', 'Catálogo de servicios odontológicos', 'Registro de pagos y caja'],
  agroindustria: ['Catálogo de productos e insumos', 'Clientes y proveedores', 'Compras e inventario por lotes', 'Pedidos y registro de ventas'],
  'colegios-profesionales': ['Padrón de colegiados', 'Registro de cuotas', 'Pagos y cuentas por cobrar', 'Catálogo de servicios institucionales'],
  educacion: ['Registro de alumnos y docentes', 'Admisión y matrículas', 'Catálogo de servicios educativos', 'Pagos y cuentas por cobrar'],
  'estudios-juridicos': ['Registro de clientes', 'Agenda y tareas', 'Organización de documentos', 'Honorarios y cuentas por cobrar'],
  'transporte-pasajeros': ['Registro de clientes', 'Vehículos y conductores', 'Catálogo de servicios', 'Registro de pagos y caja'],
  'planta-de-produccion': ['Catálogo de materiales y productos', 'Clientes y proveedores', 'Compras e inventario', 'Pedidos y registro de ventas'],
  encomiendas: ['Registro de clientes', 'Catálogo de servicios de envío', 'Registro de encomiendas', 'Consulta de pagos y movimientos'],
  restaurantes: ['Carta y precios', 'Registro de ambientes y mesas', 'Pedidos por mesa', 'Pagos y caja básica'],
  elecciones: ['Configuración de la elección', 'Padrón de electores y candidaturas', 'Registro de votación asistida e identificada', 'Consulta de participación y resultados'],
}

export const customPricingFactors = [
  { title: 'Dominio propio', text: 'Tu dirección web personalizada.' },
  { title: 'Facturación electrónica', text: 'Emisión de comprobantes electrónicos.' },
  { title: 'Más sucursales', text: 'Sedes y almacenes conectados.' },
  { title: 'Varias empresas', text: 'Cada empresa con su propio RUC y configuración.' },
  { title: 'Migración de datos', text: 'Preparación e importación de información desde Excel u otro sistema.' },
  { title: 'Funcionalidades personalizadas', text: 'Módulos, reportes o procesos desarrollados para tu operación. Tienen un costo adicional.' },
]
