# Experiencia SAYRI

## Análisis previo
React/react-dom 19.2.0, Vite 8.3.0, TypeScript 7.0.2, React Router 7.18.3, Three 0.186.0, R3F 9.7.0 y Drei 10.7.8. Inicialmente sin GSAP, Tailwind, ESLint ni framework de pruebas UI. Pruebas del servicio de leads con node:test. Vite solo tenía el plugin React.

SPA: App controla tema y rutas; HomePage contiene la landing y una esfera de sectores lazy. Hook useTheme observa data-theme; CSS global más brand.css con varias sobrescrituras de hero y dark mode. Roboto se carga desde Google Fonts, sin fuentes locales. Cuatro logos PNG de 12–16 KB; ningún SVG, GLB, GLTF ni textura 3D en public/src. README tenía datos antiguos sobre 3D y logos. El árbol instalado usa enlaces pnpm; package-lock.json estaba desactualizado respecto a las dependencias 3D.

Reutilizar Header/Footer, Seo, ScheduleDemoButton, ContactForm, useTheme, datos de soluciones y configuración de contacto. Mantener /, /soluciones, /soluciones/:slug y las anclas plataforma/procesos/sectores/sayri-ai/casos/faq/contacto. No cambiar el servicio público de leads ni las rutas de soluciones. La nueva escena reemplaza solo el hero inicial, evitando dos Canvas activos. SectorSphere se conserva para uso futuro.

## Arquitectura propuesta
`src/experience/SayriExperience.tsx`: shell HTML y modo de lectura; `content.ts`: ocho etapas semánticas; `animation/`: modelo mutable y hook de timeline; `scene/`: Canvas lazy, cámara, iluminación y estructuras instanciadas; `hooks/`: preferencias/capacidades; `ui/`: overlays, progreso y narrativa equivalente; `experience.css`: estilos aislados y utilities Tailwind sin Preflight.

GSAP controla una sola fase continua y las transiciones HTML. R3F lee esa fase y actualiza objetos/cámara sin renders React por frame. Ocho labels: data, microprocess, process, capability, area, company, sayri, intelligence. El pin dura en función de la altura visible y el número de etapas, con menor recorrido en móvil. El scroll se mantiene nativo. Reduced motion, modo lectura y WebGL no disponible evitan cargar la escena y la timeline.

## Riesgos y decisiones
- Bundle 3D previo: 1,026 KB sin gzip, warning de Vite. Importar únicamente helpers Drei usados, dividir motor WebGL y cargarlo solo cuando procede; no silenciar warnings mediante un umbral artificial.
- Pinning bajo header sticky, teclado, anclas y rutas: offset del header, enlaces a etapas y salto explícito; refresh y cleanup al cambiar viewport/ruta. No scroll-jacking.
- Móviles: DPR limitado, menos instancias, sin bloom, sombras o texturas; render demand y solo al variar la fase.
- WebGL puede fallar incluso tras detectar soporte: error boundary y pérdida de contexto cambian a HTML. Toda la historia está en HTML.
- SEO actual depende de render JS para contenido: mantener semántica y metadatos existentes. No afirmar SSR ni prerender que no existe.
- No añadir Tailwind Preflight, pues cambiaría formularios/tipografía existentes. Tailwind se aplica al layout de la experiencia.

## Assets
No falta ningún asset para esta implementación procedural: puntos, conexiones, estructuras modulares y núcleo. No se descargan modelos, imágenes ni fuentes adicionales. Blender/GLB no aporta suficiente valor aquí para añadir peso.

## Skills y documentación
Se revisó el catálogo oficial openai/skills. No incluye un skill específico para este stack 3D; Playwright se seleccionó por su utilidad para validación real en navegador y se instaló. Los skills de imagen/Sites/Figma no son necesarios para geometrías procedurales en este repositorio.

Referencias técnicas: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [R3F performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance), [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite).

## Fases y validación
Todas las fases se implementaron progresivamente, ejecutando build y pruebas disponibles antes de avanzar. No hay lint configurado.

| Fase | Resultado verificado |
| --- | --- |
| A · Esqueleto | Canvas único, cámara, iluminación, labels, pin, scrub, overlays y fallback. Capturas desktop/móvil. Corregido padding global que desplazaba la cabecera interna. |
| B · Dato a proceso | Instancias deterministas y conexiones, recorrido 0→1→2→1→0 en Chrome. Build y pruebas de geometría/cliente correctos. |
| C · Capacidad a empresa | Agrupación por áreas, módulos y alejamiento de cámara, recorrido 3→4→5→3. Un Canvas y sin overflow. |
| D · Sayri/inteligencia | Convergencia, núcleo procedural, red de datos y CTA con el flujo existente. Recorrido 6→7→5→7, comprobado también tras carga limpia. |
| E · Calidad y accesibilidad | 1440×900 high, 768×1024 medium, 390×844 low; etapas adelante/atrás, lectura, rutas, anclas, reduced motion, ausencia y pérdida de WebGL; formulario con API simulada. Ajustado layout tablet tras ver solapamiento en captura. |

La prueba de lectura desde la última etapa detectó que el scroll largo dejaba la historia fuera de vista. Se corrigió para volver al inicio, conservando el foco en el control. Se verificó lectura→animación y pérdida real de contexto mediante WEBGL_lose_context. Rutas de soluciones eliminan Canvas/pin al desmontar; volver a /#procesos y abrir Contacto posiciona la sección aproximadamente 94 px bajo el header de 78 px.

Prueba de formulario en Chrome: validación de identificador y correo, maxlength 5000, 201 limpia datos, 400 muestra errores junto a campos, 429/503 informan, fallo de red conserva datos y permite reintento. Se mantuvo una respuesta pendiente y se provocó un segundo submit: solo salió una solicitud. Se añadió una cookie ficticia de sesión al dominio API y se comprobó que no se enviaba ni Cookie ni Authorization. Seis POST interceptados por Playwright, cero leads reales creados. Los errores HTTP/red deliberados producen mensajes de Network del navegador; la aplicación no registra datos personales.

### Build y carga

GSAP 3.15.0 y Tailwind/plugin Vite 4.3.3 añadidos; se conservaron las versiones originales de React/Three/R3F/Drei. El lockfile npm se sincronizó sin cambiar node_modules pnpm.

Build final: JS principal ≈261 KB (83 KB gzip); escena/R3F ≈164 KB (52 KB gzip); Three core ≈377 KB (101 KB gzip) y renderer ≈365 KB (89 KB gzip), diferidos. GSAP ≈70 KB (27 KB gzip) y ScrollTrigger ≈43 KB (18 KB gzip), diferidos. CSS ≈35 KB (8 KB gzip). La separación facilita descarga/caché, pero no elimina el coste total de WebGL. No hay warnings de tamaño ni errores TypeScript.

