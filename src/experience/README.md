# Narrativa reservada para las páginas por rubro

La narrativa «La empresa, desde su origen» está retirada de `HomePage.tsx` por decisión del usuario. Se conservan componentes, contenido, escena R3F, hooks de capacidades, timeline GSAP, fallback y pruebas para reutilizarlos cuando se diseñen las páginas de cada sector.

Entrada: `SayriExperience.tsx` (export nombrado `SayriExperience`). No se importa desde la portada, de modo que la escena, Three.js y GSAP quedan fuera de su bundle actual.

Para reutilizarla en una página:

1. Importar `SayriExperience` e insertarlo después del Hero de ese sector.
2. Adaptar `content.ts` y los ejemplos al rubro. Si varias páginas necesitan contenidos distintos, parametrizar el componente y los overlays/fallback antes de compartirlo; no modificar una copia global con textos de un solo sector.
3. Conservar un único h1 en la página (la narrativa utiliza un h2 oculto como título de sección).
4. Colocar después de la narrativa el destino `id="despues-de-la-historia"`, con `tabIndex={-1}`, para el enlace «Saltar historia». La sección utiliza `id="historia-sayri"`; evitar duplicados dentro de una página.
5. Mantener carga diferida, limpieza de ScrollTrigger, scroll nativo/reversible, calidades y narrativa HTML sin pinning para reduced motion o ausencia de WebGL.
6. Validar el contenido y la geometría con `node tests/experience.test.mjs`, el build y la revisión visual indicada en AGENTS.md.

Los estilos generales de `.experience-cta` y de las anclas se trasladaron a `src/styles/brand.css`; los estilos de narrativa permanecen en `experience.css`. La portada conserva las anclas antiguas en un marcador sin contenido para no romper enlaces anteriores. No se activó la narrativa todavía en ninguna página de solución.
