export const chapters = [
  { id: 'data', name: 'Dato', title: 'Todo empieza con un dato.', description: 'Un cliente. Un producto. Un pago. La unidad más pequeña de una empresa también es el inicio de algo más grande.', detail: '01 / EL ORIGEN', examples: ['Cliente', 'Producto', 'Pago'] },
  { id: 'microprocess', name: 'Microproceso', title: 'Un dato se convierte en acción.', description: 'La información se conecta con una tarea concreta. Cada acción resuelve una necesidad real.', detail: '02 / LA PRIMERA CONEXIÓN', examples: ['Registrar cliente', 'Registrar producto', 'Registrar pago'] },
  { id: 'process', name: 'Proceso', title: 'Las acciones construyen un proceso.', description: 'Registrar un cliente, preparar un pedido y emitir un comprobante dejan de ser tareas aisladas. Juntas construyen una venta.', detail: '03 / UN FLUJO CON SENTIDO', examples: ['Cliente → Pedido → Comprobante', 'Venta'] },
  { id: 'capability', name: 'Capacidad', title: 'Los procesos amplían lo posible.', description: 'Ventas, inventarios, compras y caja comparten información. Tu empresa adquiere nuevas capacidades sin volver a empezar.', detail: '04 / CRECER POR CONEXIÓN', examples: ['Ventas', 'Inventarios', 'Compras', 'Caja'] },
  { id: 'area', name: 'Área', title: 'Cada área encuentra su lugar.', description: 'Las capacidades se organizan alrededor de quienes las usan. Equipos distintos, una misma información.', detail: '05 / UNA ESTRUCTURA COMÚN', examples: ['Comercial', 'Logística', 'Finanzas', 'Administración'] },
  { id: 'company', name: 'Empresa', title: 'Ahora puedes ver la empresa completa.', description: 'Una empresa es un sistema de procesos conectados. Ventas, compras, inventarios, facturación y cobranza trabajan como parte de un mismo conjunto.', detail: '06 / EL SISTEMA COMPLETO', examples: ['Ventas · Compras · Inventarios', 'Caja · Facturación · Cobranza'] },
  { id: 'sayri', name: 'Sayri', title: 'Diseña. Construye. Controla.', description: 'Sayri conecta las piezas de tu operación para que puedas construir y controlar tu empresa desde un solo lugar.', detail: '07 / EL CENTRO DE CONTROL', examples: ['Una plataforma', 'Tu forma de trabajar'] },
  { id: 'intelligence', name: 'Inteligencia', title: 'Datos que orientan decisiones.', description: 'Tu empresa genera datos. La visión de Sayri AI es convertirlos en información, conocimiento y mejores decisiones.', detail: '08 / SAYRI AI · PRÓXIMAMENTE', examples: ['Dato → Información → Conocimiento → Decisión'] },
] as const
export type Quality = 'high' | 'medium' | 'low' | 'fallback'
export const qualitySettings = {
  high: { count: 96, dpr: 1.5 },
  medium: { count: 64, dpr: 1.25 },
  low: { count: 32, dpr: 1 },
} as const