En preview de producción y desarrollo se comprobó que reduced motion y Chrome con WebGL deshabilitado no descargan escena, Three, GSAP ni ScrollTrigger: ocho capítulos HTML, cero Canvas y cero pin. Pruebas automatizadas: tres de narrativa/geometría y tres del servicio de leads, todas correctas.

En el build de producción se recorrieron las ocho etapas 0→1→2→3→4→5→6→7→5→0. Se comprobó avance/retroceso con la rueda y activación de Empresa con Enter. Instrumentando temporalmente las funciones de dibujo WebGL desde Playwright, se observaron cero draw calls durante 600 ms en reposo y 42 durante la prueba de avance/retroceso; no es una medición de FPS ni un benchmark de GPU física. Tema claro/oscuro y un único h1 comprobados.

El resize conserva el progreso capturado antes de que GSAP retire temporalmente el pin al recalcular. Se probaron Proceso, Empresa e Inteligencia en secuencias 1440→768→390→1440 px: misma etapa, un Canvas, sin overflow y top 78/64 px según el header. Saltar historia dejó el CTA a 94 px del borde superior. En móvil se verificó que el botón flotante WhatsApp no tapa Ecosistema, incluso al final de la timeline; su posición vuelve a la habitual al salir de la historia. Se corrigió también el desfase inicial causado por el cambio de altura del header al entrar en móvil.

### Limitaciones

R3F 9.7.0 instancia THREE.Clock, deprecado por Three 0.186.0: Chrome muestra ese warning de dependencia. Se rastreó a node_modules/@react-three/fiber/dist/events-156d8d12.esm.js; no se oculta el warning ni se parchean dependencias. Las capturas en Chrome pueden generar avisos ReadPixels del driver. No son excepciones de la aplicación.

No se realizó una auditoría Lighthouse, prueba en hardware móvil físico ni validación de CORS del backend mediante POST real. La web sigue siendo SPA; HTML semántico tras render React, sin SSR/prerender. El canonical existente del sitio no se rediseñó como parte de esta experiencia.

Capturas y snapshots en output/playwright/: phase-b-*, phase-c-*, phase-d-sayri-clean.png, company-390.png, reading-mobile.png y production-*.png. Los archivos de configuración reduced.json y no-webgl.json permiten repetir esos modos con el skill oficial Playwright.

## Hero: hangar de sectores (27 de octubre de 2026)

Se añadió un hangar antes de la narrativa existente. Presenta 13 armaduras SVG originales, con tres familias de silueta, emblemas, colores y nombres propios. El selector es un grupo de botones nativos con `aria-pressed`; la descripción se anuncia con `aria-live`. Las flechas recorren el catálogo de forma circular y el enlace Explorar abre la ruta de la solución seleccionada. Las páginas de esos 13 sectores incluyen su identidad, áreas de gestión y el CTA existente de demo. Se preserva Encomiendas en el catálogo anterior y se agrega Planta de producción.

Las identidades se mantienen en `src/data/armors.ts`; cada slug debe existir también en `src/data/solutions.ts`. No se agregaron dependencias ni imágenes externas. La flotación usa transformaciones CSS, permite pausa manual y se desactiva con reduced motion. No requiere WebGL; la narrativa posterior conserva su fallback anterior. Las armaduras son ilustraciones vectoriales estilizadas, no modelos 3D ni renders fotorrealistas.

Verificación realizada:
- `pnpm build`, `node tests/leads.test.mjs`, `node tests/experience.test.mjs` y `node tests/hangar.test.mjs`: correctos (7 pruebas en total).
- Playwright: selección y navegación de los 13 rubros, vuelta al inicio y un h1 en cada destino; controles de pausa; scroll hacia abajo y vuelta al Hero; cambio a tema oscuro.
- Capturas a 390, 768 y 1440 px en `output/playwright/hangar-{ancho}.png`. Medición final sin overflow horizontal en los tres tamaños. Padding superior final: 18 px en móvil y 26 px en tablet/escritorio.
- Reduced motion: `animationName` de la armadura igual a `none`.
- Consola: advertencias de `THREE.Clock` obsoleto y del controlador WebGL en la narrativa preexistente; mensajes de liberación del contexto al navegar. No se realizó auditoría de rendimiento, contraste ni lectores de pantalla.

Limitaciones: estas páginas son presentaciones iniciales dentro de la SPA, no dominios externos independientes. Las áreas descritas son puntos de conversación para la demo; no se afirma disponibilidad de módulos concretos. El formulario no se volvió a probar visualmente con API simulada en esta intervención; sí pasó su regresión automatizada sin crear leads. No se repitieron todos los escenarios de pérdida de contexto de la narrativa anterior.

## Actualización: pulpo tecnológico como mascota

La versión de armaduras descrita arriba fue sustituida a petición del usuario por un pulpo inspirado en su referencia. `SectorMascot.tsx` reemplaza `ArmorFigure.tsx` tanto en el Hero como en las páginas de solución. Una sola mascota grande presenta el rubro elegido mediante una insignia con emblema propio, color ambiental y nombre. La apariencia blanca/dorada y los ojos azules se conservan entre especialidades. Se retiraron las tres vitrinas y el lenguaje de armaduras del Hero.

Asset generado con la herramienta integrada image_gen y referencia del usuario, no descargado. Archivos y prompt completo en `src/img/mascot/README.md`. La web sirve WebP con alpha de unos 422 kB, conservando el PNG original solo como fuente. No se añadieron dependencias. Es un render rasterizado que flota con CSS; no incluye articulación de tentáculos, rotación 3D real ni vestimentas distintas por rubro.

Verificación de esta actualización:
- Build y las siete pruebas existentes correctos; `git diff --check` correcto.
- Playwright: imagen cargada (1254 px de ancho natural), 13 selecciones y navegación a cada destino con mascota y un h1; retorno al inicio.
- Flechas siguiente/anterior: Comercial → Distribución → Comercial. Selección con Enter: Planta de producción.
- Pausa: `animationPlayState: paused`. Reduced motion: `animationName: none`, también tras recarga.
- 390, 768 y 1440 px: sin overflow horizontal una vez estabilizado el resize. Hubo una medición transitoria de overflow al redimensionar la narrativa GSAP preexistente; la medición posterior estable fue correcta sin cambios adicionales de CSS para ocultarlo.
- Tema claro y oscuro revisados; capturas en `output/playwright/octopus-{ancho}.png` y `output/playwright/octopus-dark.png`.
- Consola del recorrido: sin errores; advertencias preexistentes de Three.js/WebGL. No se repitió el formulario con API simulada, la pérdida de contexto WebGL ni una auditoría de accesibilidad o rendimiento.

