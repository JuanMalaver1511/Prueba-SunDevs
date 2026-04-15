# La Cartelera de Hype Tecnologico

Proyecto full stack con `NestJS` en el backend y `React + Vite` en el frontend. El backend lee un mock de YouTube, limpia la respuesta, calcula el nivel de hype y expone `GET /api/videos`. El frontend consume esa API y destaca el video con mayor hype como la "Joya de la Corona".

## Requisitos

- `Node.js` 20 o superior
- `npm` 10 o superior

## Estructura

- `backend/`: API en NestJS
- `frontend/`: interfaz en React
- `backend/mock-youtube-api.json`: fuente mock de datos

## Instalar dependencias

Desde la raíz del proyecto:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

## Ejecutar el backend

En una terminal:

```bash
cd backend
npm run start:dev
```

El backend queda disponible en:

- `http://localhost:3000/`
- `http://localhost:3000/api`
- `http://localhost:3000/api/videos`

## Ejecutar el frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

El frontend queda disponible normalmente en:

- `http://localhost:5173`

El frontend usa un proxy de Vite para enviar las llamadas `/api` al backend en `http://localhost:3000`.

## Levantar el proyecto localmente

1. Instala dependencias en `backend/` y `frontend/`.
2. Levanta el backend con `npm run start:dev`.
3. Levanta el frontend con `npm run dev`.
4. Abre `http://localhost:5173`.

## Scripts utiles

### Backend

```bash
cd backend
npm test
```

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

## Endpoints principales

### `GET /`

Respuesta simple para confirmar que el backend esta activo.

### `GET /api`

Indice simple de endpoints disponibles.

### `GET /api/videos`

Devuelve un arreglo de videos ya transformados. Cada item incluye:

- `id`
- `thumbnail`
- `title`
- `author`
- `publishedRelative`
- `hypeLevel`

## Notas

- El backend no usa librerias externas para formatear fechas relativas.
- Si un video no tiene `commentCount`, su `hypeLevel` es `0`.
- Si el titulo contiene `Tutorial` en cualquier combinacion de mayusculas/minusculas, el hype se multiplica por `2`.
