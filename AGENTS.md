# SAYRI web

## Contexto y arquitectura
Sitio corporativo en español. SPA con React 19, TypeScript estricto, Vite 8 y React Router 7. La página principal está en `src/pages/HomePage.tsx`; rutas de soluciones en `src/app/App.tsx`. Sin backend local ni ESLint configurado.

## Estructura y convenciones
- `src/components/`: navegación, UI y componentes compartidos; PascalCase y exports nombrados. Las páginas usan default export.
- `src/experience/`: narrativa por scroll, escena única R3F, timeline GSAP, hooks y overlays HTML.
- `src/styles/`: CSS global y marca; estilos de experiencia aislados. Tailwind 4 sin Preflight para no alterar estilos previos.
- `src/data/solutions.ts`, `src/config/contact.ts`: fuentes de datos y configuración. Logos PNG en `src/img/`; no hay modelos GLB/GLTF.
- `src/services/leads.ts`: API pública con Fetch; jamás añadir credenciales ni registrar datos personales.

## Reutilización y desarrollo
Reutilizar `Header`, `Footer`, `Seo`, `ScheduleDemoButton`, `ContactForm` y `useTheme`. Preservar rutas, anclas existentes y flujo de demos. No modificar backend, descargar assets externos ni añadir dependencias sin necesidad. Usar pnpm para dependencias: el árbol instalado y el lockfile vigente son pnpm. Mantener también el lockfile npm sincronizado si cambia package.json.

## Animación y Three.js
Una timeline GSAP + ScrollTrigger con labels, pin y scrub; limpiar con context.revert en desmontaje y cambios de capacidades. Scroll reversible y nativo, sin capturar la rueda. No usar setState por frame: animar referencias y objetos mutables. Un Canvas continuo, carga diferida, frameloop demand, DPR limitado y geometrías/materiales reutilizados. Instancing para nodos; no sombras ni postprocessing innecesarios. Liberar recursos y ofrecer fallback ante error o pérdida de contexto.

## Responsive, accesibilidad y SEO
Calidades high/medium/low según viewport y capacidades; sin WebGL o con reduced motion usar narrativa HTML equivalente sin pinning. Contenido semántico en HTML, un h1 por página, Canvas solo decorativo. Teclado, foco visible, enlaces para saltar o leer sin animación, contraste en ambos temas y ningún overflow horizontal. Probar al menos 390px, 768px y desktop.

## Verificación y comandos
- `pnpm dev --host 0.0.0.0`: desarrollo.
- `pnpm build`: TypeScript + producción; corregir errores antes de avanzar de fase.
- `node tests/leads.test.mjs`: regresión del cliente público, sin crear leads reales.
- `node tests/experience.test.mjs`: invariantes de narrativa y geometría cuando exista.
- Validación visual con Playwright CLI: scroll adelante/atrás, navegación, resize, móvil, reduced motion, fallback, consola y formulario con API simulada. Artefactos en `output/playwright/`.

## Definición de terminado
Fases pequeñas verificadas; build y pruebas correctos; narrativa visible y reversible en navegador, fallback accesible y CTA existente operativo. Registrar medidas y limitaciones reales en `docs/experience.md`, sin afirmar auditorías o pruebas no realizadas.