## Actualización: trece pulpos con personalidad por rubro

Se generaron **13 renders independientes** a partir de la mascota base, uno por cada rubro del Hero. La versión actual sustituye el uso de una única imagen para todos los sectores descrito en el apartado anterior. El vestuario, accesorios y gesto diferencian ahora a cada personaje; se conservan el material blanco/dorado y los ojos azules para mantener una familia visual coherente.

El catálogo `src/data/sectorMascots.ts` relaciona slug, imagen y personalidad. `SectorMascot` lo utiliza tanto en el selector como en las páginas de solución. La base anterior queda disponible como fallback para futuras entradas sin render. Todos los actuales tienen imagen propia: una nueva prueba verifica correspondencia de las 13 entradas, archivos WebP válidos y hashes de contenido distintos.

Los originales PNG y sus WebP optimizados se guardaron en `src/img/mascot/sectors/`. El README de esa carpeta contiene la descripción de las trece personalidades; `prompts.json` conserva los prompts completos y `provenance.json` la correspondencia con los originales generados. Se usó image_gen integrado, sin nuevas dependencias ni descargas externas. Peso individual WebP: 384–570 kB; colección de aproximadamente 5,6 MiB. La carga inicial observada solicitó **una sola imagen** de la colección, no las trece.

Verificación realizada en esta actualización:
- `pnpm build`, `node tests/leads.test.mjs`, `node tests/experience.test.mjs`, `node tests/hangar.test.mjs`: correctos, ocho pruebas en total. `git diff --check` correcto.
- Playwright: selección de las 13 imágenes con decodificación correcta, 13 fuentes distintas y navegación a las 13 páginas, comprobando que cada destino mantiene el render elegido.
- Revisión visual de la colección en `output/playwright/pulpos-rubros.png` y capturas del Hero `personality-01.png` a `personality-13.png`.
- 390, 768 y 1440 px: sin overflow horizontal tras estabilizar el resize. Capturas `personalities-{ancho}.png`.
- Teclado: Enter selecciona Restaurantes. Pausa: `animationPlayState: paused`. Reduced motion: `animationName: none` en la transición de imagen. Cambio de tema capturado en `personalities-theme.png`.
- WebGL deshabilitado mediante simulación del navegador: narrativa en `data-quality: fallback`, mascota visible y selección de Agroindustria correcta.
- Sin errores JavaScript en el recorrido. Consola con las advertencias preexistentes de Three.js/WebGL; la primera apertura de la galería de QA produjo un 404 de favicon, corregido con favicon vacío en ese HTML de pruebas.

Límites: no se realizó auditoría de rendimiento o contraste, no se probaron lectores de pantalla y no se repitió la prueba visual del formulario con API simulada; la regresión automatizada del cliente de leads pasó. El movimiento sigue siendo flotación del render completo; no se generaron animaciones articuladas por personaje.

## Actualización: slider de vitrinas inspirado en un hangar

El Hero ahora presenta simultáneamente los pulpos en vitrinas iluminadas sobre plataformas, con el seleccionado más grande, brillante y adelantado. La galería ocupa todo el ancho; el texto introductorio queda encima y la ficha/CTA del seleccionado debajo. Se conserva el acceso directo por rubro y las páginas existentes.

Responsive: **4 vitrinas desde 1100 px y 3 por debajo**, incluidas tablet y móvil. La posición seleccionada es la segunda vitrina; en móvil queda centrada y en escritorio queda entre un vecino anterior y dos siguientes. Las flechas recorren circularmente los 13 rubros sin duplicar botones ni IDs. No hay rotación automática ni captura de rueda. La transición horizontal usa transformaciones CSS de 550 ms; la flotación se puede pausar. Reduced motion desactiva tanto flotación como transiciones.

Interacción: click en una vitrina, flechas anterior/siguiente, teclas izquierda/derecha/Inicio/Fin con foco en el carrusel, arrastre con mouse y deslizamiento táctil. `touch-action: pan-y` mantiene el desplazamiento vertical nativo. El gesto horizontal requiere más de 40 px y predominio sobre el eje vertical; se suprime el click posterior para evitar una segunda selección. Las vitrinas externas quedan fuera del árbol accesible y de la interacción. Solo la seleccionada entra en la secuencia de Tab; las teclas mueven también el foco al personaje nuevo.

La carga deja de ser de una sola imagen: se montan los 3/4 renders visibles y un vecino adicional a cada extremo (5/6 imágenes cercanas), asignando prioridad alta a la seleccionada y baja al resto. No se montan las trece imágenes a la vez ni se añadieron dependencias.

Verificación realizada:
- Build, regresión de leads, invariantes de experiencia y catálogo de mascotas: correctos, ocho pruebas. `git diff --check` correcto.
- Playwright: 1440 px → 4 visibles; 768 y 390 px → 3. Sin overflow horizontal en los tres tamaños. Borde responsive verificado: 1099 px → 3, 1100 px → 4.
- Las flechas recorrieron 13 selecciones distintas: vuelta a Comercial tras completar el catálogo y salto anterior de Comercial a Cochera.
- Teclado: Inicio → Comercial; Fin → Cochera; derecha desde Cochera → Comercial. Click en la vitrina vecina → Distribución.
- Arrastre real con mouse → Droguería; gesto táctil mediante eventos CDP → Ferretería. Repetición táctil tras ajuste de identificación del puntero → Droguería, con enlace verificado a «Gestión para droguerías».
- Transición normal medida: 0,55 s. Pausa: `animationPlayState: paused`. Reduced motion: transición 0 s y animación `none`.
- Cambio a tema oscuro capturado. WebGL simulado como no disponible: narrativa en fallback y slider operativo con 3 vitrinas, seleccionando Distribución.
- Sin errores JavaScript en el recorrido. Continúan las advertencias preexistentes de Three.js/WebGL.
- Capturas: `output/playwright/slider-1440.png`, `slider-768.png`, `slider-390.png` y `slider-dark.png`.

Límites: gestos probados en Chromium con mouse y entrada táctil simulada, no en un teléfono físico. No se realizó auditoría con lector de pantalla, de rendimiento ni contraste; no se repitió el formulario con API simulada porque no se modificó.

