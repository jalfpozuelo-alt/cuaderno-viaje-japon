# Cuaderno de viaje · Japón

Proyecto independiente de la agenda personal del viaje. Incluye los trece días reales, hoteles, visitas, transportes, horarios de referencia, preparativos, buenas prácticas y enlaces del itinerario existente. Los datos viven en `src/data/` y la interfaz en `src/main.tsx`.

La firma del autor aparece como marcador `Tu nombre o marca`: debe sustituirse antes de ofrecer la guía a terceros. Esta edición contiene detalles personales del viaje; revisar qué se quiere compartir antes de hacer público el repositorio.

## Desarrollo

```bash
npm install
npm run dev
```

Abre la dirección local que indique Vite. Para generar la versión publicable: `npm run build`. El resultado queda en `dist/`. La aplicación es PWA y conserva notas, visitas y tareas en el almacenamiento local del dispositivo.

## Publicación independiente

Crear un repositorio nuevo para este proyecto. El archivo `vite.config.ts` ajusta la ruta base automáticamente en GitHub Actions según el nombre de ese repositorio. Esta carpeta no utiliza el repositorio de la agenda personal.

## Alcance

Es una edición de producto en desarrollo con datos reales de Japón. No modifica la agenda original. Antes de distribuirla hay que revisar permisos de fotografías, datos personales que se quieran compartir y horarios de 2027.
