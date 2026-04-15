import { useEffect, useState } from 'react'
import './App.css'

function formatHype(value) {
  return value.toFixed(4)
}

function App() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadVideos() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('/api/videos')

        if (!response.ok) {
          throw new Error(`La API respondio con ${response.status}`)
        }

        const payload = await response.json()

        if (!cancelled) {
          setVideos(payload)
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : 'Error desconocido')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadVideos()

    return () => {
      cancelled = true
    }
  }, [])

  const crownVideo = videos.reduce((topVideo, currentVideo) => {
    if (!topVideo || currentVideo.hypeLevel > topVideo.hypeLevel) {
      return currentVideo
    }

    return topVideo
  }, null)

  const gridVideos = crownVideo
    ? videos.filter((video) => video.id !== crownVideo.id)
    : videos

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <h1>La Cartelera de Hype Tecnologico</h1>
      </section>

      {loading ? <section className="status-card">Cargando videos...</section> : null}

      {!loading && error ? (
        <section className="status-card status-card--error">
          No fue posible cargar la cartelera.
          <span>{error}</span>
        </section>
      ) : null}

      {!loading && !error && crownVideo ? (
        <>
          <section className="crown-card">
            <div className="crown-copy">
              <p className="section-label">Joya de la Corona</p>
              <h2>{crownVideo.title}</h2>
              <p className="meta-line">
                <span>{crownVideo.author}</span>
                <span>{crownVideo.publishedRelative}</span>
              </p>
              <p className="crown-description">
                El video con el mayor nivel de hype del feed. Se destaca por su
                combinacion de interaccion y rendimiento relativo.
              </p>
              <div className="metric-pill">
                Hype {formatHype(crownVideo.hypeLevel)}
              </div>
            </div>
            <img
              className="crown-image"
              src={crownVideo.thumbnail}
              alt={`Miniatura de ${crownVideo.title}`}
            />
          </section>

          <section className="video-grid">
            {gridVideos.map((video) => (
              <article className="video-card" key={video.id}>
                <img
                  className="video-thumb"
                  src={video.thumbnail}
                  alt={`Miniatura de ${video.title}`}
                />
                <div className="video-body">
                  <p className="video-author">{video.author}</p>
                  <h3>{video.title}</h3>
                  <p className="video-date">{video.publishedRelative}</p>
                </div>
                <div className="video-footer">
                  <span>Nivel de Hype</span>
                  <strong>{formatHype(video.hypeLevel)}</strong>
                </div>
              </article>
            ))}
          </section>
        </>
      ) : null}
    </main>
  )
}

export default App