### Ajuste a cinco pulpos en escritorio

Por solicitud del usuario, desde 1100 px se muestran **5 vitrinas**, con el pulpo seleccionado en la tercera posición y dos vecinos a cada lado. Por debajo se mantienen 3, también con el seleccionado centrado. El cálculo de visibilidad y precarga ahora es simétrico: se montan 7 retratos cercanos en escritorio y 5 en tablet/móvil.

Verificación: `pnpm build` y `git diff --check` correctos. Playwright confirmó 5 visibles a 1440 y 1100 px, y 3 a 1099, 768 y 390 px; seleccionado centrado (desviación menor a 1 px) y sin overflow horizontal en los cinco anchos. Navegación circular comprobada: Comercial → anterior → Cochera → siguiente → Comercial. Capturas en `output/playwright/slider-five-{1440,768,390}.png`. No se repitieron las pruebas de formulario, gestos, temas ni fallback de la intervención anterior.

### Trece posturas individuales para los pulpos

Se regeneraron los 13 personajes a partir de su render por rubro para cambiar realmente la postura del cuerpo y los tentáculos. Las nuevas composiciones van desde el ofrecimiento hacia delante de Comercial hasta la postura recogida de Droguería, el cuidado de la planta en Agroindustria, la mirada elevada de Educación y la presentación frontal del conductor. Se conservan los materiales, vestuario y accesorios por sector. La diferencia está dibujada en cada render; no se obtiene girando la misma imagen mediante CSS.

La versión activa está en `src/img/mascot/sectors/poses-v2/`, con originales PNG, WebP de producción, prompts completos y procedencia. Se usó image_gen integrado para 13 ediciones independientes. Las imágenes anteriores se conservan sin sobrescribirlas. El catálogo `src/data/sectorMascots.ts` apunta a las nuevas rutas en el Hero y en las páginas de solución. Los 13 WebP suman 4.852.270 bytes y pesan entre 259.668 y 447.774 bytes cada uno.

Verificación de esta intervención:
- Build, cliente de leads, invariantes de narrativa y catálogo de mascotas: correctos, ocho pruebas. `git diff --check` correcto.
- Playwright recorrió las 13 selecciones, decodificó 13 fuentes distintas dentro de `poses-v2/` y verificó que los 13 destinos conservan la misma imagen seleccionada.
- 1440 px: 5 personajes visibles. 768 y 390 px: 3. Sin overflow horizontal en los tres tamaños; sin errores JavaScript en el recorrido.
- Revisión visual de la colección en `output/playwright/pulpos-posturas.png`, con capturas del Hero en `poses-slider-{1440,768,390}.png` y `poses-slider-variety.png`.
- La primera captura del Hero tras volver desde las páginas conservaba el scroll de retorno; se repitió desde el inicio para mostrar los personajes completos. El servidor anterior no estaba disponible y se reinició la vista previa local para completar la revisión.

Límites: son nuevas poses estáticas con la flotación CSS existente; no se generaron animaciones articuladas. La revisión se hizo en Chromium con reduced motion para comparar las imágenes sin movimiento. No se repitieron las pruebas de gestos, cambio de tema, pérdida de contexto WebGL, lector de pantalla ni formulario con API simulada, porque no se modificaron esas funciones.

### Cápsulas de exhibición: acabado de vidrio y metal

Se sustituyó el marco plano por una cápsula cilíndrica: corona superior metálica con superficie elíptica y luz inferior, vidrio con reflejos diagonales suaves, guías laterales y pedestal de varias capas con aro luminoso e indicadores. La seleccionada utiliza el color de su rubro. Los elementos son decorativos (`aria-hidden`) y se implementan en `src/components/hangar/capsules.css` sin nuevas imágenes, dependencias, Canvas ni filtros de desenfoque.

La imagen deja más espacio bajo la tapa y sobre el pedestal; se conservan las poses, la navegación y los cinco/tres personajes visibles. Verificación: `pnpm build` y `git diff --check` correctos. Playwright confirmó 5 visibles a 1440 px y 3 a 768 y 390 px, sin overflow horizontal; flecha siguiente cambió Comercial a Distribución. Capturas revisadas en `output/playwright/capsules-{1440,768,390}.png` y detalle en `capsule-detail.png`. No se añadieron ni repitieron pruebas automatizadas para este ajuste visual; no se repitieron formulario, gestos ni auditorías de contraste o rendimiento.

### Etiquetas por rubro

Las cápsulas muestran el nombre del rubro en la tapa en lugar de S01/S02. Se retiraron los alias como Impulso y Vector del catálogo activo, del pie del personaje, de su ficha y de las páginas de solución. Se adaptó la tipografía para etiquetas largas. Build, dos pruebas del catálogo y `git diff --check` correctos. Playwright revisó «Colegios profesionales» a 1440, 768 y 390 px sin overflow horizontal; no quedan nodos de alias ni de números de cápsula. Capturas en `output/playwright/sector-labels-{ancho}.png`. No se repitieron gestos ni formulario para este ajuste de nombres.

### Descripción y enlace propios bajo cada cápsula

Cada personaje ahora tiene una tarjeta con título del rubro, descripción breve y enlace «Explorar [rubro]». En escritorio/tablet la descripción y el botón aparecen al lado; en móvil se apilan para mantener legibilidad y un botón de al menos 44 px. Se reemplazó la ficha global del seleccionado por estas fichas individuales, dejando una solicitud de demo común debajo de la galería y un anuncio accesible del rubro seleccionado.

Las tarjetas son artículos: el botón de selección de cápsula y el enlace de navegación son hermanos, sin enlaces dentro de botones. Se mantienen 5/3 personajes, navegación del slider y las páginas por rubro. Verificación: build y `git diff --check` correctos. Playwright comprobó las 13 descripciones y enlaces «Explorar» con navegación a los 13 destinos; 5 visibles a 1440 px y 3 a 768 y 390 px, sin overflow horizontal, enlaces anidados ni errores JavaScript. Capturas `output/playwright/capsule-cards-{1440,768,390}.png`. No se repitieron formulario ni gestos táctiles en esta intervención.

### Módulos con símbolo + debajo de cada descripción

Se recuperaron los tres módulos de `capabilities` para cada rubro y se muestran en una lista semántica bajo su descripción, con el símbolo + en el color del sector. Cada lista conserva su enlace Explorar al lado en escritorio/tablet y debajo en móvil. Se amplió el área de texto sin cambiar el tamaño de las cápsulas. Build y `git diff --check` correctos. Playwright comprobó tres módulos en cada uno de los 13 rubros y revisó encaje de las tarjetas y overflow horizontal a 1440, 768 y 390 px. Capturas en `output/playwright/sector-modules-{ancho}.png`. No se repitieron formulario ni gestos para este ajuste de contenido.

