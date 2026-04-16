# Decisions

## Enfoque general de la solución

Desde el inicio quise mantener las responsabilidades bien separadas para evitar mezclar lógica innecesaria. Por eso dividí la solución en dos partes claras: backend y frontend.

El backend se encarga de tomar el JSON original, limpiarlo y transformarlo en algo más usable. La idea fue no exponer directamente el payload crudo, sino entregar una estructura más simple y consistente.

El frontend, por su lado, solo consume esa información ya procesada y se enfoca en mostrarla de forma clara.

---

## Decisiones técnicas principales

### Uso de DTOs e interfaces

Utilicé DTOs para definir lo que expone la API e interfaces para tipar el JSON original. Esto ayudó a tener más control sobre los datos y evitar errores.

### Mapper para la transformación

La lógica de transformación (incluyendo el cálculo del hype) la moví a un mapper. Al inicio estaba en el service, pero se empezó a volver difícil de mantener.

### Manejo de fechas sin librerías externas

El reto pedía no usar librerías como moment o date-fns, así que resolví el tiempo relativo con JavaScript nativo. Es una aproximación simple, pero suficiente para este caso.


### Proxy en desarrollo

Configuré un proxy en Vite para evitar problemas de CORS y no tener que hardcodear la URL del backend.

---

## Organización del proyecto

En el backend trabajé por módulo (`videos`), separando:

- controller
- service
- repository
- mapper
- dto
- interfaces

Esto surgió después de una primera versión más desordenada donde todo estaba muy junto.

En el frontend mantuve una estructura simple porque el alcance no requería algo más complejo. Básicamente una vista principal con sus estilos.

---

## Supuestos y simplificaciones

- El archivo JSON se toma como única fuente de datos.
- No se usaron variables de entorno.
- No se implementaron filtros ni paginación.
- El frontend tiene una sola vista.
- El cálculo de tiempo es aproximado (30 días por mes, 365 por año).
- Si un video tiene 0 views, el hype se deja en 0.

---

## Problemas encontrados y cómo los resolví

### Rutas devolviendo 404

Inicialmente solo existía `/api/videos`, lo que hacía parecer que la API no funcionaba al probar otras rutas. Se agregaron rutas básicas (`/` y `/api`) para mejorar la experiencia.

### Error con las URL de las miniaturas

El JSON incluía URLs de miniaturas usando `via.placeholder.com`. Al probarlas, noté que no estaban funcionando correctamente (posiblemente por bloqueos o porque ya no están disponibles).

Para solucionarlo, decidí reemplazarlas por `placehold.co`, que ofrece el mismo tipo de servicio y funciona sin problemas.

### Error de TypeScript

Había un problema con la configuración de `ignoreDeprecations`. Se corrigió a una versión compatible y con eso volvieron a funcionar los comandos.

### Código muy concentrado

Al inicio tenía demasiada lógica dentro del service. Se refactorizó separando responsabilidades en mapper y repository.

### Diseño del frontend

La primera versión era más visual, pero poco práctica. Se simplificó para lograr una interfaz más limpia y clara.

---

## Prompts más relevantes utilizados

Algunos prompts que utilice:

- "por qué no cargan imágenes de via.placeholder.com y qué alternativas puedo usar"
- "error ignoreDeprecations typescript cómo solucionarlo según versión"
- "cómo refactorizar un service muy grande en NestJS separando responsabilidades"

Las respuestas me sirvieron como guía o punto de partida, pero en todos los casos hice ajustes manuales para adaptarlo a lo que necesitaba el proyecto. La estructura y decisiones finales se tomaron durante el desarrollo.

## Estado final

El backend expone `/api/videos` con datos ya procesados y listos para consumir.

El frontend consume ese endpoint, maneja estados básicos (carga, error) y muestra los videos resaltando el más relevante.

En general, la solución quedó funcional, organizada y fácil de extender.