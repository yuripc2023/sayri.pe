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