### Selección inicial aleatoria

El Hero elige al montar un índice aleatorio entre los rubros disponibles, en lugar de iniciar siempre en Comercial. Se calcula una sola vez mediante el inicializador de estado; los cambios de pausa o tamaño de pantalla no vuelven a sortear la selección. Al recargar o regresar al inicio tras desmontarse el Hero, se realiza una nueva elección. Una selección aleatoria puede repetir el rubro anterior. Build y `git diff --check` correctos; no se repitió la validación visual para este cambio puntual.

### Flechas laterales junto a los pulpos

Se trasladaron los controles anterior/siguiente desde debajo de las tarjetas a ambos costados de las cápsulas, centrados a la altura de los personajes. Usan cheurones SVG, foco visible y un área de interacción mínima de 44 × 44 px. El contador permanece debajo. Se reservan márgenes adaptables para que las flechas estén dentro de pantalla sin cubrir los personajes. Entre 1100 y 1279 px las tarjetas apilan descripción y botón para evitar recortes con los cinco personajes.

Build y `git diff --check` correctos. Playwright verificó dos flechas dentro del viewport, navegación siguiente/anterior y ausencia de overflow horizontal a 1920, 1440, 1100, 768 y 390 px. Tras detectar texto demasiado alto a 1100 px, se ajustó esa franja y se comprobó el encaje de los 13 rubros. Capturas en `output/playwright/side-arrows-{1440,768,390}.png`. No se repitieron las pruebas de gestos ni formulario para este cambio de posición de controles.

### Narrativa retirada del inicio y reservada para páginas por rubro

Se retiraron la importación y el montaje de `SayriExperience` en HomePage. Todo `src/experience/` permanece guardado, con instrucciones para reutilizarlo en `src/experience/README.md`; no se activó aún en las páginas de solución. Se conservaron las anclas antiguas como marcador y el enlace del Hero ahora dice «Conoce la plataforma». Los estilos compartidos del CTA y anclas se trasladaron de `experience.css` a `brand.css` para que sigan aplicándose sin importar la narrativa.

Verificación: build, tres pruebas de narrativa conservada y `git diff --check` correctos. La salida de producción ya no incluye los chunks de escena, Three.js ni GSAP. Playwright confirmó ausencia de narrativa, Canvas y pin-spacer, un h1 y ausencia de overflow a 1440, 768 y 390 px. La segunda sección visible pasa a ser «Diseña, construye y controla tu empresa desde un solo lugar». El enlace del Hero llega a `#despues-de-la-historia` y la antigua ancla `#historia-sayri` se conserva. No se repitió el formulario ni se validó la narrativa en páginas sectoriales porque esa adaptación queda para trabajo futuro.

### Presentación interactiva de la plataforma después del Hero

Se sustituyó el bloque de título y tres acciones por `PlatformOverview`, una sección de dos columnas con el título «Tu operación conectada. Tu empresa bajo control.», explicación, CTA de demo existente y enlace a `#plataforma`. El segundo panel muestra el núcleo SAYRI conectado a Ventas, Inventarios, Operaciones, Finanzas e Inteligencia. Cada botón cambia una ficha HTML con explicación y tres capacidades. El grupo admite Tab/Enter y flechas, Inicio/Fin; anuncia cambios con aria-live y conserva el id del título anterior.

El gráfico utiliza HTML/SVG, logos locales y CSS; no añade dependencias, descargas, Canvas ni vuelve a activar la narrativa reservada. Solo la conexión seleccionada tiene movimiento suave de guiones, desactivado con reduced motion. Ambos temas tienen colores propios; en móvil texto y panel se apilan. Se acotó el diagrama a 420 px para reducir la altura respecto de la primera implementación.

Verificación realizada:
- `pnpm build`, `node tests/leads.test.mjs`, `node tests/experience.test.mjs`, `node tests/hangar.test.mjs`: correctos, ocho pruebas. `git diff --check` correcto.
- Playwright: las cinco selecciones cambiaron el nombre, título, explicación y tres capacidades; tecla Fin seleccionó Inteligencia y derecha volvió a Ventas.
- Demo conserva su URL configurada de WhatsApp (no se envió mensaje); el enlace secundario llega a `#plataforma`.
- Sin overflow horizontal a 1440, 768 y 390 px en tema claro y oscuro. Alturas finales de la sección: 786, 727 y 1128 px respectivamente; en móvil la altura incluye ambas columnas apiladas.
- Con movimiento normal la conexión usa `platform-flow`; reduced motion devuelve `animationName: none`. Sin errores JavaScript en el recorrido.
- Capturas finales: `output/playwright/platform-{light,dark}-{1440,768,390}.png`. Se ocultó la cabecera únicamente durante esas capturas para evitar que el sticky tape el recorte del componente.

No se realizó auditoría de contraste, lector de pantalla ni rendimiento; no se repitió la prueba visual del formulario con API simulada. La explicación es una presentación general de áreas de gestión, no un panel conectado a datos reales.

### Filosofía presentada como método de trabajo

Se reemplazó el bloque `.philosophy` por `WorkingMethod`: título de mayor ancho «Una mejor manera de trabajar empieza por entenderte», explicación y tres pasos semánticos en una lista ordenada: Entendemos, Simplificamos y Conectamos. Una línea con puntos enlaza los pasos horizontalmente en escritorio/tablet y verticalmente en móvil. El cierre conserva «La tecnología se adapta a las personas».

Cada paso tiene un gráfico SVG propio (personas/conversación, simplificación de un recorrido y conexión de información), decorativo y sin fondo opaco. No se requirieron imágenes rasterizadas ni generación de imágenes. Se implementó con HTML/CSS/SVG sin dependencias adicionales. IntersectionObserver activa una entrada breve por paso y se limpia al desmontar. El contenido es visible por defecto cuando no hay observador; reduced motion desactiva todas las entradas y el trazado de la línea.

Verificación:
- Build, pruebas de leads, narrativa conservada y catálogo de mascotas: correctos, ocho pruebas. `git diff --check` correcto.
- Playwright: tres pasos presentes a 1440, 768 y 390 px en ambos temas, sin overflow horizontal ni errores JavaScript. Alturas de sección: 763, 770 y 1305 px respectivamente; la altura móvil incluye los tres pasos apilados.
- Scroll con movimiento normal: los tres pasos recibieron la clase de entrada al verse; reduced motion devolvió `animationName: none`.
- Capturas revisadas en `output/playwright/method-{light,dark}-{1440,768,390}.png`. La cabecera sticky se ocultó únicamente durante las capturas del componente.

