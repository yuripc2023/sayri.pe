# Mascotas del método SAYRI

Tres imágenes independientes generadas con **image_gen integrado**, referencia `../sayri-octopus.png` y `transparent_background: true`. Comparten el acabado blanco/dorado, ojos azules y anatomía de la mascota. Cada una representa una etapa del método:

| Paso | Idea visual | Original transparente | Versión web |
| --- | --- | --- | --- |
| Entendemos | Escucha, conversación y observación; toma de notas con tablet y lápiz | [entendemos.png](sources/entendemos.png) | [entendemos.webp](entendemos.webp) |
| Simplificamos | Un enredo se transforma en tres bloques ordenados | [simplificamos.png](sources/simplificamos.png) | [simplificamos.webp](simplificamos.webp) |
| Conectamos | Un núcleo une productos, personas e indicadores | [conectamos.png](sources/conectamos.png) | [conectamos.webp](conectamos.webp) |

PNG originales: 1254 × 1254 px, RGBA. WebP de producción: mismo tamaño y transparencia, convertido con FFmpeg/libwebp, calidad 85 y compresión 6, sin redimensionar. Pesos: Entendemos 356.852 bytes, Simplificamos 355.700 bytes y Conectamos 456.296 bytes.

`prompts.json` conserva el prompt común completo y la idea específica de cada imagen. El prompt enviado concatena `basePrompt + "\nSpecific illustration: " + concept`. `provenance.json` relaciona el resultado generado con sus archivos finales. No se usó la API/CLI de generación ni se descargaron imágenes externas.

Las versiones WebP se importan en `WorkingMethod.tsx`, con carga diferida nativa y tamaño reservado. Reemplazan los tres diagramas SVG de los pasos; el icono pequeño de cierre se conserva. Las imágenes son decorativas para tecnología asistiva porque el título y la explicación de cada paso permanecen en HTML. Se mantiene la animación de entrada existente y reduced motion.

Vista integrada: `output/playwright/method-mascots-dark-1440.png`.
