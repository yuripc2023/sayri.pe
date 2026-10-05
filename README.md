# SAYRI web

Sitio corporativo en español con React 19, Vite 8, TypeScript y React Router. La página principal cuenta la construcción de una empresa mediante una escena continua de React Three Fiber y una timeline GSAP + ScrollTrigger. Tailwind 4 se utiliza en el layout de la experiencia sin Preflight; se conserva el CSS de marca existente.

## Desarrollo y validación

El árbol de dependencias usa pnpm y `pnpm-lock.yaml`. También se mantiene `package-lock.json` sincronizado para instalaciones con npm. No mezclar ambos gestores sobre el mismo node_modules.

```bash
pnpm install --frozen-lockfile
pnpm dev --host 0.0.0.0
pnpm build
pnpm preview --host 0.0.0.0
node tests/experience.test.mjs
node tests/leads.test.mjs
```

Vite imprime la URL y el puerto disponibles. Las pruebas TypeScript con eliminación nativa de tipos requieren Node 24. No existe un script de lint ni una configuración ESLint; el build comprueba TypeScript estricto. Para reglas de desarrollo, consultar [AGENTS.md](AGENTS.md).

## Experiencia interactiva

En `/`, ocho etapas: Dato → Microproceso → Proceso → Capacidad → Área → Empresa → Sayri → Inteligencia. Scroll nativo, reversible, navegación por etapas y teclado, modos de lectura/salto y geometrías procedurales. Un Canvas lazy, DPR limitado, instancing y renderizado bajo demanda. Móvil y tablet reciben menos nodos. Sin WebGL, con reduced motion o tras perder contexto, la historia está disponible en HTML sin pinning. Sayri AI mantiene el estado Próximamente.

La implementación modular está en `src/experience/`. Análisis, arquitectura, fases, limitaciones y evidencia visual en [docs/experience.md](docs/experience.md); capturas en `output/playwright/`.

## Configuración y rutas

Definir `VITE_CALENDAR_URL` en `.env` para activar el enlace de agenda. Si no existe, `ScheduleDemoButton` reutiliza WhatsApp. El contacto se centraliza en `src/config/contact.ts`.

Rutas existentes: `/`, `/soluciones` y `/soluciones/:slug`, con trece sectores definidos en `src/data/solutions.ts`. Las páginas de solución pendientes tienen `noindex,follow` y no se incluyen en `public/sitemap.xml`. La navegación conserva las anclas plataforma, procesos, sectores, sayri-ai, casos, faq y contacto.

## Formulario de contacto

Disponible en `/#contacto` y desde Contacto en el menú. Registra leads con `POST https://api.atic.pe/api/crm/public/leads/` usando JSON y `credentials: 'omit'`, sin Authorization. El cliente Fetch está en `src/services/leads.ts`.

`node tests/leads.test.mjs` comprueba validaciones, payload sin campos internos o vacíos, HTTP 201/400/429/503, errores de red y reintento. Las pruebas simulan respuestas y no crean leads en producción. La comprobación en navegador también usa respuestas simuladas.

Si el navegador bloquea por CORS, habilitar en el backend el origen exacto de `window.location.origin`: `https://www.sayri.pe` para el dominio publicado, `https://sayri.pe` si se sirve allí y el origen/puerto local impreso por Vite, normalmente `http://localhost:5173` para desarrollo o `http://localhost:4173` para preview. Permitir POST y Content-Type y responder al preflight OPTIONS. No se requieren credenciales CORS. JavaScript no puede distinguir CORS de una conexión fallida; revisar Network. La autorización CORS real del backend no se ha validado con un POST en producción.

## Assets y alcance

Se reutilizan los logos oficiales disponibles. No se descargaron modelos, imágenes ni fuentes adicionales para la experiencia. La fuente existente Roboto continúa cargándose desde Google Fonts. No hay modelos GLB/GLTF ni texturas pesadas. La analítica GA/GTM/Meta no está instalada.

La web es una SPA; los metadatos iniciales existen en index.html y el contenido semántico se renderiza con React. No hay SSR/prerender. Publicar requiere desplegar `dist/` y configurar fallback de rutas al index.html.