Límites: no se realizaron auditorías de contraste, lector de pantalla o rendimiento ni se repitió el formulario con API simulada. El flujo de contacto y la narrativa reservada no se modificaron.

### Retoques de legibilidad del método

Se ampliaron las etiquetas de los pasos (10 px en escritorio, 8 en tablet y 9 en móvil), se aumentó el trazo SVG de 1,6 a 2 px y se aclararon sus líneas secundarias. Se acercaron los gráficos a la línea numerada y se retiró el texto redundante de la derecha del cierre. Build y `git diff --check` correctos. Playwright revisó etiquetas y gráficos a 1440, 768 y 390 px, sin overflow horizontal; el nodo del texto retirado ya no existe. Capturas en `output/playwright/method-refined-{ancho}.png`. No se repitieron las pruebas funcionales para este cambio de presentación.

### Tres ilustraciones de la mascota para el método

Se generaron tres imágenes con fondo transparente de la mascota SAYRI para Entendemos, Simplificamos y Conectamos. Representan escucha y notas; transformación de un enredo en tres bloques ordenados; y un núcleo que conecta productos, equipo e indicadores. Se usó image_gen integrado con la mascota base como referencia, una llamada por imagen. Los PNG originales, WebP, prompts completos y procedencia están guardados en `src/img/mascot/method/`.

Las imágenes sustituyen los tres gráficos SVG dentro de `WorkingMethod`, conservando el icono de cierre y la línea numerada. Altura visual: 240 px en escritorio, 195 en tablet y 200 en móvil, con object-fit contain. Todas mantienen 1254 × 1254 px y transparencia. Las versiones web suman 1.168.848 bytes, se cargan mediante loading="lazy" y reservan dimensiones para mantener estable el contenido. No se añadieron dependencias.

Verificación: build, pruebas de leads, narrativa y catálogo de mascotas correctos (ocho pruebas), y `git diff --check` correcto. Playwright decodificó las tres imágenes con ancho natural de 1254 px a 1440, 768 y 390 px en ambos temas, sin overflow horizontal ni errores JavaScript. Se revisaron las capturas de la sección en `output/playwright/method-mascots-{light,dark}-{1440,768,390}.png`. La cabecera sticky se ocultó únicamente para los recortes. No se repitieron la animación de entrada ni el formulario con API simulada; no se modificaron esas funciones.

### Comparación interactiva de situaciones de la operación

Se sustituyó `.problem` por `OperationEvolution`, con cinco botones: Pedidos por mensaje, Doble digitación, Información aislada, Reportes manuales y Decisiones tardías. Cada selección cambia los dos paneles, sus recorridos de tres nodos, la explicación y una frase de resultado. El panel actual presenta registros dispersos; el de SAYRI muestra un recorrido ordenado. Son ejemplos ilustrativos de procesos, no pantallas del producto ni garantías de resultados.

Se generó un pulpo con fondo transparente como puente entre los paneles. Original, WebP, prompt completo y procedencia se conservan en `src/img/mascot/evolution/`; se usó image_gen integrado. No se añadieron dependencias ni Canvas. La escena funciona con HTML/CSS y una transición breve al cambiar la selección, desactivada con reduced motion. La comparación se anuncia con aria-live; los botones permiten Tab, clic, flechas e Inicio/Fin. El cierre enlaza a `#contacto`.

Verificación realizada:
- Build, regresión de leads, narrativa reservada y catálogo de mascotas correctos (ocho pruebas). `git diff --check` correcto. Se confirmó que el WebP terminado forma parte del build final.
- Playwright verificó las cinco selecciones y sus títulos distintos, con tres nodos por panel. Fin seleccionó decisiones tardías y derecha volvió a pedidos.
- Temas claro/oscuro a 1440, 768 y 390 px: sin overflow horizontal ni errores JavaScript. Mascota decodificada correctamente y transparencia revisada en las capturas.
- Reduced motion: `animationName: none`. Enlace de cierre comprobado a `#contacto`, sin enviar formulario ni crear leads.
- Capturas revisadas en `output/playwright/evolution-{light,dark}-{1440,768,390}.png`; cabecera sticky oculta solo durante los recortes.

Límites: no se realizó auditoría de contraste, lectores de pantalla o rendimiento, ni se repitió el formulario con API simulada. En móvil los dos paneles se apilan y la mascota los enlaza verticalmente; en tablet y escritorio se mantienen a ambos lados de ella.

### Crecimiento progresivo como recorrido explorable

Se sustituyó `.scale` por `ProgressiveGrowth`, conservando `id="procesos"`. El título es «Empieza con un proceso. Crece a tu ritmo». Los siete niveles —Dato, Microproceso, Proceso, Capacidad, Área, Empresa e Inteligencia— son botones que actualizan una explicación, ejemplo y tres conceptos relacionados. El mismo recorrido comienza con producto/cantidad/cliente y llega al análisis de resultados. Se indica expresamente que puede comenzarse en cualquier nivel y que no es necesario implementar todo a la vez.

Un núcleo SVG añade piezas y conexiones según el nivel y permite retroceder. La mascota generada tiene una postura nueva de construcción, con un tentáculo levantando una pieza y otros sujetando bloques. Se usó image_gen integrado; original PNG, WebP, prompt y procedencia quedan en `src/img/mascot/growth/`. No se añadieron dependencias, Canvas, autoplay ni captura de rueda. En móvil los niveles aparecen en una lista vertical y la ficha, el gráfico y el pulpo se apilan.

Verificación:
- Build, regresión de leads, narrativa reservada y catálogo de mascotas: correctos, ocho pruebas. `git diff --check` correcto.
- Playwright: siete selecciones con sus ejemplos correspondientes. El diagrama pasó de 1 a 7 nodos activos y de 0 a 6 conexiones; cada nivel coincidió con el estado esperado.
- Teclado: Fin seleccionó Inteligencia; derecha volvió a Dato. El cierre llega a `#contacto`, sin enviar formulario ni crear leads.
- Temas claro/oscuro a 1440, 768 y 390 px sin overflow horizontal. La imagen se decodificó con 1254 px de ancho natural.
- Reduced motion: la transición de la ficha devolvió `animationName: none`. Sin errores JavaScript en el recorrido.
- Capturas revisadas: `output/playwright/growth-{light,dark}-{1440,768,390}.png`; cabecera sticky oculta solo durante los recortes.

