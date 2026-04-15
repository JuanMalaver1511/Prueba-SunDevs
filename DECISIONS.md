# Decisions

## Enfoque General De La Solucion

La solucion se planteo en dos capas bien separadas:

- un backend responsable de leer, limpiar y transformar los datos
- un frontend responsable de presentar esos datos de forma clara

La idea fue evitar que el frontend dependiera del payload crudo del proveedor externo. En lugar de eso, el backend actua como una capa de adaptacion y entrega un contrato propio, mas pequeño y estable.

## Decisiones Tecnicas Principales

### Backend con NestJS

Se uso `NestJS` porque facilita una estructura modular y clara, especialmente para separar controller, service, repository y mapper.

### DTOs e interfaces

Se agregaron:

- DTOs para definir la salida del backend
- interfaces para describir el payload crudo de entrada

Esto hace que la transformacion de datos sea mas legible y menos propensa a errores.

### Mapper separado

La logica de transformacion y calculo de hype se concentró en un mapper. Eso evita meter reglas de negocio en el controller o en el repository.

### Utilidad de fecha con JavaScript nativo

La fecha relativa se implementó sin `moment`, `date-fns` ni librerias similares, porque el reto lo pedía explícitamente.

### Frontend con React + Vite

Se usó `React` por simplicidad y `Vite` para un entorno de desarrollo rápido. El frontend consume `/api/videos` y resuelve tres estados básicos: carga, error y éxito.

### Proxy de Vite

Se configuró proxy en desarrollo para que el frontend pueda llamar `/api/videos` sin hardcodear `http://localhost:3000`.

## Organizacion Del Proyecto

La organizacion del backend quedó orientada por feature:

- `videos/`
- `common/`

Dentro de `videos/` se separó:

- `videos.controller.ts`
- `videos.service.ts`
- `videos.repository.ts`
- `videos.mapper.ts`
- `dto/`
- `interfaces/`

Esto se eligió para mantener cada responsabilidad localizada y permitir crecimiento futuro sin convertir `src/` en una carpeta plana con archivos mezclados.

En frontend se mantuvo una estructura liviana porque el alcance actual es pequeño. La mayor parte de la complejidad está en la vista principal y sus estilos.

## Supuestos O Simplificaciones Realizadas

- El archivo `backend/mock-youtube-api.json` se toma como fuente oficial de datos.
- No se agregaron variables de entorno porque el proyecto aún no lo necesita.
- No se implementó paginación ni filtros porque no eran parte del alcance.
- El frontend usa una sola pantalla principal.
- El cálculo de tiempo relativo usa aproximaciones simples:
  `30` días por mes y `365` días por año.
- Cuando un video tiene `viewCount` igual a `0`, el hype se fuerza a `0`.

## Problemas Encontrados Y Como Los Resolvi

### 1. `GET /` devolvía 404

Inicialmente el backend solo exponía `GET /api/videos`. Se agregó `GET /` para responder con un mensaje simple de salud del servicio.

### 2. `GET /api` devolvía 404

Se agregó una ruta `GET /api` como índice básico de endpoints disponibles, para evitar que parezca que la API está rota al abrir esa ruta manualmente.

### 3. Error de TypeScript con `ignoreDeprecations`

La configuración tenía:

```json
"ignoreDeprecations": "6.0"
```

Ese valor no era válido para la versión instalada de TypeScript. Se corrigió a:

```json
"ignoreDeprecations": "5.0"
```

Con eso volvieron a pasar `npm test` y `npm run build` en el backend.

### 4. Estructura inicial demasiado plana

La primera versión del backend tenía demasiada responsabilidad concentrada en un solo service. Se refactorizó a una estructura más limpia con módulo de videos, repository, mapper, DTO e interfaces.

### 5. Estilo inicial del frontend demasiado visual

La primera propuesta visual tenía fondos más decorativos. Luego se ajustó a una línea más profesional con colores sólidos, menos efectos y una jerarquía visual más sobria.

## Prompts Mas Relevantes Utilizados

Se utilizó asistencia de IA durante el desarrollo. Los prompts más relevantes del flujo fueron:

1. "quiero que mejores el codigo que sea mas organizado puede ser por DTOS que se vea mas top y organizado por carpetas y mejor estructurado clean code"

Ese prompt impulsó la refactorización del backend hacia una estructura modular por feature.

2. "Genial, ahora quiero que mejores el front que se vea mas profesional, con colores mas solidos sin usar degrade etc"

Ese prompt llevó al rediseño visual del frontend hacia una interfaz más sobria.

3. "ahora quiero esto README.md ... DECISIONS.md ..."

Ese prompt definió la necesidad de dejar documentación clara de uso y de decisiones técnicas.

## Estado Final

El backend:

- expone `GET /api/videos`
- limpia el payload mock
- calcula hype
- transforma fechas
- devuelve un contrato estable

El frontend:

- consume la API
- maneja carga y error
- muestra una grilla
- destaca el video con más hype

La solución quedó funcional, organizada y preparada para crecer sin rehacer la base.