Límites: los nodos son una representación conceptual, no un conteo de módulos contratados o desplegados. No se realizaron auditorías de contraste, rendimiento o lector de pantalla; no se repitió el formulario con API simulada. La mascota no cambia de pose por nivel ni tiene articulación animada; es un render nuevo y diferente de los anteriores.

### Interacción explícita de los niveles

Los siete niveles ahora son tarjetas completas con un ejemplo y la acción «Ver ejemplo →». La tarjeta activa muestra «Explorando ✓»; se reforzaron bordes, contraste y estados hover/foco. Se añadieron controles Anterior y Siguiente nivel, con límites deshabilitados. En móvil, la selección solicita foco y desplazamiento al detalle; reduced motion evita el desplazamiento animado.

Verificación: `pnpm build`, ocho pruebas existentes y `git diff --check` correctos. Playwright confirmó selección de Proceso a 1440, 768 y 390 px sin overflow horizontal, avance a Capacidad y regreso a Proceso. Capturas disponibles en `output/playwright/growth-cards-{light,dark}-{1440,768,390}.png`; se revisaron visualmente las capturas oscuras de escritorio y móvil. No se realizó una auditoría con lector de pantalla.

### Recorrido de un pedido

La cuadrícula estática se sustituyó por `OrderJourney`: ocho tarjetas nativas conectadas, un ejemplo de 20 unidades y detalle con información recibida, información entregada y equipo responsable. La secuencia sigue dos filas en escritorio y una columna en móvil. Selección explícita, controles Anterior/Siguiente con extremos deshabilitados, flechas de teclado e Inicio/Fin; en móvil se enfoca el detalle y se desplaza hasta él. Reduced motion evita desplazamiento animado y transiciones. Se reutiliza la mascota local Conectamos, sin nuevos assets ni dependencias. El CTA conserva `#contacto`.

Verificación: build y ocho pruebas existentes correctos; `git diff --check` sin errores. Playwright recorrió las ocho etapas, verificó el extremo final, regreso a Analítica y selección por tecla Fin. Ambos temas a 1440, 768 y 390 px sin overflow horizontal; foco móvil confirmado en `journey-detail`. Sin errores JavaScript tras recargar la página; el log previo contiene errores transitorios de HMR durante la creación de los archivos. Capturas en `output/playwright/order-journey-{dark,light}-{1440,768,390}.png`, con revisión visual del escritorio oscuro. No se probaron lector de pantalla ni formulario con API simulada en esta iteración. El recorrido es ilustrativo y no promete que todas las etapas estén implementadas automáticamente para cada cliente.


### Ocho mascotas por etapa del pedido

Se generaron ocho renders con imagegen integrado: Cliente, Pedido, Stock, Procesamiento, Facturación, Cobranza, Analítica y Decisión, cada uno con distinta postura y accesorios. Originales PNG y WebP de 1254 × 1254 con alpha verificado en `src/img/mascot/journey/`; prompts y procedencia en `generation.json`. WebP: 356–439 KiB por imagen. La misma selección del detalle controla la imagen al usar tarjetas, Anterior/Siguiente y teclado. Entrada CSS de 280 ms, desactivada con reduced motion; relación de aspecto fija para reservar espacio. Imágenes decorativas con alt vacío.

Validación: build, ocho pruebas existentes y diff check correctos. Playwright en localhost:5180 confirmó ocho URLs distintas con decodificación correcta; Anterior cambió a Analítica, Siguiente a Decisión e Inicio a Cliente. A 1440, 768 y 390 px no hubo overflow y reduced motion devolvió animationName none. Capturas `output/playwright/journey-mascot-{1440,768,390}.png`; revisión visual del escritorio claro y de los ocho renders originales. No se realizó auditoría de rendimiento o lector de pantalla.


### Cierre del recorrido

Se sustituyó el footer interno por un contenedor con estilos propios para evitar heredar padding y fondo del pie de página general. Mensaje con jerarquía, texto de apoyo y CTA sólido «Aplicarlo a mi negocio» hacia #contacto. Móvil: disposición vertical y botón de ancho completo; foco visible y reduced motion. Se eliminaron estilos obsoletos del footer anterior.

Build correcto. Playwright verificó ambos temas a 1440, 768 y 390 px sin overflow y destino #contacto preservado. Botón de 211 px en escritorio/tablet y 292 px en móvil, altura mínima observada de 55 px. Capturas journey-closing-{dark,light}-{1440,768,390}.png en output/playwright; revisión visual de escritorio y móvil oscuros. No se repitieron pruebas de formulario ni auditoría de accesibilidad.


### Capacidades reservadas para páginas por rubro

Se retiró de Home la sección «Todo se conecta cuando hace falta». Contenido conservado para reutilización: Comercial (Clientes, Ventas, Pedidos, CRM); Operaciones (Compras, Productos, Inventarios); Finanzas (Caja, Facturación, Cuentas por cobrar); Gestión (Usuarios, Permisos, Configuración); Inteligencia (Reportes, Dashboards, Analítica).

El ancla #plataforma ahora pertenece a PlatformOverview. Su enlace interno Explorar la plataforma apunta a #platform-modules, el panel interactivo, para evitar un enlace a sí mismo. OrderJourney continúa directamente con Operación móvil. Verificación: build de producción y diff check.


### Presentación de SAYRI móvil

Se reemplazó el teléfono esquemático por MobileOperation, con nuevo texto, Clientes/Pedidos/Stock y CTA a #contacto. Mascota y teléfono generados mediante imagegen integrado; PNG original y WebP en src/img/mascot/mobile, prompt completo en generation.json. Composición SVG con AppHome.jpeg original en la pantalla; clips conservan tentáculos y notch por delante. La captura muestra acceso por RUC, no una pantalla operativa. Flotación CSS de seis segundos con movimiento reducido sin animación.

Build y ocho pruebas existentes correctos; diff check correcto. Playwright: ambos temas a 1440, 768 y 390 px sin overflow, CTA #contacto y animationName none bajo reduced motion. Capturas mobile-operation-{dark,light}-{1440,768,390}.png y mobile-operation-final-{1440,390}.png en output/playwright. Revisión visual de escritorio y móvil; no auditoría de lector de pantalla ni rendimiento ni repetición del formulario con API simulada.


### Retiro de cinco secciones de Home

Por solicitud se retiraron la gráfica de información por área, SAYRI AI, el listado de ecosistema por sector, el caso LOPESA y el CTA final azul. Se limpiaron imports sin uso, enlaces Sayri AI/Casos de cabecera y pie; Sectores ahora apunta al hangar mediante #sectores. Se conserva el formulario de contacto y los CTA restantes. Build y diff check correctos; comprobación de código de las cinco ausencias y referencias de navegación. No se repitió validación visual en esta eliminación.


### Ecosistema de ocho tecnologías

TechnologyEcosystem sustituye el listado de herramientas. Nueva mascota frontal con ocho puntas visibles, generada con imagegen integrado; se corrigieron las primeras versiones de seis brazos. Original y WebP alpha en src/img/mascot/technology; prompts/procedencia en generation.json. WebP: 512.73 kB en build. Emblemas HTML independientes para AWS, PostgreSQL, Python, Django, React, React Native, Git y CI/CD. SVG de cinco marcas desde Simple Icons; origen documentado en src/img/technology/README.md. AWS es marca tipográfica con sonrisa; CI/CD es un ciclo propio. No se añadieron dependencias.

Botones nativos con selección aria-pressed, detalle aria-live, flechas e Inicio/Fin. Flotación independiente en escritorio; móvil presenta la mascota arriba y ocho controles en dos columnas, con foco y desplazamiento al detalle al seleccionar. Reduced motion desactiva flotación y suavizado.

Validación: build, ocho pruebas existentes y diff check correctos. Playwright comprobó las ocho selecciones, Inicio AWS y Fin CI/CD, ambos temas a 1440, 768 y 390 px sin overflow horizontal. Foco móvil en technology-detail y animationName none con reduced motion confirmados. Capturas technology-{dark,light}-{1440,768,390}.png en output/playwright; revisión visual de escritorio y tablet oscuros. No se realizaron auditorías de lector de pantalla, marcas o rendimiento.


### Corrección anatómica de la mascota tecnológica

La versión inicial tenía dos extremos laterales inferiores sin unión al cuerpo; la revisión anterior no detectó el defecto. Se corrigió con imagegen para añadir segmentos articulados continuos hasta el cuerpo, conservando ocho puntas y la pose frontal. Nuevo original sources/nucleo-v2.png y WebP nucleo-v2.webp; anterior conservado. Prompt en repair-v2.json. Alpha verificado y build/diff check correctos. Playwright confirmó el nuevo asset a 1440, 768 y 390 px sin overflow; capturas technology-repair-{1440,768,390}.png en output/playwright. Revisión visual de la imagen generada y escena de escritorio. Sin cambios en lógica de selección ni nueva auditoría de accesibilidad.

### Preguntas frecuentes: distribución y lectura
Se reemplazó el bloque estrecho por `FrequentlyAskedQuestions`, con un contenedor de 1200 px, dos columnas desde 768 px y una columna en móvil. Acordeón nativo `details/summary`, primera respuesta abierta, grupo exclusivo, foco visible e indicadores +/− decorativos. Se ampliaron las respuestas sin prometer capacidades fuera del alcance acordado y se reutilizó la URL de WhatsApp configurada.

Verificación: `pnpm build` y `git diff --check` correctos. Playwright completó la interacción con el acordeón y guardó capturas a 390, 768 y 1440 px, sin desbordamiento horizontal en ninguno de esos tamaños. Capturas en `output/playwright/faq-*.png`. No se enviaron formularios ni mensajes.

### Contacto: conversación con menor fricción
Se simplificó `ContactForm`: elección WhatsApp/correo con un único dato de contacto obligatorio; nombre y mensaje opcionales, sin apellido visible. Las áreas de interés se incorporan a `NeedDescription`, conservando el contrato público y sin cambiar el backend. El texto libre admite 4800 caracteres para reservar espacio a las selecciones dentro del límite de 5000. Se añadieron pasos de seguimiento, tarjeta y alternativa de WhatsApp configurada. No se añadieron promesas de plazo ni de tratamiento de datos no verificadas.

Verificación: build correcto y tres pruebas del cliente público aprobadas. Playwright con API interceptada confirmó validación del contacto vacío, envío solo de teléfono y selección, envío solo de correo y éxito. Capturas a 390, 768 y 1440 px sin overflow horizontal en `output/playwright/contact-*.png`. No se crearon leads reales. Las pruebas unitarias existentes cubren conservación de datos ante fallo de red; no se repitió ese escenario en navegador.

### Paleta base #07121c
Se centralizó la paleta en `src/styles/palette.css`, importada después de los estilos anteriores: fondo #07121c, superficie #111c25, elevado #1b252e, hover #252e37 y borde #3e4750. Las superficies oscuras de las secciones principales comparten la base del Hero y los componentes consumen los mismos tokens. El tema claro conserva superficies claras y usa la base para la tinta. Los colores específicos de rubros y avisos se conservan. Build y diff check correctos. Playwright comprobó los fondos efectivos, detectó excepciones de especificidad en WorkingMethod y tokens por sección, corregidas en la misma hoja. No se afirma auditoría completa de contraste.

### Elecciones / Suffrage
Se añadió el rubro Elecciones al catálogo, al selector de especialidades y al hangar, con ruta propia `/soluciones/elecciones`, SEO y sitemap. Especialista «Coordinador electoral», personalidad «Imparcial · Organizado», pulpo con urna y checklist generado mediante imagegen integrado. WebP RGBA de 1254 × 1254, 447.99 kB en build, en `src/img/mascot/sectors/poses-v2/elecciones.webp`; prompt completo y procedencia en `elecciones-generation.json`.

La página desarrolla gestión electoral, candidaturas, padrón, votación, resultados, trazabilidad, seis áreas escolares, cinco pasos y público objetivo. Explica de forma visible la votación asistida e identificada y ofrece el detalle de funciones no incluidas según el adjunto del usuario. Reutiliza navegación, pie, Seo, SectorMascot y CTA existente de demostración; el contacto sigue en la portada. No añade dependencias ni modifica el backend.

Verificación: `pnpm build`, tres pruebas de leads, tres de experiencia y dos del hangar correctos; `git diff --check` correcto. Se actualizó la cantidad esperada del hangar a 14. Playwright ejecutó capturas a 390, 768 y 1440 px en ambos temas (`output/playwright/elecciones-*.png`), navegación de funcionalidades, apertura del detalle de alcance, emulación reduced motion y navegación desde el selector Elecciones hasta su página. Revisión visual directa de la captura móvil clara y de la mascota generada. La consola capturada solo registra el aviso informativo de React DevTools. No se enviaron formularios, no se crearon leads, no se hizo una auditoría completa de accesibilidad o rendimiento ni se verificó un backend electoral.
